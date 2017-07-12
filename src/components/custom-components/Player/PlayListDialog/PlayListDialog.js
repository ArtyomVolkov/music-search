import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// Actions
import * as playerAction from '../../../../actions/player';
// MU components
import {Dialog} from 'material-ui';
// Components
import TrackList from '../../TrackList/TrackList';
// Styles
import './PlayListDialog.scss';

@connect(
  state => ({
    showPlayList: state.playLists.showPlayList,
    playLists: state.playLists,
    songData: state.player.songData
  }),
  dispatch => ({
    playerAction: bindActionCreators(playerAction, dispatch)
  })
)
class PlayListDialog extends Component {
  constructor(props) {
    super(props);
  }

  onAction = (actionName, track, index) => {
    if (actionName === 'on-play') {
      this.onPlayTrack(track, index);
    }
  };

  onPlayTrack(track, index) {
    const {songData, playerAction} = this.props;

    if (track.id === songData.id) {
      playerAction.onTogglePlay();
      return;
    }
    playerAction.selectSong(track, index);
  }

  render() {
    const {showPlayList, playLists} = this.props;
    const activePlayList = playLists.data[playLists.activeIndex];

    return (
      <Dialog
        title={activePlayList.name}
        modal={true}
        open={showPlayList}
        autoScrollBodyContent={true}>
        <div className="body-content">
          <TrackList
            subHeader={`Tracks (${activePlayList.tracks.length})`}
            tracks={activePlayList.tracks}
            type={'playlist-track'}
            onAction={this.onAction}
          />
        </div>
      </Dialog>
    );
  }
}

export default PlayListDialog;