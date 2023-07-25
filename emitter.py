import sys
import numpy as np
import pandas as pd
import os
# import matplotlib.pyplot as plt
#import plotly.express as px
# from scipy.stats import zscore

# Set the number of files to process
numfiles = 21


def emitter(dateFrom, dateTo, data):
    from pytz import utc
    lower_filter = pd.to_datetime(dateFrom).tz_localize(utc)
    higher_filter = pd.to_datetime(dateTo).tz_localize(utc)
    data['Date'] = pd.to_datetime(data['Date'])
    final_data = data[(data['Date'] >= lower_filter) &
                      (data['Date'] <= higher_filter)]
    final_data = final_data[list(('id', 'Date', 'Value', 'Leak'))]
    # final_data.shape
    return final_data


def value_emitter(datefrom, dateto):
    obs = pd.read_excel(os.path.join(
        'components', 'India_refinery_locations.xlsx'))[:numfiles]
    obs['id'] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    obs = obs[list(('id', 'Refinery', 'Latitude', 'Longitude'))]
    readfile = pd.read_csv(os.path.join('components', 'respirer.csv'),
                           encoding='utf-8', index_col=False)
    dates = readfile['DateFrom']
    ids = readfile['id']
    values = readfile['mean']
    data = pd.DataFrame({'id': ids, 'Date': dates, 'Value': values})
    data.drop(data.index[0])
    minperiod = 10
    data['5th_percentile_60day_rolling'] = data['Value'].rolling(
        window=60, min_periods=minperiod).quantile(0.05)
    data['Delta'] = data['Value'] - data['5th_percentile_60day_rolling']
    # Add a column 'Status' based on the condition (Delta >= 50: Yes, Delta < 50: No)
    data['Leak'] = data['Delta'].apply(lambda x: 'Yes' if x >= 65 else 'No')
    data['NaN_Count'] = data['Value'].rolling(
        window=60).count(numeric_only=False)
    value = emitter(datefrom, dateto, data)
    value
    jsonvalue = value.to_json(orient='records')
    print(jsonvalue)
    return jsonvalue
    # print(object.keys(jsonvalue).length)


datefrom = sys.argv[1]
dateto = sys.argv[2]
jsonData = value_emitter(datefrom, dateto)
sys.argv.append(jsonData)
