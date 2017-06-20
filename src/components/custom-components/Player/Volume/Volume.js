import React, {Component} from 'react';

import Slider from 'material-ui/Slider';
import './Volume.scss';

class Volume extends Component {
  constructor(props) {
    super(props);

    this.state = {
      muted: false
    };
  }

  onToggleMute = () => {
    const {audioEl} = this.props;

    audioEl.muted = !audioEl.muted;
    this.setState({
      muted: !this.state.muted
    });
  };

  onVolumeChange = (e, value) => {
    const {audioEl} = this.props;

    audioEl.volume = value;
  };

  render() {
    const {muted} = this.state;

    return (
      <div className="volume">
        <div className="volume-icon">
          <i className={`fa ${muted ? 'fa-volume-off' : 'fa-volume-up'}`} aria-hidden="true"
             onClick={this.onToggleMute}
          />
        </div>
        <div className="volume-slider">
          <Slider
            min={0.1}
            max={1}
            step={0.05}
            defaultValue={0.7}
            onChange={this.onVolumeChange}
            sliderStyle={{margin: 0}}/>
        </div>
      </div>
    )
  }
}

export default Volume;