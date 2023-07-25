import { Chart, Bubble, Line } from 'react-chartjs-2';
import React from 'react'
import Moment from 'moment';
import Plot from "react-plotly.js";

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,  //x-axis
    LinearScale,  //y-axis
    Legend,
    PointElement,
    Title,
    Tooltip,
    LineController,
    BubbleController,
} from 'chart.js'
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    Legend,
    PointElement,
    Title,
    Tooltip,
    LineController,
    BubbleController,
)


const Graphs = (props) => {

    const dates = []
    const values = []
    const dates1 = []
    const yesno = []
    const values1 = []
    const isObjectEmpty = (objectName) => {
        for (let prop in objectName) {
            if (objectName.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    };
    if (isObjectEmpty(props.jsonvalue) == false) {
        props.jsonvalue.map((key, index) => {
            if (key.id == props.id) {
                dates.push(Moment(key.Date).format('YYYY-MM-DD'));
                values.push(key.Value)
            }
        })
    }
    if (isObjectEmpty(props.jsonvalue) == false) {
        props.jsonvalue.map((key, index) => {
            if (key.id == props.id && key.Leak == 'Yes') {
                dates1.push(Moment(key.Date).format('YYYY-MM-DD'));
                values1.push(key.Value)
                yesno.push(key.Leak)
            }
        })
    }


    console.log("props in graph is: ", props.id)
    console.log(values1)


    // const data = {
    //     labels: dates ? dates : null,
    //     datasets: [
    //         // {
    //         //     // type:'scatter',
    //         //     label:'Yes or No',
    //         //     data:[{
    //         //         x:dates?dates:null,
    //         //         y:values1?values1:null,
    //         //     }],
    //         //     backgroundColor: 'black',
    //         //     borderColor: [
    //         //         'rgba(255, 99, 132, 1)',
    //         //     ]
    //         // },

    //         {
    //             type:'line',
    //             label: 'CH4 Value',
    //             data: values ? values : null,
    //             backgroundColor: [
    //                 'rgba(255, 99, 132,0.5)',
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //             ],
    //             // pointBorderColor:'aqua',
    //             pointStyle: 'circle',
    //             pointRadius: 6,
    //             pointHoverRadius: 10,
    //             tension: 0.4
    //         },
    //     ]
    // }
    // const options = {
    //     // type:'bubble',
    //     responsive: true,
    //     plugins: {
    //         legend: {
    //             position: 'top',
    //         },
    //         title: {
    //             display: true,
    //             text: 'Chart.js Line Chart',
    //         },
    //     },
    // }

    
    return (
        <div>
            {/* <h1 className='heading'>Super Emitter Graph</h1> */}
            <div className='graph' style={{
                width: "650px",
                height: "400px",
            }}>
                 <Plot

data={[
  {
    x: dates?dates:null,
    y: values1?values1:null,
    type: "scatter",
    mode: "markers",
    marker: { color: "red" },
  },
  { type: "line", x:dates?dates:null, y: values?values:null,
  line: {
    shape: 'spline',
    smoothing: 1.3,
    color: 'rgb(255, 98, 157)'
  } 
 },
  
]}
layout={{ width: "700px", height: "500px", title: "Graph Example" }}
 />
            </div>
        </div>
    )
}




export default Graphs