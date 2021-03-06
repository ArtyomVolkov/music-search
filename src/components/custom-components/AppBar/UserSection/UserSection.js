import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import * as authActions from '../../../../actions/auth';
// Components
import UserDetails from './UserDetails/UserDetails';
//Services
import DIALOG_SERVICE from '../../../../services/DialogService/DialogService';
import RouterService from '../../../../services/RouterService/RouterService';
import SocialAuthService from '../../../../services/AuthService/SocialAuthService';
// Styles
import './UserSection.scss';

@connect(
  state => ({
    auth: state.auth
  }),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
  })
)
class UserSection extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      dialogData: null,
      isOpenDialog: false
    };
  }

  onAction = (name) => {
    switch (name) {
      case 'open_profile':
        this.openProfileDialog();
        break;

      case 'open_login':
        this.openLoginDialog();
        break;

      case 'sign_out':
        this.onSignOut();
        return;

      default: break;
    }
  };

  openProfileDialog () {
    DIALOG_SERVICE.onOpen('profile', this.props.auth.user);
  }

  openLoginDialog () {
    DIALOG_SERVICE.onOpen('login');
  }

  onSignOut =()=> {
    const {authActions, auth} = this.props;

    RouterService.navigate('/search');
    if (auth.user.fromSocial) {
      SocialAuthService[auth.user.fromSocial].onSignOut();
      return;
    }
    authActions.signOut();
  };

  render () {
    const { auth } = this.props;

    return (
      <div className="user-data">
        {
          !auth.authorization &&
          <div className="default-user" onClick={this.onAction.bind(this, 'open_login')}>
            <i className="fa fa-user-circle-o" />
            <span>Login</span>
          </div>
        }
        {auth.authorization && <UserDetails user={auth.user} onAction={this.onAction}/>}
      </div>
    )
  }
}

export default UserSection;
