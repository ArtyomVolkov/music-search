import React from 'react';
import { connect } from 'react-redux';
// Components
import NavigationBar from './NavigationBar/NavigationBar';
import UserSection from './UserSection/UserSection';
import DrawerCustom from './Drawer/Drawer';
// Style
import './AppBar.scss';

@connect(
  state => ({
    auth: state.auth
  }),
  dispatch => ({
  })
)
class AppBar extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      openDrawer: false
    };
  }

  onToggleDrawer = (e) => {
    if (!e) {
      this.refs.settings.classList.remove('active');
      this.setState({
        openDrawer: !this.state.openDrawer
      });
      return;
    }

    this.refs.settings.classList.add('active');
    setTimeout(() => {
      this.setState({
        openDrawer: !this.state.openDrawer
      });
    }, 400);
  };

  render () {
    const { title, auth } = this.props;
    const { openDrawer } = this.state;

    return (
      <div className="app-bar">
        <div className="logo-section">
          {
            auth.authorization && <i className="fa fa-cog" ref={'settings'} onClick={this.onToggleDrawer}/>
          }
          <span className="app-title">{title}</span>
        </div>
        <div className="nav-section">
          <NavigationBar authorized={auth.authorization}/>
        </div>
        <div className="user-section">
          <UserSection />
        </div>
        {auth.authorization && <DrawerCustom open={openDrawer} onToggle={this.onToggleDrawer}/>}
      </div>
    )
  }
}

export default AppBar;