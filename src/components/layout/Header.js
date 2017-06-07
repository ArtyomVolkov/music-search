import React, { Component } from 'react';
import { IconButton } from 'material-ui';
// Components
import AppBar from '../custom-components/AppBar/AppBar';
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
  }

  render () {
    return (
      <AppBar title="Music Search"/>
    )
  }
}

export default Header;
