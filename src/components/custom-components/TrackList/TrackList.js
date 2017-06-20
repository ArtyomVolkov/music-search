import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// MU components
import { Subheader, IconMenu, MenuItem, IconButton } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { List, ListItem } from 'material-ui/List';
// actions
import * as artistActions from '../../../actions/artist';
import * as playerActions from '../../../actions/player';
// Styles
import './TrackList.scss';

@connect(
  state => ({
    player: state.player
  }),
  dispatch => ({
    artistActions: bindActionCreators(artistActions, dispatch),
    playerActions: bindActionCreators(playerActions, dispatch),
  })
)
class TrackList extends React.Component {
  constructor (props) {
    super(props);

    this.style = {
      trackList: {
        list: {
          padding: 0
        },
        subHeader: {
          fontSize: 16,
          color: "#9d9898",
          fontWeight: 600,
          background: '#efefef'
        }
      }
    };
  }

  onPlaySong (track, index) {
    const { artistId, artistActions, player } = this.props;

    if (index === player.soundIndex) {
      return;
    }

    if (track.mbid) {
      artistActions.getArtistSongData(artistId, track.mbid, index);
    }
  }

  onTogglePlay =()=> {
    this.props.playerActions.onTogglePlay();
  };

  render () {
    const { tracks, player } = this.props;
    const { trackList } = this.style;

    return (
      <div className="tracks">
        <List style={trackList.list}>
          <Subheader style={trackList.subHeader}>Artist Tracks</Subheader>
          {
            tracks && tracks.map((track, index) => {
              return (
                <div key={index}
                     className={`track-item ${player.soundIndex === index ? 'active' : ''} ${!track.mbid ? 'disabled' : ''}`}>
                  <ListItem
                    disabled={!track.mbid}
                    onTouchTap={this.onPlaySong.bind(this, track, index)}
                    primaryText={track.name}
                    rightIconButton={track.mbid &&
                    <IconMenu iconButtonElement={
                      <IconButton
                        touch={true}
                        tooltip="more"
                        tooltipPosition="bottom-left">
                        <MoreVertIcon color={'#607D8B'}/>
                      </IconButton>
                    }>
                      <MenuItem>Add to playlist</MenuItem>
                      <MenuItem>Add to favorite</MenuItem>
                    </IconMenu>
                    }
                    leftAvatar={
                      <i className={`fa ${player.soundIndex === index && player.play
                        ? 'fa-pause-circle' : 'fa-play-circle'}`}
                      onClick={this.onTogglePlay}/>
                    }
                  />
                </div>
              );
            })
          }
        </List>
      </div>
    )
  }
}

export default TrackList;