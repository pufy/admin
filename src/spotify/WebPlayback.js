import React, { Component, Fragment } from 'react';

export default class SpotifyWebPlayback extends Component {
  webPlaybackInstance = null;

  componentDidMount = () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.handleLoadSuccess();
    };
  };

  componentWillUnmount = () => {
    if (this.webPlaybackInstance) {
      this.webPlaybackInstance.removeListener('initialization_error');
      this.webPlaybackInstance.removeListener('authentication_error');
      this.webPlaybackInstance.removeListener('account_error');
      this.webPlaybackInstance.removeListener('playback_error');
      this.webPlaybackInstance.removeListener('player_state_changed');
      this.webPlaybackInstance.removeListener('ready');
      this.webPlaybackInstance.removeListener('not_ready');
    }
  };

  handleLoadSuccess = () => {

    this.webPlaybackInstance = new window.Spotify.Player({
      name: 'Pufy Web Player',
      getOAuthToken: async callback => {
        if (typeof this.props.onPlayerRequestAccessToken !== "undefined") {
          let userAccessToken = await this.props.onPlayerRequestAccessToken();
          callback(userAccessToken);
        }
      }
    });

    this.webPlaybackInstance.on('initialization_error', ({ message }) => {
      console.error(message);
    });

    this.webPlaybackInstance.on('authentication_error', ({ message }) => {
      console.error(message);
    });

    this.webPlaybackInstance.on('account_error', ({ message }) => {
      console.error(message);
    });

    this.webPlaybackInstance.on('playback_error', ({ message }) => {
      console.error(message);
    });

    this.webPlaybackInstance.on('player_state_changed', async state => {
      console.log('Fire Websocket to propagate player_state_changed');
      console.log(state.track_window.current_track.name)
      await this.props.onPlayerStateChange(state);
    });

    this.webPlaybackInstance.on('ready', data => {
      console.log('Call Backend for select device ' + data.device_id);
      this.props.onPlayerLoading(data.device_id);
    });

    this.webPlaybackInstance.on('not_ready', data => {
      console.log('Device ID has gone offline', data.device_id);
    });

    this.webPlaybackInstance.connect().then(success => {
      if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!');
      }
    })
  };

  render() {
    return (
      <Fragment>{this.props.children}</Fragment>
    )
  };

};