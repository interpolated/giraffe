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

import ReactMap, {Layer, Source, GeoJSONLayer} from 'react-mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import {accessToken} from '../constants' 
import {dummy_state} from '../common/dummy_data'


const style = 'mapbox://styles/mapbox/bright-v9'

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
      center :[ 151.21013774806318, -33.84333797354172],
      zoom:[14]
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({center:nextProps.center})
  }

  // shouldComponentUpdate(nextProps,nextState){
  //   console.log(nextState.center)
  //   console.log(nextProps.center)
  //   console.log(this.state.center!=nextState.center)
  //   return (this.state.center!=nextState.center)
  // }
  
  
  sourceUpdater = function(sections,sectionProps,sectionTypes){
      //  const sections = nextProps.sections;
      //  const sectionProps = nextProps.sectionProps;
      //  const sectionTypes = nextProps.sectionTypes;
       
      // these load dummy data - commment out when finished
      // const sections = dummy_state.sections;
      // const sectionProps = dummy_state.sectionProps;
      // const sectionTypes = dummy_state.sectionTypes;

       //set of unique building codes
      let buildingSet = new Set()
       // add each code to the set
      R.values(sectionProps).map((x)=>{buildingSet.add(x.building)})
      // convert to a list and then for every building add floors etc.
      let buildingList = [...buildingSet]
      
      // for every building
      // filter out sectionProps
      
      let sectionPropFilter = x => R.filter(R.pathEq(['building'],x),sectionProps)
      let toList = x => R.values(x)
      let sortr = (a,b)=>{
        return parseInt(R.path(['rank'],a))-parseInt(R.path(['rank'],b))
      }
      const buildingMaker = R.pipe(
       sectionPropFilter,
       toList,
       R.sort(sortr),
       R.map(filler),
       R.reduce(R.concat,[]),
       R.addIndex(R.map)((obj, i, arr)=>{
        // maps over an array of features adding height, base height and color to each property 
        const k = i
        arr[i].height = (k+1)*4-0.2
        arr[i].base_height = k*4
        arr[i].color = sectionTypes[obj.sectionType].color
        return arr[i]
       }),
       R.addIndex(R.map)((item,index,array)=>{
        return {
         type:'feature',
         id:item.id+index,
         geometry:sections[String(item.id)].geometry,
         properties:item}}),
        )
      let featuresWithProps = buildingList.map(buildingMaker)
      return R.assoc('features',R.reduce(R.concat,[],featuresWithProps),{type:'FeatureCollection'})
      }
  
  render () {
    return (
      <div className='halfmap'>
        <Map
          onClick={_onCLick}
          center={this.state.center}
          pitch={0}
          zoom={this.state.zoom}
          bearing={0}
          dragRotate={false}
          style={style}
          containerStyle={mapStyle}
        >
          <GeoJSONLayer
            id="LOADED_GEOJSON"
            data={this.sourceUpdater(this.props.sections,this.props.sectionProps,this.props.sectionTypes)}
            fillExtrusionPaint={{
              'fill-extrusion-color': {
                'type': 'identity',
                'property': 'color'
              },
              'fill-extrusion-height': {
                  'type': 'identity',
                  'property': 'height'
              },
              'fill-extrusion-base': {
                  'type': 'identity',
                  'property': 'base_height'
              }
              }}
            />
        </Map>
      </div>
    )
  }
}

  const logX = x => console.log(x)
  
  const filler = (x) => {
   const dumbArray =  Array(parseInt(x.floors)).fill(1)
   const smartArray = dumbArray.map((t)=>{return R.clone(x)})
   return smartArray 
  }
  
  
  const mapStateToProps = ( {sectionProps,sectionTypes,sections,center} ) => {
    return {
      sections,
      sectionTypes,
      sectionProps,
      center
    }
  }

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewmap);






