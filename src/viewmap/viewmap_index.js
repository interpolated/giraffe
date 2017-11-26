// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

// import 3rd party react components
import {Panel,Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// import 3rd party libraries
import R from 'ramda';

// import actions
import {setActiveSectionId} from '../common/common_actions'
// import selectors

// import components

import ReactMap, {Layer, Source} from 'react-mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import {accessToken} from '../constants' 
const style = 'mapbox://styles/mapbox/dark-v9'

const Map = ReactMap({
  accessToken
})

const mapStyle ={
  height:'60vh',
  width:'100%'
}

const _onCLick = (m, e) => {
  console.log(e.lngLat)
}

class Viewmap extends Component {

  componentWillMount(){
    this.setState({
      center :[155.4245403625426,-10.11582550013361]
    })
  }
  
  render () {
    return (
      <div className='halfmap'>
        <Map
          onClick={_onCLick}
          center={[149.07714244251417, -26.837047688755582]}
          pitch={0}
          zoom={[4]}
          bearing={0}
          dragRotate={false}
          style={style}
          containerStyle={mapStyle}
        />
      </div>
    )
  }
}

export default Viewmap


