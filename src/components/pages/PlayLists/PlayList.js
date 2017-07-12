import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// M-UI components
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Avatar, RaisedButton} from 'material-ui';
// Components
import TrackList from '../../custom-components/TrackList/TrackList';
// actions
import * as playlistActions from '../../../actions/playlists';
import * as playerActions from '../../../actions/player';
import * as system from '../../../actions/system';
// services
import RouterService from '../../../services/RouterService/RouterService';
import TRACK_ACTION_SERVICE from '../../../services/TrackActionService/TrackActionService';

@connect(
  state => ({
    playLists: state.playLists,
    player: state.player
  }),
  dispatch => ({
    playListActions: bindActionCreators(playlistActions, dispatch),
    playerActions: bindActionCreators(playerActions, dispatch),
    systemActions: bindActionCreators(system, dispatch)
  })
)
class PlayList extends React.Component {
  constructor (props) {
    super(props);

    this.styles = {
      card: {
        paddingBottom: 5
      },
      cardHeader: {
        title: {
          fontSize: 24,
          fontWeight: 600,
          color: 'grey',
          marginBottom: 10
        },
        subtitle: {
          fontSize: 18,
          marginBottom: 5
        },
        image: {
          borderRadius: 0
        }
      },
      cardText: {
        body: {
          padding: '0 5px'
        }
      }
    };
  }

  componentDidMount () {
    if (!this.props.playLists.data) {
      this.props.playListActions.getPlayLists();
    }
  }

  onAction = (actionName, track, index) => {
    if (actionName === 'on-play') {
      this.onPlaySong(track, index);
      return;
    }

    if (actionName === 'on-edit') {
      this.onEditPlayListTrack(track);
    }
  };

  onPlaySong (track, index) {
    const { playListActions, playerActions, playLists, player, params, systemActions } = this.props;
    const playListIndex = +params.id;
    const tracks = playLists.data[ params.id ].tracks;

    if (playLists.activeIndex !== playListIndex) {
      playListActions.setActivePlaylist(playListIndex);
      playerActions.setPlayListData(tracks);
      playerActions.selectSong(track, index);
      return;
    }

    if (track.id === player.trackIdError) {
      systemActions.onPushMessage({
        type: 'error',
        msg: 'Error in audio stream'
      });
      return;
    }

    if (player.songData && player.songData.id === track.id) {
      playerActions.onTogglePlay();
      return;
    }
    playerActions.selectSong(track, index);
  }

  goToPlayLists =()=> {
    RouterService.goBack();
  };

  onEditPlayListTrack(track) {
    TRACK_ACTION_SERVICE.onEdit(track);
  }

  render () {
    const { params, playLists } = this.props;
    const { cardHeader, cardText, card } = this.styles;
    const playList = playLists.data && playLists.data[ params.id ];

    return (
      <div className="playlist-page">
        {
          !playList && <p>No Available PlayLists</p>
        }
        {
          playList &&
          <div className="playlist">
            <Card containerStyle={card}>
              <CardHeader
                title={playList.name}
                subtitle={`${playList.tracks.length} track(s)`}
                avatar={<Avatar size={70} style={cardHeader.image} src={playList.image}/>}
                titleStyle={cardHeader.title}
                subtitleStyle={cardHeader.subtitle}
              />
              <hr />
              <CardText style={cardText.body}>
                <RaisedButton
                  label={'Back to playlists'}
                  icon={<i className="fa fa-arrow-circle-left" />}
                  onTouchTap={this.goToPlayLists}
                />
                <TrackList
                  tracks={playList.tracks}
                  type={'playlist-track'}
                  onAction={this.onAction}
                  showActions={true}
                  actionItems={[
                    {
                      action: 'on-edit',
                      divider: true,
                      iconClass: 'fa fa-pencil-square-o',
                      label: 'Edit'
                    }
                  ]}
                />
              </CardText>
            </Card>
          </div>
        }
      </div>
    );
  }
}

export default PlayList;