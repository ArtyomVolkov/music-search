import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// actions
import * as playerAction from '../../../actions/player';
// Components
import SongItems from '../SongItems/SongItems';

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

      playerActions.selectSong(song, index);
    }
  };

  render() {
    const {searchResults, songData} = this.props;

    return (
      <div className="music-list">
        {
          searchResults.data &&
          <SongItems
            songs={searchResults.data}
            songData={songData}
            onAction={this.onCallAction} />
        }
      </div>
    );
  }
}

export default MusicList;
