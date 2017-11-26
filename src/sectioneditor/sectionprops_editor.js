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
    }


    // to bind redux store to state use nextprops
    componentWillReceiveProps(nextProps){
        const activeSecProps = R.filter(R.propEq('id',nextProps.activeSection),nextProps.sectionProps)
        if(!!nextProps.activeSection){
            console.log(activeSec[nextProps.activeSection])
            console.log({...activeSec[nextProps.activeSection].properties})
              this.setState({...activeSecProps[nextProps.activeSection].properties})
            }
          else{
            // this.setState({description:''})
          }
    //   }

    _onChange=(e)=>{
        this.setState({[e.target.id]:e.target.value})
        console.log(this.props.activeSection)
        this.props.updateSectionProps({properties:this.state,id:this.props.activeSection})
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
                              value={ifNullThen(this.props.sectionProps[this.props.activeSection].building,'a')}/>          
                          <FieldGroup
                              // componentClass="text"
                              placeholder="Floors"
                              id="floors"
                              name='floors'
                              type="number"
                              label="projectId"
                              value={ifNullThen(this.props.activeSection.floors,2)}/>          
                          <FieldGroup
                              // componentClass="text"
                              placeholder="Rank"
                              id="rank"
                              name='rank'
                              type="number"
                              label="projectId"
                              value={ifNullThen(this.props.activeSection.rank,1)}/>          
                      </Col>
                  </form>
              </div>
            </Row>  
    )}
    }
} 



// 
const mapStateToProps = ( {sectionProps,activeSection} ) => {
  return {
    sectionProps,
    activeSection
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
