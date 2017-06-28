import React from 'react';
// Components
import AppBar from '../custom-components/AppBar/AppBar';
// Styles
import './Header.scss';

class Header extends React.Component {
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
