// import react and redux
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import numeral from 'numeral'

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
class TotalCostTable extends Component  {
    
    onRowClick = (e) =>{
    }

  costAgg = function(
    sections,sectionProps,sectionTypes
  ){
    // these load dummy data - commment out when finished
    // const sections = dummy_state.sections;
    // const sectionProps = dummy_state.sectionProps;
    // const sectionTypes = dummy_state.sectionTypes;

    let costAdder = (sectionProp) => {
        return parseInt(area(sections[sectionProp.id])*sectionProp.floors*sectionTypes[sectionProp.sectionType].cost)
      }
      let valueAdder = (sectionProp) => {
        return  parseInt(area(sections[sectionProp.id])*sectionProp.floors*sectionTypes[sectionProp.sectionType].value)
    }
    
    const totalCost = R.pipe(
        R.map(costAdder),
        R.reduce(R.add,0)
        // R.tap(logX)
    )
    
    const totalValue = R.pipe(
        R.map(valueAdder),
        R.tap(logX),
        R.reduce(R.add,0)
        // R.tap(logX)
    )

    const cost = totalCost(R.values(sectionProps))
    const value = totalValue(R.values(sectionProps)) 
    // const profit = totalValue(R.values(sectionProps))-totalCost(R.values(sectionProps))
    const profit =  value*0.25
    const land = value*0.75-cost
    

    return {cost: cost,
            value:value,
            margin: '20%',
            land:land,
            profit:profit
          }
    }

    
    
    // (value-cost-land) = 0.2*(cost + land)
    // 5*(value-cost)-cost = land+5*land
    //profit = 0.2*(land+cost)
    // value - cost - -cost
    // (profit - cost)*5
    // profit = 0.2*(value - cost - land)
    // profit = 0.2*(value - cost - land)
    // - profit*5 - cost + value = land
    
    // console.log(denormalizedData.users)
    render (){  
      const outputs = this.costAgg(this.props.sections,this.props.sectionProps,this.props.sectionTypes)
      return(
        <Row>
        <div>
          <Col md={12}>
            <Col md={2}  >
            <p style={{align:'centre'}}>Cost: {numeral(outputs.cost).format('0.0a')}</p>
            </Col>
            <Col md={2}  >
            <p>Value: {numeral(outputs.value).format('0.0a')}</p>
            </Col>
            <Col md={2}  >
            <p>Profit: {numeral(outputs.profit).format('0.0a')}</p>
            </Col>
            <Col md={2}  >
            <p>Margin: {outputs.margin}</p>
            </Col>
            <Col md={2}  >
            <p>Land: {numeral(outputs.land).format('0.0a')}</p>
            </Col>
          </Col>
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

export default connect(mapStateToProps)(TotalCostTable);