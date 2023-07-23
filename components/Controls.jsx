import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import './Datepicker.scss';
import Moment from 'moment';
import Graphs from './graphs';

const Controls = (props) => {
    console.log('Controls', props)
    console.log("graph values",props.jsonvalue)
    const [fromDate, setFromDate] = useState((new Date("2023-03-31T17:57:28.556094Z")));
    const [toDate, setToDate] = useState((new Date("2023-04-01T17:57:28.556094Z")));
    const [idNo,setIdNo]=useState();
    const [emitterData,setEmitterData] = useState({});
    // const [id,setId]=useState();
    // const [dates,setDates]=useState([]);

    const handleFromDateChange = (date) => {
        setFromDate(date);
    };

    const handleToDateChange = (date) => {
        setToDate(date);
    };
    const dates=[]
    const handleClick = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('From Date:', Moment(fromDate).format('YYYY-MM-DD'));
        console.log('To Date:', Moment(toDate).format('YYYY-MM-DD'));

        const date = new Date(fromDate.getTime());
        while (date <= toDate) {
        dates.push(Moment((new Date(date))).format('YYYY-MM-DD'));
        date.setDate(date.getDate() + 1);
        }
        // console.log(dates);
        const idClick=1
        props.handleSubmit(dates,idNo,idClick);
        console.log(dates);
        console.log(idNo);
        

        
    };

    const handleNewClick=async(e)=>{
        e.preventDefault();
        // Handle form submission here
        console.log('From Date:', Moment(fromDate).format('YYYY-MM-DD'));
        console.log('To Date:', Moment(toDate).format('YYYY-MM-DD'));

        const dateFrom=Moment(fromDate).format('YYYY-MM-DD');
        const dateTo=Moment(toDate).format('YYYY-MM-DD');

        const res = await fetch("/translate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			// body: JSON.stringify({ text }),
            body: JSON.stringify({
                dateFrom:dateFrom,
                dateTo:dateTo
            }),
		});
        const emitData=await res.json();
        
        const value = emitData.translatedText.toString().replace(/(?:\\[rn]|[\r\n]+)+/g, "");
        const newJsonValue=JSON.parse(value)

        // console.log("emitter Data",newJsonValue);
        
        // setEmitterData(newJsonValue);
        // console.log("emitter Data is",emitterData);

        const date = new Date(fromDate.getTime());
        while (date <= toDate) {
        dates.push(Moment((new Date(date))).format('YYYY-MM-DD'));
        date.setDate(date.getDate() + 1);
        }
        const idClick=2
        // console.log(dates);
        props.handleAllData(dates,idClick,newJsonValue);
        console.log(dates);
        
    }



    return (
        <div>
        <center>
        <div style={{ display: 'flex', flexDirection: 'row',...props.style }}>
            <div>
                <label class="inp" htmlFor="fromDate">From Date:</label>
                <DatePicker
                    showIcon
                    id="fromDate"
                    selected={fromDate}
                    onChange={handleFromDateChange}
                    dateFormat="yyyy-MM-dd"
                />
            </div>

            <div>
                <label class="inp" htmlFor="toDate">To Date:</label>
                <DatePicker
                    showIcon
                    id="toDate"
                    selected={toDate}
                    onChange={handleToDateChange}
                    dateFormat="yyyy-MM-dd"
                />
            </div>
            <>
            <button type='submit' className='buton' onClick={handleNewClick}>Submit</button>
            </>
        </div>
        <div>
            {/* <Graphs jsonvalue={props.jsonvalue}/> */}
        </div>
        </center>
    </div>
    );
};

export default Controls;