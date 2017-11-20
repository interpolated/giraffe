import React, { Component } from 'react';
import logo from './logo.svg';
import {Navbar, NavItem, Nav } from 'react-bootstrap';
import './App.css';
import {Link} from 'react-router'
import {LinkContainer} from 'react-router-bootstrap'
import {connect}  from 'react-redux';

const LoggedInNav = (props)=>{
  return(
    <Nav pullRight>
      <LinkContainer to={{ pathname: '/editor'}}>
        <NavItem>seats</NavItem>
      </LinkContainer>
    </Nav>
  )
}


const NotLoggedInNav = (props)=>{
  return(
                <Nav pullRight>
    <LinkContainer to={{ pathname: '/login'}}>
      <NavItem>login</NavItem>
    </LinkContainer>
    </Nav>
  )
}



const App = (props) =>{
  return (
    <div>
      <div>
         <Navbar collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Orange Juice</a>
              </Navbar.Brand>
            </Navbar.Header>
              {props.isLoggedIn?(<LoggedInNav/>)
                :(<NotLoggedInNav/>)}
          </Navbar>
      </div>
      <div className="container-fluid">
        {props.children}
      </div>
    </div>
    )
};

function mapStateToProps({isLoggedIn}, ownProps) {
  return {
    isLoggedIn,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({setRedirectUrl}, dispatch)
// }


export default connect(mapStateToProps)(App)

        