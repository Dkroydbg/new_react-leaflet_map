# -*- coding: utf-8 -*-
"""
Created on Fri Jul 14 17:34:19 2023

@author: AVWTEW744
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
#import plotly.express as px
from scipy.stats import zscore  

# Set the number of files to process
numfiles = 21

obs=pd.read_csv('India_refinery_locations.xlsx')[:numfiles]

print(obs)



#reading the refinery datas 

readfile = pd.read_csv(str(case) + 'respirer.xlsx', parse_dates=['DateFrom'])

