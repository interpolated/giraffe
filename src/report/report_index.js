import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import {Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'

import  BuildingAreaList  from './building_table';
import  SectionAreaList  from './section_table';
import  TotalCostTable  from './total_cost_table';

const Report = (props) => {
    return (
      <div>
        <Row>
            <Col md={6}>
                <Col md={12}>
                    <BuildingAreaList/>
                </Col>
            </Col>
            <Col md={6}>
                <Col md={12}>
                <SectionAreaList/>
                </Col>
            </Col>   
        </Row>
        <Row>
            <TotalCostTable/>
        </Row>
      </div>    
  )
}

export default Report