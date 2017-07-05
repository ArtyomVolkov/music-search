import React from 'react';
import { connect } from 'react-redux';
// Dialogs
import LoginDialog from './LoginDialog/LoginDialog';
import ProfileDialog from './ProfileDialog/ProfileDialog';
import SignInDialog from './SignInDialog/SignInDialog';
import ToPlayListDialog from './ToPlayListDialog/ToPlayListDialog';
// Services
import DIALOG_SERVICE from '../../../services/DialogService/DialogService';

@connect(
  (state) => ({
    dialog: state.dialog
  }),
  (dispatch) => ({})
)
class DialogAdapter extends React.Component {
  constructor (props) {
    super(props);
  }

  onCloseDialog = () => {
    const { dialog } = this.props;

    DIALOG_SERVICE.onClose(dialog.name);
  };


  render () {
    const { dialog } = this.props;

    return (
      <div className="global-dialog-wrapper">
        {dialog.name === 'login' && dialog.open &&
        <LoginDialog onClose={this.onCloseDialog}/>}
        {dialog.name === 'profile' && dialog.open &&
        <ProfileDialog onClose={this.onCloseDialog} data={dialog.data}/>}
        {dialog.name === 'sign-in' && dialog.open &&
        <SignInDialog onClose={this.onCloseDialog}/>}
        {dialog.name === 'to-playlist' && dialog.open &&
        <ToPlayListDialog onClose={this.onCloseDialog} data={dialog.data}/>}
      </div>
    )
  }
}

export default DialogAdapter;
