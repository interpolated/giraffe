// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

// import 3rd party react components
import {Panel,Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import {dummy_state} from '../common/dummy_data'

// import 3rd party libraries
import R from 'ramda';
import {area} from 'turf';

// import actions
import {setActiveSectionType, sectionPropsActionCreators}  from '../common/common_actions';

// import selectors 
class SectionAreaList extends Component  {
    
    onRowClick = (e) =>{
    }

  areaBySectionAgg = function(
    sections,sectionProps,sectionTypes
  ){
    // these load dummy data - commment out when finished
    // const sections = dummy_state.sections;
    // const sectionProps = dummy_state.sectionProps;
    // const sectionTypes = dummy_state.sectionTypes;

    //set of unique building codes
    let sectionSet = new Set()
    // add each code to the set
    R.values(sectionProps).map((x)=>{sectionSet.add(x.sectionType)})
    // convert to a list and then for every building add floors etc.
    let sectionList = [...sectionSet]
    
    // for every building get the areas
    // filter out sectionProps
    // filters out sectionProps by building code
    let sectionPropFilter = x => R.filter(R.pathEq(['sectionType'],x),sectionProps)
    // converts filtered object {id1:obj1,id2:obj2} to list of objects [obj1,obj2]
    let toList = x => R.values(x)
    // sorts list by rank of obj
    // runs over list of 
    let areaAdder = (sectionProp) => {
        console.log('this is the section prop....')
        console.log(sectionProp)
        return area(sections[sectionProp.id])*sectionProp.floors*parseFloat(sectionTypes[sectionProp.sectionType].efficiency)
    }

    const areaBySection = R.pipe(
      sectionPropFilter,
      toList,
      R.map(areaAdder),
      R.reduce(R.add,0),
    )

    let sectionTypeAreas = sectionList.map(areaBySection)
    return R.zipWith((x,y)=>{return {sectionType:x, area:parseInt(y)}},sectionList,sectionTypeAreas)
    }

  // console.log(denormalizedData.users)
  render (){  
    return(
      <Row>
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

          hover
          striped
          data = {this.areaBySectionAgg(this.props.sections,this.props.sectionProps,this.props.sectionTypes)}
        //   search
          condensed>
              <TableHeaderColumn isKey dataField='sectionType'>Type</TableHeaderColumn>
              <TableHeaderColumn dataField='area'>Area</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </Row>
    )}    

}

const logX = x => console.log(x)

const mapStateToProps = ( {sections,sectionTypes, activeSection, sectionProps} ) => {
  return {
    sections,
    sectionTypes,
    sectionProps,
    activeSection
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     createSectionProps: sectionPropsActionCreators.createStart,
//     updateSectionProps:sectionPropsActionCreators.updateStart,
//     deleteSectionProps: sectionPropsActionCreators.deleteSuccess,
//     setActiveSectionType
//   }, dispatch)
// }

export default connect(mapStateToProps)(SectionAreaList);