"use client"
import { Chart, Bubble, Line } from 'react-chartjs-2';
import React from 'react'
import Moment from 'moment';
//import Plot from "react-plotly.js";
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), {
    ssr: false
})
const Graphs = (props) => {

    const dates = []
    const values = []
    const dates1 = []
    const yesno = []
    const values1 = []
    let emitter=0
    let nonNanValues=0
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
            if (key.id == props.id&&key.Value!= null) {
                nonNanValues++;
            }
        })
    }



    //to get the dates on which the emitter has been occured and values are the values on which the emitter has been occured and emitter is the total number of times the emitter has been occured.
    if (isObjectEmpty(props.jsonvalue) == false) {
        props.jsonvalue.map((key, index) => {
            if (key.id == props.id && key.Leak == 'Yes') {
                dates1.push(Moment(key.Date).format('YYYY-MM-DD'));
                values1.push(key.Value)
                yesno.push(key.Leak)
                emitter++
            }
        })
    }

    console.log("the emitter for the id ",props.id, " and total number of emitter events that has ocured is ",emitter)



    console.log("props in graph is: ", props.id)
    console.log(values1)


    return (

        <div className='container' style={{ maxWidth: "100%", textAlign: "center" }}>
            <div className='row'>
                <div className='col-md-6 d-flex justify-content-center'>
                    <div className='graph' style={{
                        width: "100%",
                        height: "auto",
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
                        <div className='row'>
                            <div className="d-flex justify-content-center">
                                <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Data Availibility: {nonNanValues} Days</h5>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 d-flex justify-content-center'>
                    <div className='scattergraph' style={{
                        width: "100%",
                        height: "auto",
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
                        <div className='row'>
                            <div className=" d-flex justify-content-center">
                                <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Emitter Events: {emitter}</h5>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>

    )
}

export default Graphs;