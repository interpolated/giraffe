import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';


//import app and components
import App from './App';
import './index.css';
import LoginForm from './authentication/login_component';
import LoginRequiredContainer from './authentication/login_required_container';
import { Editor } from './editor/editor_index';

//set up REDUX
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers_index';

//replace with sagas
// import createSagaMiddleware from 'redux-saga'
import {  Router, Route, IndexRoute, Link, hashHistory  } from 'react-router';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  rootReducer,
  // initial state
  applyMiddleware(thunk)
)

// then run the saga

window.store =  store


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <Route path='login' component={LoginForm}/>
      
        <Route component={LoginRequiredContainer}>
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


