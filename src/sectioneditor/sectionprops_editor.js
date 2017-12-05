// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container, FormGroup, ControlLabel,FormControl,HelpBlock} from 'react-bootstrap'
import {ButtonToolbar,BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// import 3rd party libraries
import R from 'ramda';
import cuid from 'cuid';

// import actions
import {sectionActionCreators, setActiveSection, sectionPropsActionCreators} from '../common/common_actions' 
// import constants

import SectionTypeList from './sectiontype_list'

const ifNullThen = (testObjectProp, defaults)=>{
  if(typeof(testObjectProp)==='undefined'){
    console.log('doesnt exist')
    return defaults
  }else{
    return testObjectProp
  }
}

const FieldGroup = ({ id, label, help, ...props })=> {
    return (
      <FormGroup controlId={id}>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

class SectionPropsEditor extends Component {

    constructor(props) {
        super(props);
        this.state={
          building:'',
          rank:0,
          floors:0
        }
    }


    // to bind redux store to state use nextprops
    componentWillReceiveProps(nextProps){
        const activeSecProps = R.filter(R.propEq('id',nextProps.activeSection),nextProps.sectionProps)
        if(this.props.activeSection!==nextProps.activeSection){
          if(!!nextProps.activeSection&&typeof(activeSecProps[nextProps.activeSection])!=='undefined'){
            console.log('gotta change!')
            console.log(activeSecProps)
            console.log({...activeSecProps[nextProps.activeSection]})
            this.setState({...activeSecProps[nextProps.activeSection]})
          }
          else{
            this.setState({building:'',rank:1,floors:2})
          }
        }
      }

    _onChange=(e)=>{
        console.log('this changes it tooooo')
        console.log({[e.target.id]:e.target.value})
        this.setState({[e.target.id]:e.target.value})
        this.props.updateSectionProps({...R.merge(this.state,{[e.target.id]:e.target.value}),id:this.props.activeSection})
    }

  // onChange={_onChange}
  render(){
    console.log(!!this.props.activeSection)
    if(!!!this.props.activeSection){
      return(
        <div>
          make a sections
        </div>
      )
    }else{

      return (
              
            <Row>
              <div onChange={this._onChange.bind(this)}>
                  <form>
                      <Col md='12'>
                          <h4>Active Section</h4>  
                          <FieldGroup
                              // componentClass="text"
                              placeholder="Code"
                              id="building"
                              name='building'
                              type="text"
                              label="projectId"
                              value={this.state.building}/>          
                          <FieldGroup
                              // componentClass="text"
                              placeholder="Floors"
                              id="floors"
                              name='floors'
                              type="number"
                              label="projectId"
                              value={this.state.floors}/>          
                          <FieldGroup
                              // componentClass="text"
                              placeholder="Rank"
                              id="rank"
                              name='rank'
                              type="number"
                              label="projectId"
                              value={this.state.rank}/>          
                      </Col>
                  </form>
              </div>
            </Row>  
    )}
    }
} 



// 
const mapStateToProps = ( {sectionProps,activeSection, activeSectionType} ) => {
  return {
    sectionProps,
    activeSection,
    activeSectionType
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createSectionProps: sectionPropsActionCreators.createStart,
    updateSectionProps:sectionPropsActionCreators.updateStart,
    deleteSectionProps: sectionPropsActionCreators.deleteSuccess
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionPropsEditor);
