import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CLIENT_ID } from '../../settings';
import Slider from 'material-ui/Slider';

// Style
import './Footer.scss';

@connect(
  state => ({
    player: state.player
  }),
  dispatch => ({})
)
class Footer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      play: true,
      muted: false
    };

    this.audioEl = document.createElement('audio');
    this.audioEl.volume = 0.7;
  }

  componentWillReceiveProps (nextProps) {
    this.audioEl.src = nextProps.player.songData.stream_url + `?client_id=${CLIENT_ID}`;

    this.audioEl.play().then((data) => {
      console.log('play');
    });
  }

  onTogglePlay = () => {
    const { play } = this.state;

    play ? this.audioEl.pause() : this.audioEl.play();
    this.setState({
      play: !play
    });
  };

  onVolumeChange = (e, value) => {
    this.audioEl.volume = value;
  };

  onToggleMute = () => {
    this.audioEl.muted = !this.audioEl.muted;

    this.setState({
      muted: !this.state.muted
    });
  };

  render () {
    const { player } = this.props;
    const { play, muted } = this.state;

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
        <div className="timer">00:00/02:35</div>
        <div className="track-bar">
          <Slider sliderStyle={{ margin: 0 }} min={0} max={1000} step={1}/>
        </div>
        <div className="volume">
          <div className="volume-icon">
            <i className={`fa ${muted ? 'fa-volume-off' : 'fa-volume-up'}`} aria-hidden="true"
              onClick={this.onToggleMute}
            />
          </div>
          <div className="volume-slider">
            <Slider min={0.1} max={1} step={0.1} defaultValue={0.7} onChange={this.onVolumeChange}
                    sliderStyle={{ margin: 0 }}/>
          </div>
        </div>
      </div>
    )
  }
}
export default Footer;
