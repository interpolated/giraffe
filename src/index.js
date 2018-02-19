import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';


//import app and components
import App from './App';
import './index.css';
import LoginForm from './authentication/login_component';
import LoginRequiredContainer from './authentication/login_required_container';
import Editor  from './editor/editor_index';

//set up REDUX
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers_index';

//replace with sagas
// import createSagaMiddleware from 'redux-saga'
import {  Router, Route, IndexRoute, Link, hashHistory  } from 'react-router';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(rootReducer, {
  sectionTypes:{resi:{
    id:'resi',
    name:'resi',
    color:'red',
    efficiency:0.8,
    cost:5000,
    value:12000
  },comm:{
    id:'comm',
    efficiency:0.9,
    name:'comm',
    color:'blue',
    cost:3000,
    value:10000
  }},
  activeSectionType:'resi'
}, composeEnhancers(
  applyMiddleware(thunk)
));

window.store =  store


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
          <Route path='login' component={LoginForm}/>
          <Route component={LoginRequiredContainer}>
            <div>'hwat'</div>
            <Route path='editor' component={Editor}/>
          </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')  
)
    // <Route path='staff' component={Staff}/>
    // <Route path='projects' component={Projects}/>
    // <Route path='skills' component={Skills}/>
    // first component will be container, nested routes will be nested like comonents


