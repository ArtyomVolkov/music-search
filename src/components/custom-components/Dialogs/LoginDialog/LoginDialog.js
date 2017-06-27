import React from 'react';
// MU components
import { Dialog, TextField, FlatButton, RaisedButton, Checkbox, Toggle } from 'material-ui';
// Services
import AuthService from '../../../../services/AuthService/AuthService';
// Style
import './LoginDialog.scss';

class LoginDialog extends React.Component {
  constructor (props) {
    super(props);

    this.initDialogData();
  }

  initDialogData () {
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

    this.state = {
      social: false
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
  };

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
        actions={dialog.actionButtons}
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
              <i className="fa fa-google-plus-square"/>
              <i className="fa fa-facebook-square"/>
              <i className="fa fa-vk" />
              <i className="fa fa-soundcloud"/>
            </div>
          }
        </div>
      </Dialog>
    );
  }
}

export default LoginDialog;