"use client"
import { Chart, Bubble, Line } from 'react-chartjs-2';
import React from 'react'
import Moment from 'moment';
//import Plot from "react-plotly.js";
import dynamic from 'next/dynamic';

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
const Plot = dynamic(() => import('react-plotly.js'), {
    ssr: false
})
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

        <div className='container' style={{ maxWidth: "100%", textAlign: "center" }}>
            <div className='row'>
                <div className='col-md-6 d-flex justify-content-center'>
                    <div className='graph' style={{
                        width: "100%",
                        height: "450px",
                    }}>
                        <Plot

                            data={[
                                {
                                    x: dates1 ? dates1 : null,
                                    y: values1 ? values1 : null,
                                    type: "scatter",
                                    mode: "markers",
                                    marker: { color: "red" },
                                    name: "Emitter"
                                },
                                {
                                    type: "line", x: dates ? dates : null, y: values ? values : null,
                                    line: {
                                        shape: 'spline',
                                        smoothing: 1.5,
                                        color: 'rgb(255, 98, 157)'
                                    },
                                    name: "CH4",
                                },

                            ]}
                            layout={{ width: 700, height: 400, title: `CH4 Mean Values of ${props.singleName}` }} config={{ responsive: true }}
                        />
                    </div>
                </div>
                <div className='col-md-6 d-flex justify-content-center'>
                    <div className='scattergraph' style={{
                        width: "100%",
                        height: "450px",
                    }}>
                        <Plot

                            data={[
                                {
                                    type: "scatter", x: dates1 ? dates1 : null, y: values1 ? values1 : null,
                                    type: "scatter",
                                    mode: "markers",
                                    marker: { color: "red" },
                                    name: "Emitter"
                                },

                            ]}
                            layout={{ width: 700, height: 400, title: `CH4 Emitter Events of  ${props.singleName}` }} config={{ responsive: true }}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Graphs;