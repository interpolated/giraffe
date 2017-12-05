// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

// import 3rd party react components
import {Panel,Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import ReactMap from 'react-mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import {accessToken} from '../constants' 

// import 3rd party libraries
import R from 'ramda';

// import actions
import {setActiveSection, sectionActionCreators, setCenter} from '../common/common_actions'

console.log(accessToken)

const Map = ReactMap({
  accessToken
})

const style = 'mapbox://styles/mapbox/dark-v9'


const mapStyle ={
  height:'60vh',
  width:'100%'
}
class Drawmap extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        center:[0,0],
      }
    }
    
    componentWillMount(){
      // console.log('IT mounted!!!!!!!!!!')
      this.setState({
        center :[ 151.21013774806318, -33.84333797354172],
        zoom:[12]
      })
      // this.setState({selectedId:''})
    }
    
    _onStyleLoad = (map, event) => {
      const draw = new MapboxDraw()
      map.addControl(draw)
      this.setState({draw:draw})
    }
  

    
    _onClick = (map, evt) => {
      const selectedId = this.state.draw.getSelectedIds()[0]
      console.log('waaa')
        if(evt.originalEvent.altKey==true){
          console.log(evt)
          console.log(JSON.stringify(evt.lngLat))
          this.props.setCenter(R.values(evt.lngLat))
            // f = dataGetter(evt.lngLat)
          }
          
          if(evt.originalEvent.shiftKey==true){
            // f = sitePicker(e)
          }
    
        // if selectedId is new, add geom to state
        // otherwise set the active section to that selectedId
        if(R.contains(selectedId,R.keys(this.props.sections))){
          console.log(selectedId)
          this.props.updateSection(R.merge(this.state.draw.getSelected().features[0],{id:selectedId}))
          this.props.setActiveSection(selectedId)
        }else{
          console.log(selectedId)
          this.props.createSection(this.state.draw.getSelected().features[0])
          this.props.setActiveSection(selectedId)
        }
        // console.log(selectedId[0])
    }
    
    // onMouseUp = (map,evt)

    render () {
      // console.log(this.state.center)
      return (
        <div className='halfmap'>
          <Map
            onStyleLoad={this._onStyleLoad}
            onClick={this._onClick}
            center={this.state.center}
            pitch={0}
            zoom={this.state.zoom}
            bearing={0}
            dragRotate={false}
            style={style}
            containerStyle={mapStyle}
          />
        </div>
      )
    }
  }

const mapStateToProps = ( {activeSection,sections} ) => {
    return {
      activeSection,
      sections
    }
  }
  

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createSection:sectionActionCreators.createStart,
    deleteSection:sectionActionCreators.deleteSuccess,
    updateSection:sectionActionCreators.updateStart,
    setActiveSection,
    setCenter
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawmap);

