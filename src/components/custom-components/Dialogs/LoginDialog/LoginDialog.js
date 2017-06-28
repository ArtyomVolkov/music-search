import React from 'react';
// MU components
import { Dialog, TextField, FlatButton, RaisedButton, Checkbox, Toggle } from 'material-ui';
// Services
import AuthService from '../../../../services/AuthService/AuthService';
//Services
import DIALOG_SERVICE from '../../../../services/DialogService/DialogService';
// endpoints
import {getSocialLogin} from '../../../../endpoints/aws-api';
// Style
import './LoginDialog.scss';

class LoginDialog extends React.Component {
  constructor (props) {
    super(props);

    this.initDialogData();
  }

  initDialogData () {
    this.state = {
      social: false
    };

    this.dialog = {
      title: 'Login',
      style: {
        width: '450px'
      },
      data: {},
      actionButtons: [
         <FlatButton
          label="Cancel"
          primary={false}
          onTouchTap={this.onCloseDialog}
        />,
        <FlatButton
          label="Login"
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
    AuthService.authUser(this.dialog.data);
    this.props.onClose();
  };

  onChangeFieldValue (key, e, value) {
    if (!key || !value) {
      return;
    }
    this.dialog.data[ key ] = value;
  }

  onChangeLoginType = () => {
    this.setState({
      social: !this.state.social
    });
  };

  onSignIn =()=> {
    this.onCloseDialog();
    DIALOG_SERVICE.onOpen('sign-in', {});
  };

  onOpenSocialLogin (name) {
    getSocialLogin(name).then((resp) => {
      window.open(resp.data, name, 'width=500,height=400');
    });
  }

  render () {
    const { dialog, state } = this;

    return (
      <Dialog
        title={
          <div>
            <Toggle
              onToggle={this.onChangeLoginType}
              label={'Social Login'}
              defaultToggled={false}
              labelPosition="right"
            />
          </div>
        }
        contentStyle={dialog.style}
        actions={
          state.social
            ? [<FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.onCloseDialog}
              />]
            : dialog.actionButtons
        }
        open={true}
        modal={false}>
        <div className="login-dialog-content">
          {
            !state.social &&
            <div className="login-default">
              <TextField
                floatingLabelText="Email"
                onChange={this.onChangeFieldValue.bind(this, 'username')}
                fullWidth={true}
                hintText="type email address"/>
              <br />
              <TextField
                hintText="Password"
                onChange={this.onChangeFieldValue.bind(this, 'password')}
                fullWidth={true}
                floatingLabelText="Password"
                type="password"
              />
              <br />
              <Checkbox label="Remember me"/>
              <br />
              <RaisedButton
                label="Sign IN"
                primary={true}
                onTouchTap={this.onSignIn}
              />
            </div>
          }
          {
            state.social &&
            <div className="social-login">
              <i
                className="fa fa-google"
                onClick={this.onOpenSocialLogin.bind(this, 'google')}
              />
              <i
                className="fa fa-facebook-square"
                onClick={this.onOpenSocialLogin.bind(this, 'facebook')}
              />
              <i
                className="fa fa-vk"
                onClick={this.onOpenSocialLogin.bind(this, 'vk')}
              />
              <i className="fa fa-soundcloud"/>
            </div>
          }
        </div>
      </Dialog>
    );
  }
}

export default LoginDialog;