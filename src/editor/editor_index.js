import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import {Row,Col,ButtonGroup, Button,Container} from 'react-bootstrap'

import { Viewmap } from "../viewmap/viewmap_index";
import { Drawmap } from "../drawmap/drawmap_index";


const Editor = (props) => {
  return (
    <Row>
        <Col md='4'>
            <Viewmap/>
        </Col>
        <Col md='4'>
            <Drawmap/>
        </Col>   
    </Row>
  )
}

export default Editor
