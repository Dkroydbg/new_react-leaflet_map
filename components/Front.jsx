import React from 'react'
// import Map from '../containers/MapContainer'
// import DateRangeContainer from '../containers/DateRangeContainer'

const Front = () => {
  return (
    <div>
      <div className="container">
      <div className="row">
        <div className="col-md-9">
          <Map/>
        </div>
        <div className="col-md-3">
          <DateRangeContainer />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Front