import React from 'react';
// MU components
import { Dialog, DatePicker, TextField, FlatButton, SelectField, MenuItem } from 'material-ui';

class SignInDialog extends React.Component {
  constructor (props) {
    super(props);

    this.initDialogData();
  }

  initDialogData () {
    this.dialog = {
      title: 'Sign IN',
      style: {
        width: '400px'
      },
      actionButtons: [
        <FlatButton
          label="Close"
          primary={false}
          onTouchTap={this.onCloseDialog}
        />,
        <FlatButton
          label="Sign In"
          primary={true}
          onTouchTap={this.onCloseDialog}
        />
      ]
    };
  }

  onCloseDialog = () => {
    this.props.onClose();
  };

  onChangeField(key, e, value) {
    console.log(key, value);
  }

  render() {
    const { dialog } = this;

    return (
      <Dialog
        title={dialog.title}
        contentStyle={dialog.style}
        autoScrollBodyContent={true}
        actions={dialog.actionButtons}
        open={true}
        modal={false}>
        <TextField
          floatingLabelText="Email"
          onChange={this.onChangeField.bind(this, 'username')}
          fullWidth={true}
        />
        <br />
        <TextField
          floatingLabelText="First Name"
          onChange={this.onChangeField.bind(this, 'firstName')}
          fullWidth={true}
        />
        <br />
        <TextField
          floatingLabelText="Last Name"
          onChange={this.onChangeField.bind(this, 'lastName')}
          fullWidth={true}
        />
        <TextField
          floatingLabelText="Password"
          type="password"
          onChange={this.onChangeField.bind(this, 'password')}
          fullWidth={true}
        />
        <DatePicker
          floatingLabelText="Birth Date"
          textFieldStyle={{width: '100%'}}
          disableYearSelection={false}
          onChange={this.onChangeField.bind(this, 'birthDate')}
        />
        <TextField
          floatingLabelText="Phone"
          hintText={'format: 000-123-4567'}
          onChange={this.onChangeField.bind(this, 'phoneNumber')}
          fullWidth={true}
        />
        <SelectField
          maxHeight={200}
          floatingLabelText={'Country'}
          value={null}
          fullWidth={true}
          onChange={this.onChangeField.bind(this, 'countryCode')}
        >
          <MenuItem value={0} primaryText={`Ukraine`} />
          <MenuItem value={1} primaryText={`United States of America`} />
          <MenuItem value={2} primaryText={`Russia`}/>
        </SelectField>
      </Dialog>
    )
  }
}

export default SignInDialog;