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
class BuildingAreaList extends Component  {
    
    onRowClick = (e) =>{
    }

  areaByBuildingAgg = function(sections,sectionProps,sectionTypes){
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
    
    // for every building get the areas
    // filter out sectionProps
    // filters out sectionProps by building code
    let sectionPropFilter = x => R.filter(R.pathEq(['building'],x),sectionProps)
    // converts filtered object {id1:obj1,id2:obj2} to list of objects [obj1,obj2]
    let toList = x => R.values(x)
    // sorts list by rank of obj
    let sortr = (a,b)=>{
      return parseInt(R.path(['rank'],a))-parseInt(R.path(['rank'],b))
    }
    // runs over list of 
    let areaAdder = (sectionProp) => {
        return area(sections[sectionProp.id])*sectionProp.floors*parseFloat(sectionTypes[sectionProp.sectionType].efficiency)
    }

    const areaByBuilding = R.pipe(
        sectionPropFilter,
        toList,
        R.map(areaAdder),
        R.reduce(R.add,0)
        // to do: add value sectionTypes.val*area
    )

    let buildingAreas = buildingList.map(areaByBuilding)
    return R.zipWith((x,y)=>{return {section:x, area:parseInt(y)}},buildingList,buildingAreas)
    }

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
          data = {this.areaByBuildingAgg(this.props.sections,this.props.sectionProps,this.props.sectionTypes)}
        //   search
          condensed>
              <TableHeaderColumn isKey dataField='section'>Buildings</TableHeaderColumn>
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

export default connect(mapStateToProps)(BuildingAreaList);