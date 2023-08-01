"use client"
import React, { use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
// import DateRangeComp from "@/components/DateRangeComp";
import Header from "@/components/Header";
import 'bootstrap/dist/css/bootstrap.css'
import '../app/globals.css'
import Controls from "@/components/Controls";
import Respiredata from '../components/respirer.json'
import RefineryData from '../components/data.json'
import * as dfd from 'danfojs'
//import Graphs from "@/components/graphs";


export default function Home() {
  const MapWithNoSSR = dynamic(() => import("../components/Front"), {
    ssr: false
  }
  );
  const MapComp = dynamic(() => import("../components/Map"), {
    ssr: false
  })

  const Graphs = dynamic(() => import('../components/Graphs'), {
    ssr: false
  })

  const [methaneData, setMethaneData] = useState();
  const [allMethaneData, setAllMethaneData] = useState([]);
  const [allIdNo, setAllIdNo] = useState([]);
  const [allRefineryName, setAllRefineryName] = useState([]);
  const [allRefineryLocation, setAllRefineryLocation] = useState([]);
  const [dates, setDates] = useState([]);
  // const [idNo, setIdNo] = useState([]);
  // const [refineryName, setRefineryName] = useState("");
  // const [latitude, setLatitude] = useState("");
  // const [longitude, setLongitude] = useState("");
  const [idClick, setId] = useState();
  const [jsonvalue, setEmitterData] = useState({});
  const [id, setGraphId] = useState();


  //fetch all data of all refinery locations with ch4 values
  const fetchAllMethaneData = useCallback((dates) => {

    const values = []
    const ids = []
    for (let id = 1; id <= 21; id++) {
      let sum = 0
      let denominator = 0
      for (let i = 0; i < dates.length; i++) {
        Respiredata.map((data) => {
          if (data.id == id && data.mean != "NaN" && new Date(dates[i]).getDate() === new Date(data.DateFrom).getDate() && new Date(dates[i]).getMonth() === new Date(data.DateFrom).getMonth() && new Date(dates[i]).getYear() === new Date(data.DateFrom).getYear()) {
            sum += data.mean
            denominator++
          }
        })

      }
      values.push(sum / denominator)
      ids.push(id)
    }
    return [values,ids]
  }, [dates])


  

  useEffect(() => {
    const [values,ids] = fetchAllMethaneData(dates)
    setAllMethaneData(values)
    setAllIdNo(ids)
    // console.log("all methane data are ", allMethaneData)
    // console.log(idClick)
    // console.log("all id number are : ", allIdNo)
    // console.log("graph id is in pages: ", id);
    // console.log(allRefineryName)
    // console.log("all refinery locations are", allRefineryLocation)
  }, [fetchAllMethaneData])


  const graphhandle = (id) => {
    setGraphId(id);
  }

  const handleAllData = (dates, idClick, jsonvalue) => {
    setDates(dates)
    console.log("in pages dates are",dates)
    setId(idClick)
    console.log(idClick)
    setEmitterData(jsonvalue);
    console.log(typeof jsonvalue);
    console.log("in pages:", jsonvalue);
  }


  const refloction=[]
  const refNames=[]

  RefineryData.map((refData)=>{
    allIdNo.map((alId)=>{
      if(refData.id === alId){
        refloction.push([refData.Latitude,refData.Longitude])
        refNames.push(refData.Refinery)
      }
    })
  })

  let singleName="";
  RefineryData.map((refData)=>{
    if(refData.id == id){
      singleName=refData.Refinery;
    }
  })
  console.log("sigle name is ", singleName)

  const data = {
    Loc: refloction,
    "name": refNames,
    Data: allMethaneData,
    lid: allIdNo
  }


  


  const jsonArray = [];

  for (let i = 0; i < data.Loc.length; i++) {
    const obj = {

      loc: data.Loc[i],
      name: data.name[i],
      data: data.Data[i],
      lid: data.lid[i]
    }
    jsonArray.push(obj)
  }

  // console.log("the json values changes or not let see: ",jsonArray)

  return (
    <main>
      <div id="map">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Header />
        <Controls style={{ zIndex: "1001", position: "relative" }}  handleAllData={handleAllData} />
        {/* <MapComp style={{ width: "100%", height: "500px", margin: "10px" }} refineryData={refineryData} Locations={Locations} idClick={idClick} allRefineryName={allRefineryName} allRefineryLocation={allRefineryLocation} allMethaneData={allMethaneData} jsonArray={jsonArray} graphhandle={graphhandle} /> */}
        {/* <center><Graphs style={{ width: "1000px", height: "800px", marginTop:"10px" }} className="graph" jsonvalue={jsonvalue} id={id} /></center> */}
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <MapComp style={{ width: "600", height: "500px", margin: "10px" }} idClick={idClick}  allMethaneData={allMethaneData} jsonArray={jsonArray} graphhandle={graphhandle} />
            </div>
            <div className="col-md-6">
              <center><Graphs className="graph" jsonvalue={jsonvalue} id={id} singleName={singleName} /></center>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}