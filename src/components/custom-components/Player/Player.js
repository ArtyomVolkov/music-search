import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import * as playerActions from '../../../actions/player';
import * as playListActions from '../../../actions/playlists';
// components
import PlayerActions from './PlayerActions/PlayerActions';
import PlayListDialog from './PlayListDialog/PlayListDialog';
import TrackBar from './TrackBar/TrackBar';
import Timer from './Timer/Timer';
import Volume from './Volume/Volume';
// Services
import MSG_SRV from '../../../services/MessageService/MessageService';
import Settings_SRV from '../../../services/AppSettings/AppSettings';
// Settings & Utils
import { SONG_IMG_URL } from '../../../settings';

// Style
import './Player.scss';

@connect(
  state => ({
    player: state.player
  }),
  dispatch => ({
    playerActions: bindActionCreators(playerActions, dispatch),
    playListActions: bindActionCreators(playListActions, dispatch)
  })
)
class Player extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      play: true,
      muted: false,
			duration: 0,
      timeValue: 0
    };
    this.audioEl = {
      el: document.createElement('audio'),
      duration: 0,
      step: 0
    };
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.player.streamLoading) {
      this.setSongData(nextProps.player);
    }
  }

  setSongData (newSongData) {
    const { audioEl } = this;
    const { player } = this.props;

    if (!audioEl.el || !newSongData.songData) {
      return;
    }

    if (player.songData && player.songData.mbid === newSongData.songData.mbid) {
      this.onPlayPause(audioEl.el);
      return;
    }
    this.setAudioData(newSongData.songData);
  }

  onPlayPause (audio) {
    !this.props.player.play ? audio.play() : audio.pause();
    this.setState({
      timeValue: audio.currentTime
    });
  }

  setAudioData (audio) {
    const { audioEl } = this;

    audioEl.el.src = audio.stream_url;
    audioEl.duration = audio.duration;
    audioEl.el.volume = Settings_SRV.getValue('player', 'volume');
    this.setAudioHandlers();
  }

  setAudioHandlers () {
    const { audioEl } = this;
    const { playerActions } = this.props;

    if (!audioEl.el.onended) {
      audioEl.el.onended = this.onEndTrack;
    }

    if (!audioEl.el.onerror) {
      audioEl.el.onerror = () => {
        MSG_SRV.pushMessage({
          type: 'error',
          msg: 'Error in loading of song data stream'
        });
        playerActions.onErrorTrackID(this.props.player.songData.mbid);
      }
    }

    if (!audioEl.el.oncanplaythrough) {
      audioEl.el.oncanplaythrough = () => {
        if (this.props.player.play) {
					audioEl.el.play();
          this.setState({
            duration: audioEl.el.duration * 1000
          });
        }
      };
    }
  }

  onEndTrack = () => {
    if (Settings_SRV.getValue('player', 'playNext')) {
      this.nextSong(this.props.player.soundIndex + 1);
    }
  };

  nextSong (index) {
    const { playerActions, player } = this.props;

    if (index < 0) {
      return;
    }

    playerActions.playNext(index, !!player.playList ? 'playlist-track' : 'track');
  }

  onChangePlayerAction = (name) => {
    const { player, playerActions } = this.props;

    switch (name) {
      case 'play':
        playerActions.onTogglePlay();
        return;

      case 'next':
        this.nextSong(player.soundIndex + 1);
        return;

      case 'previous':
        this.nextSong(player.soundIndex - 1);
        break;
    }
  };

  onChangeTimeBar = (value) => {
    if (!value) {
      return;
    }
    this.audioEl.el.currentTime = value;
    this.setState({
      timeValue: value
    });
  };

  onTogglePlayList = (e) => {
    e.currentTarget.classList.contains('active')
      ? e.currentTarget.classList.remove('active')
      : e.currentTarget.classList.add('active');

    this.props.playListActions.onTogglePlayList();
  };

  render () {
    const { player } = this.props;
    const { timeValue, duration } = this.state;
    const { audioEl } = this;

    if (!player.songData) {
      return false;
    }

    return (
      <div className="player-container">
        <TrackBar
          audioEl={audioEl.el}
          isPlaying={player.play}
          onChangeTimeBar={this.onChangeTimeBar}
        />
        <div className="music-panel">
          <div className="img-container">
            <img src={player.songData.img || SONG_IMG_URL}/>
          </div>
          <PlayerActions
            isPlaying={player.play}
            onChange={this.onChangePlayerAction}
          />
          {player.playList &&
          <div className="playlist-icons">
            <i
              className="fa fa-list-alt"
              onClick={this.onTogglePlayList}/>
          </div>}
          <Timer
            value={timeValue * 1000}
            autoUpdate={true}
            audio={audioEl.el}
            isPlaying={player.play}
          />
          <div className="track-section">
            <div className="song-details">
              <span className="author" title={player.songData.artistName}>{player.songData.artistName}</span>
              <span className="divider"> - </span>
              <span className="song-name" title={player.songData.name}>{player.songData.name}</span>
            </div>
          </div>
          <Timer value={duration}/>
          <Volume audioEl={audioEl.el} />
          {player.playList && <PlayListDialog />}
        </div>
      </div>
    );
  }
}

export default Player;
