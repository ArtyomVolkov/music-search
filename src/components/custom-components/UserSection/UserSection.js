import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import * as authActions from './../../../actions/auth';
// MU components
import { Dialog, TextField, FlatButton } from 'material-ui';
// Components
import UserDetails from './UserDetails/UserDetails';
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

  onOpenUserDialog (name) {
    if (name === 'login') {
      this.setState({
        isOpenDialog: true,
        dialogData: this.getLoginDialogData()
      });
    }
  }

  onCloseDialog = () => {
    this.setState({
      isOpenDialog: false
    });
  };

  getLoginDialogData () {
    return {
      title: 'Login',
      body: (
        <div>
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
      ),
      actions: [
        <FlatButton
          label="Cancel"
          primary={false}
          onTouchTap={this.onCloseDialog}
        />,
        <FlatButton
          label="Login"
          primary={true}
          onTouchTap={this.onCloseDialog}
        />
      ],
      style: {
        width: '400px'
      }
    };
  }

  onAction = (name) => {
    console.log('Action ' + name);
  };

  render () {
    const { auth } = this.props;
    const { isOpenDialog, dialogData } = this.state;

    return (
      <div className="user-data">
        {
          !auth.authorization &&
          <div className="default-user">
            <i className="fa fa-user-circle-o" aria-hidden="true"/>
            <span onClick={this.onOpenUserDialog.bind(this, 'login')}>Login</span>
          </div>
        }
        {auth.authorization && <UserDetails user={auth.user} onAction={this.onAction}/>}
        {dialogData &&
        <Dialog
          title={dialogData.title}
          autoScrollBodyContent={true}
          contentStyle={dialogData.style}
          open={isOpenDialog}
          actions={dialogData.actions}
          modal={false}>
          <div>{dialogData.body}</div>
        </Dialog>
        }
      </div>
    )
  }
}

export default UserSection;
