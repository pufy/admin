import React, { Component, Fragment } from 'react';
import LoginPage from './components/auth/Login';
import { checkAuth } from './services/authService';
import './App.css';

export default class App extends Component {
  state = {
    userAccessToken: JSON.parse(localStorage.getItem('token')),
  }

  componentWillMount() {
    checkAuth({
      onSuccessfulAuthorization: this.onSuccessfulAuthorization.bind(this),
      onAccessTokenExpiration: this.onAccessTokenExpiration.bind(this)
    });
  }

  onSuccessfulAuthorization(accessToken) {
    localStorage.setItem('token', JSON.stringify(accessToken));
    this.setState({
      userAccessToken: accessToken
    });
  }

  onAccessTokenExpiration() {
    this.setState({
      userAccessToken: null,
    });
    console.error("The user access token has expired.");
  }

  render() {
    let {
      userAccessToken,
    } = this.state;


    return (
      <div className="App">
        <main>
          {!userAccessToken && <LoginPage />}
        </main>
      </div>
    );
  }
};
