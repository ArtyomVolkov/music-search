import React from 'react';
// M-UI components
import Slider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// Services
import Settings_SRV from '../../../../services/AppSettings/AppSettings';
// Styles
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './TrackBar.scss';
const MUI_Theme = getMuiTheme({
  slider: {
    selectionColor: '#ff9800',
    rippleColor: '#ff9800',
    trackColor: 'transparent',
    trackColorSelected: 'transparent',
    handleSizeActive: 16,
    handleSize: 14,
    trackSize: 4
  }
});

class TrackBar extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      currentTime: 0
    };

    // instead of ontimeupdate (DOM audio handler)
    this.interval = setInterval(this.updateTrackBar, Settings_SRV.getValue('player', 'updateTrackBar'));
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.isPlaying) {
      clearInterval(this.interval);
      this.interval = null;
      return;
    }

    if (!this.interval) {
      this.interval = setInterval(
        this.updateTrackBar,
        Settings_SRV.getValue('player', 'updateTrackBar')
      );
    }
  }

  updateTrackBar = () => {
    this.setState({
      currentTime: this.props.audioEl.currentTime
    });
  };

  onChangeTimeBar = (e, value) => {
    this.props.onChangeTimeBar(value);

    this.setState({
      currentTime: value
    });
  };

  getBufferedAudioValue (audioEl) {
    let value = '0%';

    if (!audioEl.buffered.length) {
      return value;
    }

    if (audioEl.duration > 0) {
      for (let i = 0; i < audioEl.buffered.length; i++) {
        if (audioEl.buffered.start(audioEl.buffered.length - 1 - i) < audioEl.currentTime) {
          value = (audioEl.buffered.end(audioEl.buffered.length - 1 - i) / audioEl.duration);
          break;
        }
      }
    }
    return value * 100 + '%';
  }

  render () {
    const { audioEl } = this.props;
    const { currentTime } = this.state;

    return (
      <div className="track-bar">
        <div className="progress-section">
          <div className="buffered" style={{ width: this.getBufferedAudioValue(audioEl)}}></div>
        </div>
        <MuiThemeProvider muiTheme={MUI_Theme}>
          <Slider
            className="time-bar"
            sliderStyle={{ margin: 0 }}
            min={0}
            max={audioEl.duration}
            step={0.1}
            value={currentTime}
            onChange={this.onChangeTimeBar}
          />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default TrackBar;