import React from 'react';
// MU components
import { Dialog, FlatButton, RaisedButton } from 'material-ui';
// Components
import FormData from '../../FormData/FormData';

class EditTrackDialog extends React.Component {
  constructor (props) {
    super(props);

    this.initDialogData();
  }

  initDialogData () {
    this.dialog = {
      title: 'Edit Track',
      style: {
        width: '500px'
      }
    };
    this.formData = [
      {
        key: 'artist',
        type: 'textField',
        label: 'Artist name',
        defaultValue: this.props.data.track.singer,
        validation: [ {
          key: 'required',
          value: true,
          message: 'This value is required'
        }, {
          key: 'minLength',
          value: 3,
          message: 'Min length must be more then 2 symbols'
        } ]
      },
      {
        key: 'song',
        type: 'textField',
        label: 'Song name',
        defaultValue: this.props.data.track.song,
        validation: [ {
          key: 'required',
          value: true,
          message: 'This value is required'
        }, {
          key: 'minLength',
          value: 3,
          message: 'Min length must be more then 2 symbols'
        } ]
      }
    ];
    this.state = {
      validForm: true
    };
  }

  onCloseDialog = () => {
    this.props.onClose();
  };

  onChangeField = (key, value, formData) => {
    if (formData.valid) {
      this.dialog.formData = formData.fields;
    }

    this.setState({
      validForm: formData.valid
    });
  };

  onEditTrack = () => {
    console.log(this.dialog.formData);
    this.props.onClose();
  };

  render () {
    const { data } = this.props;
    const { dialog, state } = this;

    if (!data) {
      return false;
    }

    return (
      <Dialog
        title={dialog.title}
        contentStyle={dialog.style}
        open={true}
        modal={false}
        actions={[
          <FlatButton
            label="cancel"
            onTouchTap={this.onCloseDialog}
          />,
          <RaisedButton
            label="edit"
            disabled={!state.validForm}
            primary={true}
            onTouchTap={this.onEditTrack}
          />
        ]}>
        <FormData data={this.formData} onChange={this.onChangeField}/>
      </Dialog>
    )
  }
}

export default EditTrackDialog;