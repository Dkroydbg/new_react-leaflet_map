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

  const [allMethaneData, setAllMethaneData] = useState([]);
  const [allIdNo, setAllIdNo] = useState([]);
  const [dates, setDates] = useState(['2023-03-25', '2023-03-26', '2023-03-27', '2023-03-28', '2023-03-29', '2023-03-30', '2023-03-31', '2023-04-01']);
  const [idClick, setId] = useState();
  const [jsonvalue, setEmitterData] = useState({});
  const [graphId, setGraphId] = useState();
  
  
  
  

  const values = []
  const ids = []
  //fetch all data of all refinery locations with ch4 values
  const fetchAllMethaneData = useCallback((dates) => {
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
    return [values, ids]
  }, [dates])


  useEffect( () => {
      console.log("inside the useffect ")
      const [values, ids] = fetchAllMethaneData(dates)
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

  const handleAllData = async (dates, idClick, jsonvalue) => {
    // e.preventDefault();
    // setDates(dates)
    // console.log("in pages dates are", dates)
    // setId(idClick)
    // console.log(idClick)
    // setEmitterData(jsonvalue);
    // console.log(typeof jsonvalue);
    // console.log("in pages:", jsonvalue);
    const [values, ids] = fetchAllMethaneData(dates)
    setAllMethaneData(values)
    setAllIdNo(ids)
  }
  
  const refloction = []
  const refNames = []
  RefineryData.map((refData) => {
    allIdNo.map((alId) => {
      if (refData.id === alId) {
        refloction.push([refData.Latitude, refData.Longitude])
        refNames.push(refData.Refinery)
      }
    })
  })

  let singleName = "";
  RefineryData.map((refData) => {
    if (refData.id == graphId) {
      singleName = refData.Refinery;
    }
  })
  console.log("sigle name is ", singleName)

  const data = {
    Loc: refloction,
    "name": refNames,
    Data: allMethaneData,
    lid: allIdNo
  }

  const jsonArray = []

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
        <Controls style={{ zIndex: "1001", position: "relative" }} handleAllData={handleAllData} setDates={setDates} setId={setId} setEmitterData={setEmitterData} />
        <div className="container" style={{ maxWidth: "100%" }}>
          <MapComp style={{ width: "100%", height: "500px" }} idClick={idClick} allMethaneData={allMethaneData} jsonArray={jsonArray} graphhandle={graphhandle} />
          <div className="row">
            {graphId? (
            <div>
              <Graphs className="graph" jsonvalue={jsonvalue} id={graphId} singleName={singleName} />
            </div>
            ):(<></>)}
          </div>
        </div>
      </div>
    </main>
  );
}