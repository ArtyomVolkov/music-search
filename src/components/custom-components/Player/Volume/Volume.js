import React from 'react';
// Services
import Settings_SRV from '../../../../services/AppSettings/AppSettings';
// M-UI components
import Slider from 'material-ui/Slider';
import './Volume.scss';

class Volume extends React.Component {
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

    Settings_SRV.setValue('player', 'volume', value);
    audioEl.volume = value;
  };

  render() {
    const {muted} = this.state;
    const defaultVolume = Settings_SRV.getValue('player', 'volume');

    return (
      <div className="volume">
        <div className="volume-icon">
          <i className={`fa ${muted ? 'fa-volume-off' : 'fa-volume-up'}`}
             onClick={this.onToggleMute}
          />
        </div>
        <div className="volume-slider">
          <Slider
            min={0.1}
            max={1}
            step={0.05}
            value={defaultVolume}
            onChange={this.onVolumeChange}
            sliderStyle={{margin: 0}}/>
        </div>
      </div>
    )
  }
}

export default Volume;