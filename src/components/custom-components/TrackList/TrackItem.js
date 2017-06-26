import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import * as playerActions from '../../../actions/player';
import * as artistActions from '../../../actions/artist';
import * as system from '../../../actions/system';

// endpoints
import {getSongStreamById} from '../../../endpoints/aws-api';

// MU components
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

    this.state = {
      loading: false
    };
  }

  onPlaySong (track, index) {
    const { playerActions, systemActions, player } = this.props;
    let songData = {};

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


    //playerActions.loadingSongStream(track.id);
    this.setState({
      loading: true
    });

    songData = Object.assign({}, track);
    getSongStreamById(track.id).then((streamData) => {
      songData.stream_url = streamData.data;
      playerActions.selectSong(songData, index);

      this.setState({
        loading: false
      });
    });
  }

  render () {
    const { player, track, indexItem } = this.props;
    const { loading } = this.state;
    const active = player.songData && player.songData.id === track.id ? 'active' : '';
    //const disabled = !track.mbid ? 'disabled' : '';
    const error = (player.songData && !!active && player.songData.id === player.trackIdError) ? 'error' : '';

    return (
      <div className={`track-item ${active} ${error}`} >
        <ListItem
          disabled={false}
          onTouchTap={this.onPlaySong.bind(this, track, indexItem)}
          primaryText={
            <div className="song-info">
              <span className="singer">{track.singer}</span>
              <span className="divider">-</span>
              <span className="song-name">{track.song}</span>
            </div>
          }
          rightIconButton={
          <IconMenu iconButtonElement={
            <IconButton
              touch={true}
              tooltip="actions"
              tooltipPosition="bottom-left">
              <MoreVertIcon color={'#607D8B'}/>
            </IconButton>
          }>
            <MenuItem leftIcon={<i className="fa fa-list-alt" />}>Add to playlist</MenuItem>
            <MenuItem leftIcon={<i className="fa fa-star" />}>Add to favorite</MenuItem>
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
          loading &&
          <div className="spinner-wrapper">
            <CircularProgress
              size={45}
              thickness={4}
              color="#FF9800"
              style={{left: 10}}
            />
          </div>
        }
      </div>
    )
  }
}

export default TrackItem;