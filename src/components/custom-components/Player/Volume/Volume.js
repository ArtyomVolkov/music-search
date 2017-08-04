import React from 'react';
// Services
import Settings_SRV from '../../../../services/AppSettings/AppSettings';
// M-UI components
import Slider from 'material-ui/Slider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Styles
import './Volume.scss';

const MUI_Theme = getMuiTheme({
  slider: {
    selectionColor: '#6f6f6f',
    rippleColor: '#6f6f6f',
    trackColor: '#dadada',
    trackColorSelected: '#dadada',
    handleSizeActive: 16,
    handleSize: 14,
    trackSize: 4
  }
});

class Volume extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      muted: false
    };
  }

  onToggleMute = () => {
    const { audioEl } = this.props;

    audioEl.muted = !audioEl.muted;
    this.setState({
      muted: !this.state.muted
    });
  };

  onVolumeChange = (e, value) => {
    const { audioEl } = this.props;

    Settings_SRV.setValue('player', 'volume', value);
    audioEl.volume = value;
  };

  render () {
    const { muted } = this.state;
    const defaultVolume = Settings_SRV.getValue('player', 'volume');

    return (
      <div className="volume">
        <div className="volume-icon">
          <i className={`fa ${muted ? 'fa-volume-off' : 'fa-volume-up'}`}
             onClick={this.onToggleMute}
          />
        </div>
        <div className="volume-slider">
          <MuiThemeProvider muiTheme={MUI_Theme}>
            <Slider
              min={0.1}
              max={1}
              step={0.05}
              value={defaultVolume}
              onChange={this.onVolumeChange}
              sliderStyle={{ margin: 0 }}/>
          </MuiThemeProvider>
        </div>
      </div>
    )
  }
}

export default Volume;