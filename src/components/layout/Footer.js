import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CLIENT_ID} from '../../settings';
import Slider from 'material-ui/Slider';

import {durationToMinutes} from '../../utils/parsers';

// Style
import './Footer.scss';

@connect(
  state => ({
    player: state.player
  }),
  dispatch => ({})
)
class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      play: true,
      muted: false,
      currentTime: 0
    };

    this.audioEl = {
      el: document.createElement('audio'),
      duration: 0,
      currentTime: 0,
      step: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setSongData(nextProps.player.songData);
  }

  setSongData(songData) {
    const {audioEl, state} = this;

    if (!audioEl.el) {
      return;
    }

    audioEl.el.src = songData.stream_url + `?client_id=${CLIENT_ID}`;
    audioEl.el.volume = 0.7;
    audioEl.duration = songData.duration;
    audioEl.step = songData.duration / 1000; // 1% from duration
    audioEl.el.play().then(() => {
      console.log('finish load metadata');
    });

    if (!audioEl.el.ontimeupdate) {
      audioEl.el.ontimeupdate = this.onUpdateTimeBar;
    }

    if (!state.play) {
      this.setState({
        play: true
      });
    }
  }

  onUpdateTimeBar = (e) => {
    this.setState({
      currentTime: e.target.currentTime * 1000 // ms
    });
  };

  onChangeTimeBar = (e, value) => {
    this.audioEl.el.currentTime = value / 1000;
  };

  onTogglePlay = () => {
    const {state, audioEl} = this;

    state.play ? audioEl.el.pause() : audioEl.el.play();
    this.setState({
      play: !state.play
    });
  };

  onVolumeChange = (e, value) => {
    const {el} = this.audioEl;
    el.volume = value;
  };

  onToggleMute = () => {
    const {el} = this.audioEl;

    el.muted = !el.muted;
    this.setState({
      muted: !this.state.muted
    });
  };

  render() {
    const {player} = this.props;
    const {play, muted, currentTime} = this.state;
    const {audioEl} = this;

    if (!player.songData) {
      return false;
    }

    return (
      <div className="music-panel">
        <div className="img-container">
          <img src={player.songData.user.avatar_url}/>
        </div>
        <div className="player-actions">
          <i className="fa fa-backward" aria-hidden="true"/>
          <i className={`fa ${play ? 'fa-pause' : 'fa-play'}`} aria-hidden="true" onClick={this.onTogglePlay}/>
          <i className="fa fa-forward" aria-hidden="true"/>
        </div>
        <div className="timer-current">
          <span>{durationToMinutes(currentTime)}</span>
        </div>
        <div className="track-bar">
          <Slider
            sliderStyle={{margin: 0}}
            min={0}
            max={audioEl.duration}
            step={audioEl.step}
            value={currentTime}
            onChange={this.onChangeTimeBar}
          />
        </div>
        <div className="timer-duration">
          <span>{durationToMinutes(audioEl.duration)}</span>
        </div>
        <div className="volume">
          <div className="volume-icon">
            <i className={`fa ${muted ? 'fa-volume-off' : 'fa-volume-up'}`} aria-hidden="true"
               onClick={this.onToggleMute}
            />
          </div>
          <div className="volume-slider">
            <Slider min={0.1} max={1} step={0.05} defaultValue={0.7} onChange={this.onVolumeChange}
                    sliderStyle={{margin: 0}}/>
          </div>
        </div>
      </div>
    )
  }
}
export default Footer;
