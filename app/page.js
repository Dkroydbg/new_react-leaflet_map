"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
// import DateRangeComp from "@/components/DateRangeComp";
import Header from "@/components/Header";
import '../app/globals.css'
import Controls from "@/components/Controls";
import respiredata from '../components/respirer.json'
import RefineryData from '../components/data.json'
// import dfd from 'danfojs'


export default function Home() {
  const MapWithNoSSR = dynamic(() => import("../components/Front"), {
    ssr: false
  }
  );
  const MapComp = dynamic(() => import("../components/Map"), {
    ssr: false
  })

  const [methaneData, setMethaneData] = useState();
  const [allMethaneData, setAllMethaneData] = useState([]);
  const [allIdNo, setAllIdNo] = useState([]);
  const [allRefineryName, setAllRefineryName] = useState([]);
  const [allRefineryLocation, setAllRefineryLocation] = useState([]);
  const [dates, setDates] = useState([]);
  const [idNo, setIdNo] = useState();
  const [refineryName, setRefineryName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [idClick,setId]=useState();

  
  
  // const allrefinerylocation=[]

  // fetch data according to data 
  const fetchdata=((idNo,datearr,option)=>{
    let sum=0
    let denominator=0
    // console.log(idNo)
    switch(option){
      case 'dateid':
        {
          for(let i=0;i<datearr.length;i++){
            respiredata.map((data)=>{
              if (data.id == idNo && data.mean != "NaN" && new Date(datearr[i]).getDate() === new Date(data.DateFrom).getDate()&& new Date(datearr[i]).getMonth() === new Date(data.DateFrom).getMonth()&& new Date(datearr[i]).getYear() === new Date(data.DateFrom).getYear()) {
                sum += data.mean
                denominator++
                console.log(denominator)
              }
            })
          }
        }
        
        console.log(sum/denominator);
        return sum/denominator
        case 'id':
          {respiredata.map((data)=>{
            if(data.id==key&&data.mean!="NaN"){
              sum+=data.mean
              console.log(sum)
              denominator++
            }
          })}
          console.log(sum/denominator);
          return sum/denominator
    }
  });

  //fetch all data of all refinery locations with ch4 values
  const fetchAllMethaneData=useCallback((dates)=>{
    
    const values=[]
    const ids=[]
    for(let id=1;id<=12;id++){
      let sum=0
      let denominator=0
      for(let i=0;i<dates.length;i++){
        respiredata.map((data)=>{
          if (data.id==id&&data.mean != "NaN" && new Date(dates[i]).getDate() === new Date(data.DateFrom).getDate()&& new Date(dates[i]).getMonth() === new Date(data.DateFrom).getMonth()&& new Date(dates[i]).getYear() === new Date(data.DateFrom).getYear()) {
            sum += data.mean
            denominator++
          }
        })
        
      }
      values.push(sum/denominator)
      ids.push(id)
    }
    console.log(values)
    // setAllMethaneData(values)
    return values
  },[dates])

    
  const setrefnames=()=>{
    const allrefineryname=[]
    for(let i=1;i<=12;i++){
      {RefineryData.map((data)=>{
        if(data.id===i){
          allrefineryname.push([data.Refinery])
        }
      })}
    }
    return allrefineryname
  }

  const setreflocations=()=>{
    const allrefinerylocation=[]
    for(let i=1;i<=12;i++){
      {RefineryData.map((data)=>{
        if(data.id===i){
          allrefinerylocation.push([data.Latitude,data.Longitude])
        }
      })}
    }
    return allrefinerylocation
  }

    useEffect(()=>{
      const valueofref=setrefnames()
      setAllRefineryName(valueofref)
      const valueofrefloc=setreflocations()
      setAllRefineryLocation(valueofrefloc)
      
      
    },[setAllRefineryName,setAllRefineryLocation])



    useEffect( () => {
      const value=fetchdata(idNo,dates,'dateid')
      {RefineryData.map((ref)=>{
        if(ref.id==idNo){
          setRefineryName(ref.Refinery)
          setLatitude(ref.Latitude)
          setLongitude(ref.Longitude)
        }
      })}
      
      console.log(refineryName)
      console.log(value)
      setMethaneData(value)
      console.log(latitude,longitude)
      
      const values=fetchAllMethaneData(dates)
      setAllMethaneData(values)
      console.log("all methane data are ",allMethaneData)

      

      console.log(idClick)
      console.log(allIdNo)
      console.log(allRefineryName)
      console.log("all refinery locations are",allRefineryLocation)
    
  }, [methaneData,dates,idNo,refineryName,fetchAllMethaneData,idClick])
  
  


  const handleSubmit = (dates,idNo,idClick) => {
    setDates(dates)
    console.log(dates)
    setIdNo(idNo)
    console.log(idNo)
    setId(idClick)
    console.log(idClick)

    
  }

  const handleAllData=(dates,idClick)=>{
    setDates(dates)
    console.log(dates)
    setId(idClick)   
    console.log(idClick)  
    for(let i=1;i<=9;i++){
      setAllIdNo([i])
    }
    // setValues();
  }

  

  
  const Locations=[latitude,longitude]
  const refineryData={
    Name:refineryName,
    CH4:methaneData,
    ID:idNo,
  }

  const data={
    Loc:allRefineryLocation,
    "name":allRefineryName,
    Data:allMethaneData,
  }

 
  const jsonArray=[];

  for(let i=0;i<data.Loc.length;i++){
    const obj={
      loc:data.Loc[i],
      name:data.name[i],
      data:data.Data[i]
    }
    jsonArray.push(obj)
  }



  // let df = new dfd.DataFrame(AllRefineryData);

  // const jsonObj = df.toJSON();

  // console.log(jsonObj)








  return (
    <main>
      <div id="map">
        <Header />
        <Controls style={{ zIndex: "1001", position: "relative" }} handleSubmit={handleSubmit} handleAllData={handleAllData} />
        <MapComp style={{ width: "100%px", height: "500px", margin: "10px" }} refineryData={refineryData} Locations={Locations} idClick={idClick} allRefineryName={allRefineryName} allRefineryLocation={allRefineryLocation} allMethaneData={allMethaneData} jsonArray={jsonArray} />
      </div>
    </main>
  );
}