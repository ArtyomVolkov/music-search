import React, { Component } from 'react';
// MU components
import { Dialog, TextField, FlatButton, Avatar } from 'material-ui';

class ProfileDialog extends Component {
  constructor (props) {
    super(props);

    this.initDialogData();
  }

  initDialogData () {
    this.dialog = {
      title: 'Profile',
      style: {
        width: '500px'
      },
      actionButtons: [
        <FlatButton
          label="close"
          primary={true}
          onTouchTap={this.onCloseDialog}
        />
      ]
    };
  }

  onCloseDialog = () => {
    this.props.onClose();
  };

  render () {
    const { data } = this.props;
    const { dialog } = this;

    if (!data) {
      return false;
    }

    return (
      <Dialog
        title={dialog.title}
        contentStyle={dialog.style}
        actions={dialog.actionButtons}
        open={true}
        modal={false}>
        <Avatar size={50} src={data.avatar_url}/>
        <TextField
          floatingLabelText="First Name"
          value={data.first_name}
          fullWidth={true}
        />
        <br />
        <TextField
          floatingLabelText="Last Name"
          value={data.last_name}
          fullWidth={true}
        />
        <br />
        <TextField
          floatingLabelText="City"
          value={`${data.city} [${data.country}]`}
          fullWidth={true}
        />
      </Dialog>
    )
  }
}

export default ProfileDialog;