import React from 'react';
// MU components
import { Dialog, DatePicker, TextField, FlatButton, SelectField, MenuItem, CircularProgress } from 'material-ui';
// Endpoints
import { getCountries, userRegistration } from '../../../../endpoints/aws-api';
// utils
import { dateTimeFormat } from '../../../../utils/parsers';
// Styles
import './SignInDialog.scss';

class SignInDialog extends React.Component {
  constructor (props) {
    super(props);

    this.initDialogData();
  }

  componentDidMount () {
    getCountries().then((resp) => {
      this.setState({
        countries: resp.data
      });
    });
  }

  initDialogData () {
    this.dialog = {
      title: 'Sign IN',
      style: {
        width: '450px'
      },
      bodyStyle: {
        padding: 0
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
          onTouchTap={this.onSignIn}
        />
      ],
      formData: {}
    };
    this.state = {
      loading: false,
      errors: {},
      countries: [],
      selectedCountry: null
    };
  }

  onCloseDialog = () => {
    this.props.onClose();
  };

  onChangeField (key, e, value) {
    const { countries } = this.state;

    if (!key) {
      return;
    }

    switch (key) {
      case 'countryCode':
        this.dialog.formData[ key ] = countries[ value ].code;
        this.setState({
          selectedCountry: value
        });
        break;

      case 'birthDate':
        this.dialog.formData[ key ] = dateTimeFormat(value);
        break;

      default :
        this.dialog.formData[ key ] = value;
        break;
    }
  }

  onSignIn = () => {
    this.setState({
      loading: true
    });

    userRegistration(this.dialog.formData).then((resp) => {
      this.setState({
        loading: false
      });
      this.onCloseDialog();
    }).catch((err) => {
      const errors = {};
      err.response.data.errors.map((error) => {
        errors[ error.field ] = error.defaultMessage;
      });
      this.setState({
        loading: false,
        errors: errors
      });
    });
  };

  render () {
    const { dialog, state } = this;

    return (
      <Dialog
        title={dialog.title}
        contentStyle={dialog.style}
        bodyStyle={dialog.bodyStyle}
        autoScrollBodyContent={true}
        actions={dialog.actionButtons}
        open={true}
        modal={false}>
        <div className="sign-in-container">
          <div className="fields">
            <TextField
              floatingLabelText="Email"
              errorText={state.errors.username}
              onChange={this.onChangeField.bind(this, 'username')}
              fullWidth={true}
            />
            <TextField
              floatingLabelText="Password"
              errorText={state.errors.password}
              type="password"
              onChange={this.onChangeField.bind(this, 'password')}
              fullWidth={true}
            />
            <TextField
              floatingLabelText="First Name"
              errorText={state.errors.firstName}
              onChange={this.onChangeField.bind(this, 'firstName')}
              fullWidth={true}
            />
            <TextField
              floatingLabelText="Last Name"
              errorText={state.errors.lastName}
              onChange={this.onChangeField.bind(this, 'lastName')}
              fullWidth={true}
            />
            <DatePicker
              floatingLabelText="Birth Date"
              textFieldStyle={{ width: '100%' }}
              disableYearSelection={false}
              onChange={this.onChangeField.bind(this, 'birthDate')}
            />
            {
              state.errors.birthDate &&
              <div className="error-text">{state.errors.birthDate}</div>
            }
            <TextField
              floatingLabelText="Phone"
              hintText={'format: 000-123-4567'}
              errorText={state.errors.phoneNumber}
              onChange={this.onChangeField.bind(this, 'phoneNumber')}
              fullWidth={true}
            />
            <SelectField
              maxHeight={200}
              fullWidth={true}
              floatingLabelText={'Country'}
              value={state.selectedCountry}
              onChange={this.onChangeField.bind(this, 'countryCode')}
            >
              {
                state.countries.map((country, index) => {
                  return (
                    <MenuItem key={index} value={index} primaryText={country.name}/>
                  );
                })
              }
            </SelectField>
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
    )
  }
}

export default SignInDialog;