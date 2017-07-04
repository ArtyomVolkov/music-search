import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import * as playerActions from '../../../actions/player';
import * as artistActions from '../../../actions/artist';
import * as system from '../../../actions/system';
// M-UI components
import { IconMenu, MenuItem, IconButton, CircularProgress } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { ListItem } from 'material-ui/List';
// Style
import './TrackItem.scss';

@connect(
  state => ({
    player: state.player
  }),
  dispatch => ({
    playerActions: bindActionCreators(playerActions, dispatch),
    artistActions: bindActionCreators(artistActions, dispatch),
    systemActions: bindActionCreators(system, dispatch)
  })
)
class TrackItem extends React.Component {
  constructor (props) {
    super(props);
  }

  onPlaySong (index) {
    const { playerActions, systemActions, player } = this.props;

    if (player.songData && index === player.soundIndex) {
      if (player.songData.id === player.trackIdError) {
        systemActions.onPushMessage({
          type: 'error',
          msg: 'Error in audio stream'
        });
        return
      }
      // toggle play
      playerActions.onTogglePlay();
      return;
    }
    playerActions.playNext(index);
  }

  onSubActions (name, e) {
    const {track} = this.props;

    switch (name) {
      case 'on-download':
        window.open(track.stream_url, '_self');
        break;

      default :break;
    }
  }

  render () {
    const { player, track, indexItem } = this.props;
    const active = player.songData && player.songData.id === track.id ? 'active' : '';
    const error = (player.songData && !!active && player.songData.id === player.trackIdError) ? 'error' : '';

    return (
      <div className={`track-item ${active} ${error}`}>
        <ListItem
          disabled={false}
          onTouchTap={this.onPlaySong.bind(this, indexItem)}
          primaryText={
            <div className="song-info">
              <span className="singer">{track.singer}</span>
              <span className="divider">-</span>
              <span className="song-name">{track.song}</span>
            </div>
          }
          rightIconButton={
            <IconMenu
              iconButtonElement={
                <IconButton
                  touch={true}
                  tooltipPosition="bottom-left">
                  <MoreVertIcon color={'#607D8B'}/>
                </IconButton>
              }>
              <div className="track-item-action-icons">
                <MenuItem
                  leftIcon={<i className="fa fa-list-alt"/>}
                  onTouchTap={this.onSubActions.bind(this, 'to-playlist')}
                >Add to playlist</MenuItem>
                <MenuItem
                  leftIcon={<i className="fa fa-star"/>}
                  onTouchTap={this.onSubActions.bind(this, 'to-favorite')}
                >Add to favorite</MenuItem>
                <MenuItem
                  leftIcon={<i className="fa fa-download"/>}
                  disabled={error || !active}
                  onTouchTap={this.onSubActions.bind(this, 'on-download')}
                >Download</MenuItem>
              </div>
            </IconMenu>
          }
          leftAvatar={
            <div>
              <i className={`fa ${player.soundIndex === indexItem && player.play
                ? 'fa-pause-circle' : 'fa-play-circle'}`}/>
            </div>
          }
        />
        {
          player.streamLoading && player.streamId === track.id &&
          <div className="spinner-wrapper">
            <CircularProgress
              size={45}
              thickness={4}
              color="#FF9800"
              style={{ left: 10 }}
            />
          </div>
        }
      </div>
    )
  }
}

export default TrackItem;