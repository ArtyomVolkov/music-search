import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// actions
import * as playerAction from './../../../actions/player';
// Components
import SongItems from './../SongItems/SongItems';

@connect(
  state => ({
    searchResults: state.searchResults,
    songData: state.player.songData
  }),
  dispatch => ({
    actions: bindActionCreators(playerAction, dispatch)
  })
)
class MusicList extends Component {
  constructor(props) {
    super(props);
  }

  onCallAction =(name, song, index)=> {
    if (name === 'selectSong') {
      this.props.actions.selectSong(song, index);
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
