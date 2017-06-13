import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import * as authActions from './../../../actions/auth';
// Components
import UserDetails from './UserDetails/UserDetails';
//Services
import DIALOG_SERVICE from '../../../services/DialogService/DialogService';
// Styles
import './UserSection.scss';

@connect(
  state => ({
    auth: state.auth,
  }),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
  })
)
class UserSection extends Component {
  constructor (props) {
    super(props);

    this.state = {
      dialogData: null,
      isOpenDialog: false
    };

    props.authActions.getUser();
  }


  onAction = (name) => {
    switch (name) {
      case 'open_profile':
        this.openProfileDialog();
        break;

      case 'open_login':
        this.openLoginDialog();
        break;

      default: break;
    }
  };

  openProfileDialog () {
    DIALOG_SERVICE.onOpen('profile', this.props.auth.user);
  }

  openLoginDialog () {
    DIALOG_SERVICE.onOpen('login');
  }

  render () {
    const { auth } = this.props;

    return (
      <div className="user-data">
        {
          !auth.authorization &&
          <div className="default-user">
            <i className="fa fa-user-circle-o" aria-hidden="true"/>
            <span onClick={this.onAction.bind(this, 'open_login')}>Login</span>
          </div>
        }
        {auth.authorization && <UserDetails user={auth.user} onAction={this.onAction}/>}
      </div>
    )
  }
}

export default UserSection;
