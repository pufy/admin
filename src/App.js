import React, { Component, Fragment } from 'react';
import LoginPage from './components/auth/Login';
import SpotifyWebPlayback from './spotify/WebPlayback';
import { checkAuth } from './services/authService';
import './App.css';

export default class App extends Component {
  state = {
    userAccessToken: JSON.parse(localStorage.getItem('token')),
    playerState: null,
    deviceId: null
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
      playerState: null,
      playerId: false,
    });
    console.error("The user access token has expired.");
  }

  render() {
    let {
      userAccessToken,
      playerState,
      deviceId
    } = this.state;

    let webPlaybackSdkProps = {
      onPlayerRequestAccessToken: (() => userAccessToken),
      onPlayerLoading: ((deviceId) => this.setState({ deviceId: deviceId})),
      onPlayerStateChange: (playerState => this.setState({ playerState: playerState })),
    };

    return (
      <div className="App">
        <main>
          {!userAccessToken && <LoginPage />}
          {userAccessToken &&
            <SpotifyWebPlayback {...webPlaybackSdkProps}>
              { deviceId &&
                <div> Ready with Device ID: {this.state.deviceId}</div> 
              }
            </SpotifyWebPlayback>
          }
        </main>
      </div>
    );
  }
};
