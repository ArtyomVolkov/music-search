import React from 'react';
// Material UI components
import { Drawer, Divider, Toggle, Slider } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// services
import Settings_SRV from '../../../../services/AppSettings/AppSettings';
// settings
import { LOGO_APP_URL } from '../../../../settings';
// styles
import './Drawer.scss';

const MUI_Theme = getMuiTheme({
  slider: {
    selectionColor: '#8d4dff',
    rippleColor: '#8d4dff'
  },
  toggle: {
    labelColor: '#afafaf',
    trackOnColor: '#8d4dff',
    thumbOnColor: '#62409d'
  }
});

class DrawerCustom extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      volume: Settings_SRV.getValue('player', 'volume'),
      updateTrackBar: Settings_SRV.getValue('player', 'updateTrackBar'),
      searchLimit: Settings_SRV.getValue('search', 'limit')
    };

    this.styles = {
      drawer: {
        content: {
          background: '#222222',
          color: 'white',
          borderRight: '2px solid #686868'
        }
      },
      divider: {
        background: '#686868'
      },
      slider: {
        width: 70,
        margin: 0
      }
    };
  }

  onChangeSettings (name, key, e, value) {
    switch (key) {
      case 'playNext':
        Settings_SRV.setValue(name, key, value);
        break;

      case 'volume':
        Settings_SRV.setValue(name, key, value);
        this.setState({
          volume: value
        });
        break;

      case 'updateTrackBar':
        Settings_SRV.setValue(name, key, value);
        this.setState({
          updateTrackBar: value
        });
        break;

      case 'limit':
        Settings_SRV.setValue(name, key, value);
        this.setState({
          searchLimit: value
        });
        break;

      default:
        Settings_SRV.setValue(name, key, value);
        break;
    }
  }

  render () {
    const { open, onToggle } = this.props;
    const { drawer, divider, slider } = this.styles;
    const {volume, updateTrackBar, searchLimit} = this.state;

    return (
      <MuiThemeProvider muiTheme={MUI_Theme}>
        <Drawer
          docked={false}
          width={310}
          open={open}
          containerStyle={drawer.content}
          onRequestChange={onToggle}
        >
          <div className="drawer-content">
            <div className="app-logo">
              <img src={LOGO_APP_URL} alt="app-logo"/>
              <span className="title">Accord</span>
            </div>
            <Divider style={divider}/>
            <div className="topic">
              <i className="fa fa-sliders"/>
              <span>Player Settings</span>
            </div>
            <Divider style={divider}/>
            <div className="option-item">
              <i className="fa fa-refresh" />
              <Toggle
                label={'Play Next'}
                defaultToggled={true}
                onToggle={this.onChangeSettings.bind(this, 'player', 'playNext')}
              />
            </div>
            <div className="option-item">
              <i className="fa fa-clock-o" />
              <span className="fixed-width">
                TrackBar Refresh {`${updateTrackBar < 1000 ? updateTrackBar + 'ms' : '1 sec'} `}
              </span>
              <Slider sliderStyle={slider} min={100} max={1000} step={100}
                value={updateTrackBar}
                onChange={this.onChangeSettings.bind(this, 'player', 'updateTrackBar')}
              />
            </div>
            <div className="option-item">
              <i className="fa fa-volume-up" />
              <span className="fixed-width">Default Volume {`${Math.floor(volume*100)}%`}</span>
              <Slider sliderStyle={slider} min={0.1} max={1} step={0.05}
                value={volume}
                onChange={this.onChangeSettings.bind(this, 'player', 'volume')}
              />
            </div>
            <Divider style={divider}/>
            <div className="topic">
              <i className="fa fa-wrench"/>
              <span>Account settings</span>
            </div>
            <Divider style={divider}/>
            <div className="option-item">
              <i className="fa fa-users" />
              <Toggle
                label={'Show Friends'}
                defaultToggled={false}
                onToggle={this.onChangeSettings.bind(this, 'account', 'showFriends')}
              />
            </div>
            <div className="option-item">
              <i className="fa fa-envelope" />
              <Toggle
                label={'Show Messages'}
                defaultToggled={false}
                onToggle={this.onChangeSettings.bind(this, 'account', 'showMessages')}
              />
            </div>
            <div className="option-item">
              <i className="fa fa-line-chart" />
              <Toggle
                label={'Use Statistic'}
                defaultToggled={true}
                onToggle={this.onChangeSettings.bind(this, 'account', 'showStatistic')}
              />
            </div>
            <Divider style={divider}/>
            <div className="topic">
              <i className="fa fa-search"/>
              <span>Search settings</span>
            </div>
            <Divider style={divider}/>
            <div className="option-item">
              <i className="fa fa-server" />
              <span className="fixed-width">Tacks Limit {searchLimit}</span>
              <Slider sliderStyle={slider} min={20} max={80} step={20}
                value={searchLimit}
                onChange={this.onChangeSettings.bind(this, 'search', 'limit')}
              />
            </div>
          </div>
        </Drawer>
      </MuiThemeProvider>
    )
  }
}

export default DrawerCustom;