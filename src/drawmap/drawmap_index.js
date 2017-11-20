// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

// import 3rd party react components
import {Panel,Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'

import ReactMap from 'react-mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw';

// import 3rd party libraries
import R from 'ramda';

// import actions
import {setActiveSectionId} from '../common/common_actions'
import accessToken from '../constants';



const Map = ReactMap({
  accessToken
})

const style = 'mapbox://styles/mapbox/dark-v9'


const mapStyle ={
  height:'100%',
  width:'100%'
}

class Drawmap extends Component {
  
    componentWillMount(){
      console.log(MapboxDraw);
      this.setState({
        center :[155.4245403625426,-10.11582550013361]
      })
      this.setState({selectedId:''})
    }
    
    _onStyleLoad = (map, event) => {
      const draw = new MapboxDraw()
      map.addControl(draw)
      this.setState({draw:draw})
    }
  
    render () {
      return (
        <div className='halfmap'>
          <Map
            onStyleLoad={this._onStyleLoad}
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({importActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawmap);

