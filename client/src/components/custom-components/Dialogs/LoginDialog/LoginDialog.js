import React, { Component } from 'react';
// MU components
import { Dialog, TextField, FlatButton } from 'material-ui';
// Style
import './LoginDialog.scss';

class LoginDialog extends Component {
  constructor (props) {
    super(props);

    this.initDialogData();
  }

  initDialogData() {
    this.dialog = {
      title: 'Login',
      style: {
        width: '400px'
      },
      actionButtons: [
        <FlatButton
          label="Cancel"
          primary={false}
          onTouchTap={this.onCloseDialog}
        />,
        <FlatButton
          label="Ok"
          primary={true}
          onTouchTap={this.onCloseDialog}
        />
      ]
    };
  }

  onCloseDialog =()=> {
    this.props.onClose();
  };

  render () {
    const {dialog} = this;

    return (
      <Dialog
        title={dialog.title}
        contentStyle={dialog.style}
        actions={dialog.actionButtons}
        open={true}
        modal={false}>
        <div className="login-dialog-content">
          <TextField
            floatingLabelText="Email"
            fullWidth={true}
            hintText="type email address"/>
          <br />
          <TextField
            hintText="Password"
            fullWidth={true}
            floatingLabelText="Password"
            type="password"
          />
          <div className="social-login">
            <i className="fa fa-google-plus-square" aria-hidden="true"/>
            <i className="fa fa-facebook-square" aria-hidden="true"/>
            <i className="fa fa-soundcloud" aria-hidden="true"/>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default LoginDialog;