import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Moment from 'moment';

const Controls = (props) => {
    console.log('Controls', props)
    const [fromDate, setFromDate] = useState(new Date().setDate(new Date().getDate() - 1));
    const [toDate, setToDate] = useState(new Date());
    const [idNo,setIdNo]=useState();
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

    const handleNewClick=(e)=>{
        e.preventDefault();
        // Handle form submission here
        console.log('From Date:', Moment(fromDate).format('YYYY-MM-DD'));
        console.log('To Date:', Moment(toDate).format('YYYY-MM-DD'));

        const date = new Date(fromDate.getTime());
        while (date <= toDate) {
        dates.push(Moment((new Date(date))).format('YYYY-MM-DD'));
        date.setDate(date.getDate() + 1);
        }
        const idClick=2
        // console.log(dates);
        props.handleAllData(dates,idClick);
        console.log(dates);
        
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row',...props.style }}>
            <div>
                <label htmlFor="fromDate">From Date:</label>
                <DatePicker
                    id="fromDate"
                    selected={fromDate}
                    onChange={handleFromDateChange}
                    dateFormat="yyyy-MM-dd"
                />
            </div>

            <div>
                <label htmlFor="toDate">To Date:</label>
                <DatePicker
                    id="toDate"
                    selected={toDate}
                    onChange={handleToDateChange}
                    dateFormat="yyyy-MM-dd"
                />
            </div>
            <>
            <input type="number"  onChange={(e)=>setIdNo(e.target.value)} value={idNo} placeholder='Enter Id of Refinery' />
            <button onClick={handleClick}>Submit</button>
            </>
            <>
                <p>Want all the Refinery Ch4 values</p>
                <button onClick={handleNewClick}>Submit</button>
            </>
        </div>
    );
};

export default Controls;