import React, { Component } from 'react';
import { AppBar, IconButton } from 'material-ui';
// Material Icons
import AvLibraryMusic from 'material-ui/svg-icons/av/library-music';
import AvPlaylistPlay from 'material-ui/svg-icons/av/playlist-play';
import ActionSearch from 'material-ui/svg-icons/action/search';
import SocialPerson from 'material-ui/svg-icons/social/person';

// Styles
import './Header.scss';

class Header extends Component {
  constructor (props) {
    super(props);

    this.matUIStyles = {
      appBar: {
        background: '#272727'
      },
      searchIcon: {
        color: 'white'
      }
    };
  }

  render () {
    const { appBar, searchIcon } = this.matUIStyles;

    return (
      <AppBar
        title="Music Search"
        iconElementLeft={
          <IconButton>
            <AvLibraryMusic />
          </IconButton>
        }
        iconElementRight={
          <div className="app-navigation">
            <IconButton iconStyle={searchIcon}><ActionSearch /></IconButton>
            <IconButton iconStyle={searchIcon}><AvPlaylistPlay /></IconButton>
            <IconButton iconStyle={searchIcon}><SocialPerson /></IconButton>
          </div>
        }
        style={appBar}
      />
    )
  }
}

export default Header;
