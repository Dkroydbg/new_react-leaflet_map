
import { useEffect, useRef, useState } from 'react'
import '../app/page.module.css'
import respiredata from './respirer.json'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../app/globals.css'
import Moment from 'moment';






const DateRangeComp = (props) => {
  
  // date state
  const [idno,setidno]=useState();
  const [argtype,setargtype]=useState("");
  const [chvalue,setchvalue]=useState();
  const [startDate,setStartDate]=useState(null);
  const [endDate,setEndDate]=useState(null);


  
  const dates = [];
  const fetchdata=((key,argtype,datearr,option)=>{
    let sum=0
    let denominator=0
    switch(option){
      case 'dateid':
        if(arg!=null){
          if(arg=="mean"){
            {respiredata.map((data)=>{
              for(let i=0;i<datearr.length;i++){
                if(data.id==key&&data.mean!="NaN"&&data.DateFrom==datearr[i]){
                  sum+=data.mean
                  denominator++
                }
              }
            })}
          }
          else if(arg=="min"){
            {respiredata.map((data)=>{
              for(let i=0;i<datearr.length;i++){
                if(data.id==key&&data.min!="NaN"&&data.DateFrom==datearr[i]){
                  sum+=data.min
                  denominator++
                }
              }
            })}
          }
          else if(arg=="max"){
            {respiredata.map((data)=>{
              for(let i=0;i<datearr.length;i++){
                if(data.id==key&&data.max!="NaN"&&data.DateFrom==datearr[i]){
                  sum+=data.max
                  denominator++
                }
              }
            })}
          }
        }
        
        // console.log(sum/denominator);
        return sum/denominator
      
      case 'math':
        if(arg!=null){
              {respiredata.map((data)=>{
                if(arg=="mean"){
                  if(data.mean!="NaN"&&data.id==key){
                    sum+=data.mean;
                    denominator++;
                  }
                }
                else if(arg=="min"){
                  if(data.min!="NaN"&&data.id==key){
                    sum+=data.min;
                    denominator++;
                  }
                }
                
                else if(arg=="max"){
                  if(data.max!="NaN"&&data.id==key){
                    sum+=data.max;
                    denominator++;
                  }
                }
              }
              )}
        // console.log(sum/denominator);
        return sum/denominator
            }
      case 'id':
        {respiredata.map((data)=>{
          if(data.id==key&&data.mean!="NaN"){
            sum+=data.mean
            denominator++
          }
        })}
        // console.log(sum/denominator);
        return sum/denominator
    }
  });
 
useEffect(()=>{
  
   
 

  const value=fetchdata(idno,'','','id');
    console.log(value);
    setchvalue(value);
},[idno,chvalue])

  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(idno);
    // console.log(argtype);
    // console.log(startDate);
    // console.log(endDate);
    console.log(Moment(startDate).format('YYYY-MM-DD'))
    const date = new Date(startDate.getTime());
    

    while (date <= endDate) {
      dates.push(Moment((new Date(date))).format('YYYY-MM-DD'));
      date.setDate(date.getDate() + 1);
    }

    console.log(dates);

  
    
  }

  // const MapWithNoSSR = dynamic(() => import("../components/Map"), {
  //   ssr: false
  // }
  // );
  

  return (
    <>
    <div className='dateform'>
    <form onSubmit={handleSubmit}>
     <DatePicker
       placeholderText='StartDate'
       selected={startDate}
       selectsStart
       startDate={startDate}
       endDate={endDate}
       onChange={date => setStartDate(date)}
     />
     <DatePicker
       placeholderText='EndDate'
       selected={endDate}
       selectsEnd
       startDate={startDate}
       endDate={endDate}
       minDate={startDate}
       onChange={date => setEndDate(date)}
     />
   </form>
   <div>
          <form onSubmit={handleSubmit}>
          ID: <input type="number" onChange={(e)=>setidno(e.target.value)} value={idno} required/>
          Arg: <input type="text" onChange={(e)=>setargtype(e.target.value)} value={argtype} required/>
          <button onClick={()=>props.changeChvalueHandler({chvalue:chvalue,idno:idno})} type="submit">Submit</button>
          </form>
      </div>
    
    </div>
    </>
  )
}

export default DateRangeComp