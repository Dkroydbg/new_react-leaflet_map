"use client"
import { MapContainer, TileLayer, Marker,Circle,CircleMarker, Popup,Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Moment from 'moment';
// import RefineryData from '../components/data.json'

 


const Map = (props) => {

  const handlegraph=(e)=>{
    const id = e.target.id;
    console.log("graph id is: ",id);
    props.graphhandle(id);
  }



  if(props.idClick===1){
    return(
      <MapContainer 
      center={[25.43, 86.05]}
      zoom={4}
      scrollWheelZoom={false}
      style={{  height: "500px", width: "400px",borderRadius:"14px",  border: "2px solid black", marginTop:"3px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> 
          <Marker position={[props.Locations[0],props.Locations[1]]}  draggable={true} animate={true}>
            <Popup >
            <h4 className="card-title text-center">CH4 Value</h4>

          {Object.keys(props.refineryData).map((key, i) => (
          <p key={i}>
            <span>{key}: </span>
            <span>{props.refineryData[key]}</span>
          </p>))}
          </Popup>
        </Marker>
      
    </MapContainer>
    )
  }
  else{

    console.log("in idclick 2 ",props.AllRefineryData)
    return (
     
      
    <MapContainer 
      center={[25.43, 86.05]}
      zoom={4}
      scrollWheelZoom={false}
      style={{  height: "500px", width: "650px",borderRadius:"14px",  border: "2px solid black", marginTop:"3px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> 
        {props.jsonArray.map((data,id)=>(
          <div key={id}>
              <Circle center={[data.loc[0],data.loc[1]]} color="green" fillColor="green" radius={300} opacity={0.5} />
              {props.allMethaneData.map((mdata,id2)=>(
                <div>
                <CircleMarker center={[data.loc[0],data.loc[1]]} color="green" radius={20} opacity={0.1}>
              
                <Tooltip direction="center"  permanent opacity={0.6}>
                       <span>{Math.trunc(data.data)}</span>
                       <Popup gid={id+1} > 
                        <h4><u>CH4 Value</u></h4>
                        {/* <br/> */}
                        <p><b>Name</b>: {data.name}</p>
                        <p><b>CH4</b>: {Math.trunc(data.data)}</p>
                        <button className="buton2" id={data.lid} onClick={handlegraph}>Graph</button>
                       </Popup>
              </Tooltip>
              </CircleMarker>
              </div>
              ))}
              </div> 
        ))}
    </MapContainer>
      
    );
  }
  
};

export default Map;



