import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import {Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'

import  Viewmap  from "../viewmap/viewmap_index";
import  Drawmap  from "../drawmap/drawmap_index";
import  SectionEditor  from "../sectioneditor/sectioneditor_index";
import AreaReportList from '../report/report_index'

const Editor = (props) => {
    return (
      <div>
        <Row>
            <Col md={6}>
                <Viewmap/>
                <AreaReportList/>
            </Col>
            <Col md={6}>
                <Drawmap/>
                <SectionEditor/>
            </Col>   
        </Row>
      </div>    
  )
}

export default Editor
