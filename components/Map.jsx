"use client"
import { MapContainer, TileLayer, Marker, Circle, CircleMarker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Moment from 'moment';
// import RefineryData from '../components/data.json'




const Map = (props) => {

  const handlegraph = (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log("graph id is: ", id);
    props.graphhandle(id);
  }

  console.log("in idclick 2 ", props.AllRefineryData)
  return (


    <MapContainer
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
          {props.allMethaneData.map((mdata, id2) => (
            <div>
              <CircleMarker center={[data.loc[0], data.loc[1]]} color="green" radius={10} opacity={0.7}>

                <Tooltip direction="center" permanent opacity={0.7} color="blue">
                  <span>{Math.trunc(data.data)}</span>
                  <Popup gid={id + 1} >
                    <h4><u>CH4 Value</u></h4>
                    {/* <br/> */}
                    <p><b>Name</b>: {data.name}</p>
                    <p><b>CH4</b>: {Math.trunc(data.data)}</p>
                    <p><b>ID</b>: {Math.trunc(data.lid)}</p>
                    <button className="buton2" id={data.lid} onClick={(e)=>handlegraph(e)}>Graph</button>
                  </Popup>
                </Tooltip>
              </CircleMarker>
            </div>
          ))}
        </div>
      ))}
    </MapContainer>

  );
  // }

};

export default Map;



