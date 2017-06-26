import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// actions
import * as playerAction from '../../../actions/player';
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
    songData: state.player.songData,
    playList: state.player.playList
  }),
  dispatch => ({
    playerActions: bindActionCreators(playerAction, dispatch)
  })
)
class MusicList extends Component {
  constructor(props) {
    super(props);
  }

  onCallAction =(name, song, index)=> {
    const {playerActions, playList} = this.props;

    if (name === 'selectSong') {
      if (playList) {
        // reset playList Data
        playerActions.setPlayListData(null);
      }
      RouterService.navigate(`/artist/${song.stringId}`);
    }
  };

  render() {
    const {searchResults, songData} = this.props;

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
              tracks={searchResults.data}
              subHeader={`Found tracks (${searchResults.data.length})`}
              artistId={null}
            />
          )
        }
        {
          searchResults.type === 'GENRE' &&
          (searchResults.data &&
            <GenresSection genres={searchResults.data} />
          )
        }
      </div>
    );
  }
}

export default MusicList;
