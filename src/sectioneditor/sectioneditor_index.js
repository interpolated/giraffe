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
import {sectionTypeActionCreators, setActiveSectionType} from '../common/common_actions' 
// import constants

import SectionTypeList from './sectiontype_list'
import SectionPropsEditor from './sectionprops_editor'


const FieldGroup = ({ id, label, help, ...props })=> {
    return (
      <FormGroup controlId={id}>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

class SectionEditor extends Component {

    constructor(props) {
        super(props);
        this.state={
          name:'',
          cost:'',
          value:'',
          color:''
        }
    }

    // to bind redux store to state use nextprops
        // to bind redux store to state use nextprops
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        const activeSecType = R.filter(R.propEq('id',nextProps.activeSectionType),nextProps.sectionTypes)
        if(!!nextProps.activeSectionType){
              console.log('GOTTA CHANGE')
              console.log(activeSecType[nextProps.activeSectionType])
              this.setState({...activeSecType[nextProps.activeSectionType]})
            }
          else{
              console.log('NO CHANGE')
            // this.setState({description:''})
          }
      }


    _onChange=(e)=>{
        this.setState({[e.target.id]:e.target.value})
    }

    _onClick = (e) => {
        e.stopPropagation()
        if(R.contains(this.state.name,R.keys(this.props.sectionTypes))){
            this.props.updateSectionType(R.merge(this.state,{id:this.state.name}))
        }else{
            this.props.createSectionType(R.merge(this.state,{id:this.state.name}))
        }
    }

    _onClickDelete = (e) => {
        e.stopPropagation()
        this.props.deleteSectionType(R.merge(this.state,{id:this.state.name}))
        this.setState({
            name:'',
            cost:'',
            value:'',
            color:''
          })
    }

  // onChange={_onChange}
  render(){return (
            
          <Row>
            <Col md='3'>
                <SectionPropsEditor/>
            </Col>
            <Col md='3'>
                <SectionTypeList/>
            </Col>
            <Col md="6">
            <div onChange={this._onChange.bind(this)}>
                <form>
            <h4>Active Section Type</h4>  
                <Row>
                    <Col md='6'>
                        <FieldGroup
                            // componentClass="text"
                            placeholder="Type"
                            id="name"
                            name='name'
                            type="text"
                            label="projectId"
                            value={this.state.name}/>          
                    </Col>
                    <Col md='6'>
                        <FieldGroup
                            // componentClass="text"
                            placeholder="Color"
                            id="color"
                            name='color'
                            type="text"
                            label="color"
                            value={this.state.color}/>          
                    </Col>
                </Row>
                <Row>
                    <Col md='6'>
                        <FieldGroup
                            // componentClass="text"
                            placeholder="Cost"
                            id="cost"
                            name='cost'
                            type="number"
                            label="projectId"
                            value={this.state.cost}/>          
                    </Col>
                    <Col md='6'>
                        <FieldGroup
                            // componentClass="text"
                            placeholder="value"
                            id="value"
                            name='value'
                            type="number"
                            label="value"
                            value={this.state.value}/>          
                    </Col>
                </Row>
                </form>
                <Row>
                    <Col md="6">
                    <Button bsStyle="primary" block onClick={this._onClick.bind(this)}>
                    Save
                    </Button>
                    </Col>
                    <Col md="6">
                    <Button bsStyle="danger" block onClick={this._onClickDelete.bind(this)}>
                    Delete
                    </Button>
                    </Col>
                </Row>
            </div>
            </Col>
          </Row>  
  )}
} 


// 
const mapStateToProps = ( {sectionTypes,activeSectionType} ) => {
  return {
    sectionTypes,
    activeSectionType
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createSectionType: sectionTypeActionCreators.createStart,
    updateSectionType:sectionTypeActionCreators.updateStart,
    deleteSectionType: sectionTypeActionCreators.deleteSuccess,
    setActiveSectionType
  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionEditor);
