"use client"
import { MapContainer, TileLayer, Marker,Circle,CircleMarker, Popup,Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
// import RefineryData from '../components/data.json'

 


const Map = (props) => {
  // {props.jsonObj.map((data)=>{
  //   console.log("the first is",data.Loc," and the second is", data.Name," and the third is", data.Data)
  // })}
  if(props.idClick===1){
    return(
      <MapContainer 
      center={[25.43, 86.05]}
      zoom={4}
      scrollWheelZoom={false}
      style={{  height: "500px", width: "400px",borderRadius:"14px",  border: "2px solid black", marginTop:"3px", zIndex: "1001" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> 
          <Marker position={[props.Locations[0],props.Locations[1]]}  draggable={true} animate={true}>
            <Popup>
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
      // {Object.keys(props.AllRefineryData).}
    //   <MapContainer 
    //   center={[25.43, 86.05]}
    //   zoom={4}
    //   scrollWheelZoom={false}
    //   style={{  height: "500px", width: "400px",borderRadius:"14px",  border: "2px solid black", marginTop:"3px", zIndex: "1001" }}
    // >
    //   <TileLayer
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   /> 
    //   {props.allRefineryLocation.map((data)=>{
    //     <Marker position={[data[0],data[1]]}  draggable={true} animate={true}>    
    //         <Popup>
    //         <h4 className="card-title text-center">CH4 Value</h4>

    //       {props.allRefineryName.map((name, i) => (
    //         <p>Name: {name}</p>
    //       ))}
    //       {props.allMethaneData.map((meth,id)=>{
    //         <div>
    //           <p>CH4: {meth}</p>
    //           <p>ID: {id}</p>
    //         </div>
            
    //       })}
    //       </Popup>
    //     </Marker>
    //     })}
      
    // </MapContainer>
      
    <MapContainer 
      center={[25.43, 86.05]}
      zoom={4}
      scrollWheelZoom={false}
      style={{  height: "500px", width: "400px",borderRadius:"14px",  border: "2px solid black", marginTop:"3px", zIndex: "1001" }}
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
                <CircleMarker center={[data.loc[0],data.loc[1]]} color="green" radius={20} opacity={0.8}>
              
                <Tooltip direction="center"  permanent opacity={0.6}>
                       <span>{Math.trunc(data.data)}</span>
                       <Popup>
                        <h4><u>CH4 Value</u></h4>
                        {/* <br/> */}
                        <p><b>Name</b>: {data.name}</p>
                        <p><b>CH4</b>: {Math.trunc(data.data)}</p>
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



