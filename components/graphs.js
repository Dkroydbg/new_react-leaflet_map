import { Line } from 'react-chartjs-2';
import React from 'react'
import Moment from 'moment';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,  //x-axis
    LinearScale,  //y-axis
    Legend,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    Legend,
    PointElement,
    Title,
    Tooltip,
    
)



const Graphs = (props) => {


  const dates=[]
  const values=[]

  const isObjectEmpty = (objectName) => {
    for (let prop in objectName) {
      if (objectName.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  };
  
    if(isObjectEmpty(props.jsonvalue)==false) {
        props.jsonvalue.map((key,index)=>{
        if(key.id==props.id){
          dates.push(Moment(key.Date).format('YYYY-MM-DD'));
          values.push(key.Value)
        }
      })
    }
    
  
  console.log("props in graph is: ",props.id)
  console.log(values)

    const data={
        labels: dates? dates:null,
        datasets: [
            {
                labels:'sales of the week',
                data: values? values:null,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                pointBorderColor:'aqua',
                pointStyle: 'circle',
                pointRadius: 6,
                pointHoverRadius: 10,
                fill:true,
                tension:0.4
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart',
            },
          },
    }
  return (
    <div>
        <h1 style={{marginTop:"10px"}}>Super Emitter Graph</h1>
        <div className='graph' style={{
            width:"800px",
            height:"500px",
            margin:"10px"
            // marginRight: "10px"
        }}>
            <Line data={data}
            options={options} />
        </div>
    </div>
  )
}

export default Graphs