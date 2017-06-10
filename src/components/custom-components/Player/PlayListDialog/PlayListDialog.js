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
    playlist: state.player.playList
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
    const {showPlayList, playlist} = this.props;

    return (
      <Dialog
        title="Playlist dialog"
        modal={false}
        open={showPlayList}
        autoScrollBodyContent={true}>
        <div className="body-content">
          <SongItems
            songs={playlist}
            songData={null}
            onAction={this.onCallAction}
          />
        </div>
      </Dialog>
    );
  }
}

export default PlayListDialog;