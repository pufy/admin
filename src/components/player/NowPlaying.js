import React, { Component } from 'react';

export default class NowPlaying extends Component {
  render() {
    let {
      playerState,
    } = this.props;
    
    let {
      uri: track_uri,
      name: track_name,
      artists: [{
        name: artist_name,
        uri: artist_uri
      }],
      album: {
        name: album_name,
        uri: album_uri,
        images: [{ url: album_image }]
      }
    } = playerState.track_window.current_track;

    return (
      <div>
        <div>
          <img src={album_image} alt={track_name} />
          <h4><a href={track_uri}>{track_name}</a> - <a href={artist_uri}>{artist_name}</a></h4>
          <h4><a href={album_uri}>{album_name}</a></h4>
        </div>
      </div>
    );
  }
}