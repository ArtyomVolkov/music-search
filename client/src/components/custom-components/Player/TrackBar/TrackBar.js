import React, {Component} from 'react';

// components
import Slider from 'material-ui/Slider';
// Styles
import './TrackBar.scss';

class TrackBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0
    };

    if (!props.audioEl.ontimeupdate) {
      props.audioEl.ontimeupdate = this.onUpdateTimeBar;
    }
  }

  onUpdateTimeBar = (e) => {
    this.setState({
      currentTime: e.target.currentTime
    });
  };

  onChangeTimeBar = (e, value) => {
    this.props.onChangeTimeBar(value);

    this.setState({
      currentTime: value
    });
  };

  render() {
    const {audioEl} = this.props;
    const {currentTime} = this.state;

    return (
      <div className="track-bar">
        <Slider
          className="time-bar"
          sliderStyle={{margin: 0}}
          min={0}
          max={audioEl.duration}
          step={0.5}
          value={currentTime}
          onChange={this.onChangeTimeBar}
        />
      </div>
    )
  }
}

export default TrackBar;