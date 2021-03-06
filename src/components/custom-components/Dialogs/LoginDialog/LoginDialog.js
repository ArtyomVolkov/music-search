import React from 'react';
// MU components
import { Dialog, TextField, FlatButton, RaisedButton, Checkbox, CircularProgress } from 'material-ui';
// Services
import AuthService from '../../../../services/AuthService/AuthService';
import DIALOG_SERVICE from '../../../../services/DialogService/DialogService';
import SocialAuthService from '../../../../services/AuthService/SocialAuthService';
// endpoints
import { authUser } from '../../../../endpoints/aws-api';
// utils
import { setCookie } from '../../../../utils/commons';
// Style
import './LoginDialog.scss';

class LoginDialog extends React.Component {
  constructor (props) {
    super(props);

    this.initDialogData();
  }

  initDialogData () {
    this.state = {
      loading: false,
      errors: {}
    };

    this.dialog = {
      title: 'Login',
      style: {
        width: '450px'
      },
      bodyStyle: {
        padding: 0
      },
      data: {},
      actionButtons: [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.onCloseDialog}
        />,
        <RaisedButton
          label="Login"
          style={{marginLeft: 10}}
          primary={true}
          onTouchTap={this.onLoginUser}
        />
      ]
    };
  }

  onCloseDialog = () => {
    this.props.onClose();
  };

  onLoginUser = () => {
    this.setState({
      loading: true
    });
    authUser(this.dialog.data).then((resp) => {
      this.setState({
        loading: false
      });
      AuthService.authUser({
        user: {
          username: this.dialog.data.username
        },
        tokens: resp.data
      });
      this.props.onClose();
    }).catch((err) => {
      this.setState({
        loading: false,
        errors: {
          username: 'Incorrect username or password',
          password: 'Incorrect username or password'
        }
      });
    });
  };

  onChangeFieldValue (key, e, value) {
    if (!key || !value) {
      return;
    }
    this.dialog.data[ key ] = value;
  }

  onSignIn = () => {
    this.onCloseDialog();
    DIALOG_SERVICE.onOpen('sign-in', {});
  };

  onOpenSocialLogin (name) {
    if (!SocialAuthService[ name ]) {
      return;
    }
    SocialAuthService[ name ].onSignIn()
      .then((resp) => {
        const userData = gapi.auth2.getAuthInstance().currentUser.Ab;

        AuthService.authUser({
          user: {
            fromSocial: name,
            username: userData.w3.ig,
            imageURL: userData.w3.Paa
          },
          tokens: {
            refreshToken: resp.data.refreshToken,
            accessToken: resp.data.accessToken
          }
        });
        setCookie('_SAN', name);
        this.props.onClose();
      });
  }

  render () {
    const { dialog, state } = this;

    return (
      <Dialog
        title={
          <div className="title-section">
            <FlatButton
              primary={true}
              label="Sign UP"
              backgroundColor="white"
              onTouchTap={this.onSignIn}
            />
          </div>
        }
        contentStyle={dialog.style}
        bodyStyle={dialog.bodyStyle}
        actions={dialog.actionButtons}
        open={true}
        modal={false}>
        <div className="login-dialog-content">
          <div className="social-login">
            <i className="fa fa-google" onClick={this.onOpenSocialLogin.bind(this, 'google')}/>
            <i className="fa fa-facebook-square"/>
            <i className="fa fa-vk"/>
            <i className="fa fa-soundcloud"/>
          </div>
          <div className="divider-section">
            <span className="divider" />
            <span className="divider-txt">or</span>
            <span className="divider" />
          </div>
          <div className="login-default">
            <TextField
              floatingLabelText="Email"
              onChange={this.onChangeFieldValue.bind(this, 'username')}
              fullWidth={true}
              errorText={state.errors.username}
              hintText="type email address"/>
            <TextField
              hintText="Password"
              onChange={this.onChangeFieldValue.bind(this, 'password')}
              fullWidth={true}
              errorText={state.errors.password}
              floatingLabelText="Password"
              type="password"
            />
            <br/>
          </div>
          {
            state.loading &&
            <div className="spinner-wrapper">
              <div className="spinner">
                <CircularProgress size={60} thickness={7}/>
              </div>
            </div>
          }
        </div>
      </Dialog>
    );
  }
}

export default LoginDialog;