import React from 'react';
// Components
import NavigationBar from '../NavigationBar/NavigationBar';
import UserSection from '../UserSection/UserSection';
// Style
import './AppBar.scss';

class AppBar extends React.Component {
  render() {
    const {title} = this.props;

    return (
      <div className="app-bar">
        <div className="logo-section">
          <i className="fa fa-music" aria-hidden="true" />
          <span className="app-title">{title}</span>
        </div>
        <div className="nav-section">
          <NavigationBar />
        </div>
        <div className="user-section">
          <UserSection />
        </div>
      </div>
    )
  }
}

export default AppBar;