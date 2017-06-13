import React, { Component } from 'react';
import { connect } from 'react-redux';

// DialogContent components
import LoginDialog from './LoginDialog/LoginDialog';
import ProfileDialog from './ProfileDialog/ProfileDialog';

// Services
import DIALOG_SERVICE from '../../../services/DialogService/DialogService';

@connect(
  (state) => ({
    dialog: state.dialog
  }),
  (dispatch) => ({})
)
class DialogAdapter extends Component {
  constructor (props) {
    super(props);
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps);
  }

  onCloseDialog = () => {
    const { dialog } = this.props;

    DIALOG_SERVICE.onClose(dialog.name);
  };


  render () {
    const { dialog } = this.props;

    return (
      <div className="global-dialog-wrapper">
        {dialog.name === 'login' && dialog.open && <LoginDialog onClose={this.onCloseDialog}/>}
        {dialog.name === 'profile' && dialog.open && <ProfileDialog onClose={this.onCloseDialog} data={dialog.data}/>}
      </div>
    )
  }
}

export default DialogAdapter;