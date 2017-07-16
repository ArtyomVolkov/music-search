import React from 'react';
import { connect } from 'react-redux';
// M-UI components
import { IconMenu, MenuItem, IconButton, CircularProgress, Divider } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { ListItem } from 'material-ui/List';
// Services
import TRACK_ACTION_SERVICE from '../../../services/TrackActionService/TrackActionService';
// Style
import './TrackItem.scss';

@connect(
  state => ({
    player: state.player
  }),
  dispatch => ({})
)
class TrackItem extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      openActions: false
    };
  }

  onPlaySong (index) {
    const { track, onAction } = this.props;

    if (onAction) {
      onAction('on-play', track, index);
    }
  }

  onToggleActions = () => {
    this.setState({
      openActions: !this.state.openActions
    });
  };

  onDownloadTrack = () => {
    const { track } = this.props;

    TRACK_ACTION_SERVICE.onDownload(track);
    this.onToggleActions();
  };

  toPlayList = () => {
    const { track } = this.props;

    TRACK_ACTION_SERVICE.toPlayList(track);
    this.onToggleActions();
  };

  toFavorite = () => {
    const { track } = this.props;

    TRACK_ACTION_SERVICE.toFavorite(track);
    this.onToggleActions();
  };

  onSelectTrackAction (actionName) {
    const { track, onAction } = this.props;

    switch (actionName) {
      case 'to-playlist':
        this.toPlayList();
        break;

      case 'to-favorite':
        this.toFavorite();
        break;

      case 'on-download':
        this.onDownloadTrack();
        break;

      default:
        if (onAction) {
          onAction(actionName, track);
        }
        break;

    }
    this.onToggleActions();
  }

  render () {
    const { player, track, indexItem, showActions, actionItems } = this.props;
    const active = player.songData && player.songData.mbid === track.mbid ? 'active' : '';
    const error = track.mbid === player.trackIdError ? 'error' : '';

    return (
      <div className={`track-item ${active} ${error}`}>
        <ListItem
          disabled={false}
          onTouchTap={this.onPlaySong.bind(this, indexItem)}
					secondaryText={track.albumName}
          primaryText={
            <div className="song-info">
							<span className="singer">{track.artistName}</span>
							<span className="divider">-</span>
							<span className="song-name">{track.name}</span>
            </div>
          }
          rightIconButton={
            showActions &&
            <IconMenu
              onRequestChange={this.onToggleActions}
              open={this.state.openActions}
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
                  onTouchTap={this.onSelectTrackAction.bind(this, 'to-playlist')}
                >Add to playlist</MenuItem>
                <MenuItem
                  leftIcon={<i className="fa fa-star"/>}
                  onTouchTap={this.onSelectTrackAction.bind(this, 'to-favorite')}
                >Add to favorite</MenuItem>
                <Divider/>
                <MenuItem
                  leftIcon={<i className="fa fa-download"/>}
                  disabled={!!error || !active}
                  onTouchTap={this.onSelectTrackAction.bind(this, 'on-download')}
                >Download</MenuItem>
                {
                  actionItems && actionItems.map((item, index) => {
                    return (
                      <div key={index}>
                        {item.divider && <Divider/>}
                        <MenuItem
                          leftIcon={item.iconClass && <i className={item.iconClass}/>}
                          onTouchTap={this.onSelectTrackAction.bind(this, item.action)}
                        >{item.label}</MenuItem>
                      </div>
                    );
                  })
                }
              </div>
            </IconMenu>
          }
          leftAvatar={<i className={`fa ${player.play && active ? 'fa-pause-circle' : 'fa-play-circle'}`}/>}
        />
        {
          player.streamLoading && player.streamId === track.mbid &&
          <div className="spinner-wrapper">
            <CircularProgress size={45} thickness={4} color="#FF9800" style={{ left: 10 }}
            />
          </div>
        }
      </div>
    )
  }
}

export default TrackItem;