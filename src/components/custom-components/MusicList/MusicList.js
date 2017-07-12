import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import * as playerAction from '../../../actions/player';
import * as system from '../../../actions/system';
// Components
import ArtistList from '../ArtistList/ArtistList';
import TrackList from '../TrackList/TrackList';
import GenresSection from '../GenresSection/GenresSection';
// Services
import RouterService from '../../../services/RouterService/RouterService';
// Style
import './MusicList.scss';

@connect(
  state => ({
    searchResults: state.searchResults,
    player: state.player
  }),
  dispatch => ({
    playerActions: bindActionCreators(playerAction, dispatch)
  })
)
class MusicList extends Component {
  constructor (props) {
    super(props);
  }

  onCallAction = (name, song) => {
    const { playerActions, player } = this.props;

    if (name === 'selectSong') {
      if (player.playList) {
        // reset playList Data
        playerActions.setPlayListData(null);
      }
      RouterService.navigate(`/artist/${song.stringId}`);
    }
  };

  onAction = (actionName, track, index) => {
    if (actionName === 'on-play') {
      this.onPlaySong(track, index);
    }
  };

  onPlaySong (track, index) {
    const { playerActions, player } = this.props;

    if (player.songData && player.songData.id === track.id) {
      if (player.songData.id === player.trackIdError) {
        system.onPushMessage({
          type: 'error',
          msg: 'Error in audio stream'
        });
        return;
      }
      // toggle play
      playerActions.onTogglePlay();
      return;
    }
    playerActions.playNext(index, 'track');
  }

  render () {
    const { searchResults, songData } = this.props;

    return (
      <div className="music-list">
        {
          searchResults.type === 'ARTIST' &&
          (searchResults.data &&
            <ArtistList
              artists={searchResults.data}
              songData={songData}
              onAction={this.onCallAction}
            />
          )
        }
        {
          searchResults.type === 'TRACK' &&
          (searchResults.data &&
            <TrackList
              type={'track'}
              tracks={searchResults.data}
              subHeader={`Found tracks (${searchResults.data.length})`}
              showActions={true}
              onAction={this.onAction}
            />
          )
        }
        {
          searchResults.type === 'GENRE' &&
          (searchResults.data &&
            <GenresSection genres={searchResults.data}/>
          )
        }
      </div>
    );
  }
}

export default MusicList;
