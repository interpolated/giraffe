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



class Drawmap extends Component {
  
  componentWillMount(){
  
}

  render() {
    return (
      <Row>
      </Row>
    );
  }
}

const mapStateToProps = ( {userToken,activeStaffId,activeProjectInfo,staffInfo} ) => {
  return {
    userToken,
    activeStaffId,
    staffInfo,
    activeProjectInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchStaffInfo,setActiveStaffId}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

