import React, { Component, Fragment } from 'react';
import { Login } from '../../services/authService';
export default class LoginPage extends Component {
  
  render() {
    return (
      <Fragment>
        <button className="btn btn-md btn-primary" onClick={Login}>Login</button>
      </Fragment>
    );
  };
}