
// import react and redux
import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// import 3rd party react components
import {Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// import 3rd party libraries
import R from 'ramda';

// import actions
import {setActiveSectionType, sectionPropsActionCreators}  from '../common/common_actions';

// import selectors 


class SectionTypeList extends Component  {
    
    onRowClick = (e) =>{
        if(!!this.props.activeSection){
          this.props.updateSectionProps({
            ...this.props.sectionProps[this.props.activeSection],
            sectionType:e.name, 
            id:this.props.activeSection})
        }
        this.props.setActiveSectionType(e.name)
    }
    

options = {
    onRowClick: this.onRowClick
  };  

  // console.log(denormalizedData.users)
  render (){ 
    return(
      <div>
        <div>
          <BootstrapTable 
          height={'150px'}
          // set table style offsets to 15
          containerStyle={ {
            marginTop: 5,
            marginBottom: 5,
            marginRight: 10,
            marginLeft: 10,
          } }

          tableStyle={ {
            marginTop: 5,
            marginBottom: 5,
            marginRight: -10,
            marginLeft: -10,
          } }

          data={Object.values(Object.values(this.props.sectionTypes))} 
          options = {this.options}
          hover
          striped
        //   search
          condensed>
              <TableHeaderColumn isKey dataField='id'>Section Types</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    )}    

}



const mapStateToProps = ( {sectionTypes, activeSection, sectionProps} ) => {
  return {
    sectionTypes,
    sectionProps,
    activeSection
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createSectionProps: sectionPropsActionCreators.createStart,
    updateSectionProps:sectionPropsActionCreators.updateStart,
    deleteSectionProps: sectionPropsActionCreators.deleteSuccess,
    setActiveSectionType
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionTypeList);