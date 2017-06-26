import React from 'react';
// M-UI components
import Slider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// Settings
import { AUTO_UPDATE_TRACK_BAR } from '../../../../settings';
// Styles
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './TrackBar.scss';
const MUI_Theme = getMuiTheme({
  slider: {
    selectionColor: '#7dca38',
    rippleColor: '#68ca4c',
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
    this.interval = setInterval(this.updateTrackBar, AUTO_UPDATE_TRACK_BAR);
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.isPlaying) {
      clearInterval(this.interval);
      this.interval = null;
      return;
    }

    if (!this.interval) {
      this.interval = setInterval(this.updateTrackBar, AUTO_UPDATE_TRACK_BAR);
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

  render () {
    const { audioEl } = this.props;
    const { currentTime } = this.state;

    return (
      <div className="track-bar">
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