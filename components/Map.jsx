"use client"
import { MapContainer, TileLayer, Marker, Circle, CircleMarker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Moment from 'moment';
import {useRef, useEffect} from 'react';
// import RefineryData from '../components/data.json'




const Map = (props) => {

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const onClickShowPopUp = (e) => {
    const map = mapRef.current;
    if (!map) {
      return;
    }

    // map.flyTo( 13);

    const marker = markerRef.current;
    if (marker) {
      marker.openPopup();
    }
    console.log("marker is clicked: ", marker);
  };

  const handlegraph = (e) => {
    e.preventDefault();
    const gid = e.target.gid;
    console.log("graph id is: ", gid);
    props.graphhandle(gid);
  }

    
    
    
    

  // console.log("in idclick 2 ", props.AllRefineryData)
  return (

    <div>
    <MapContainer
      whenReady={(map) => {
        mapRef.current = map;
      }}
      center={[25.43, 86.05]}
      zoom={5}
      scrollWheelZoom={false}
      style={{ borderRadius: "14px", border: "2px solid black", marginTop: "3px", ...props.style }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.jsonArray.map((data, id) => (
        <div key={id}>
          <Circle center={[data.loc[0], data.loc[1]]} color="green" fillColor="green" radius={300} opacity={0.5} />
          
            <div>
              
                <CircleMarker center={[data.loc[0], data.loc[1]]} color="green" radius={20} opacity={0.9} ref={props.markerRef} eventHandlers={{
                click: (e) => {
                  onClickShowPopUp()
                },
              }}>

                <Tooltip direction="center"  permanent opacity={1} >
                  <span>{Math.trunc(data.data)}</span>
                  <Popup gid={id + 1} >
                    <h4><u>CH4 Value</u></h4>
                    {/* <br/> */}
                    <p><b>Name</b>: {data.name}</p>
                    <p><b>CH4</b>: {Math.trunc(data.data)}</p>
                    <p><b>ID</b>: {Math.trunc(data.lid)}</p>
                    {/* <button className="buton2" gid={data.lid} onClick={(e)=>handlegraph(e)}>Graph</button> */}
                  </Popup>
                </Tooltip>
              </CircleMarker> 
            </div>
          
        </div>
      ))}
    </MapContainer>
    </div>

  );
  // }

};

export default Map;



