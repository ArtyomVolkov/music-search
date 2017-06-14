import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// Actions
import * as playerAction from '../../../../actions/player';
// MU components
import {Dialog} from 'material-ui';
// Components
import SongItems from '../../SongItems/SongItems';
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

  onCallAction = (name, song, index) => {
    if (name === 'selectSong') {
      this.props.playerAction.selectSong(song, index);
    }
  };

  render() {
    const {showPlayList, songData, playLists} = this.props;
    const activePlayList = playLists.data[playLists.activeIndex];

    return (
      <Dialog
        title={activePlayList.title}
        modal={false}
        open={showPlayList}
        autoScrollBodyContent={true}>
        <div className="body-content">
          <SongItems
            songs={activePlayList.tracks}
            songData={songData}
            onAction={this.onCallAction}
          />
        </div>
      </Dialog>
    );
  }
}

export default PlayListDialog;