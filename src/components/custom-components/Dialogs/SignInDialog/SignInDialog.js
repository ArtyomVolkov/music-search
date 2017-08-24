import React from 'react';
// MU components
import {
  Dialog,
  DatePicker,
  RaisedButton,
  TextField,
  FlatButton,
  SelectField,
  MenuItem,
  CircularProgress
} from 'material-ui';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
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
      title: 'Sign Up',
      style: {
        width: '500px'
      },
      bodyStyle: {
        padding: 0
      },
      formData: {}
    };
    this.steps = ['Email', 'Password', 'User Data', 'Personal Info'];
    this.state = {
      loading: false,
      activeStepIndex: 0,
      isDisabledNext: true,
      errors: {},
      countries: [],
      gender: '',
      selectedCountry: null
    };
  }

  onCloseDialog = () => {
    this.props.onClose();
  };

  onChangeField (key, e, value, text) {
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

      case 'gender':
        this.dialog.formData[ key ] = text;
        this.setState({
          gender: text
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

  onSignUp = () => {
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
      err.response.data && err.response.data.errors.map((error) => {
        errors[ error.field ] = error.defaultMessage;
      });
      this.setState({
        loading: false,
        errors: errors,
        activeStepIndex: 0
      });
    });
  };

  backToPreviousStep = () => {
    this.setState({
      activeStepIndex: this.state.activeStepIndex - 1
    });
  };

  goToNextStep = () => {
    this.setState({
      activeStepIndex: this.state.activeStepIndex + 1
    });
  };

  getContentByActiveStep () {
    const { activeStepIndex, errors, gender } = this.state;

    switch (activeStepIndex) {
      case 0:
        return (
          <TextField
            floatingLabelText="Email"
            key="email"
            defaultValue={this.dialog.formData[ 'username' ]}
            errorText={errors.username}
            onChange={this.onChangeField.bind(this, 'username')}
            fullWidth={true}
          />
        );

      case 1:
        return (
          <TextField
            floatingLabelText="Password"
            key="password"
            errorText={errors.password}
            defaultValue={this.dialog.formData[ 'password' ]}
            type="password"
            onChange={this.onChangeField.bind(this, 'password')}
            fullWidth={true}
          />
        );

      case 2:
        return (
          <div>
            <TextField
              floatingLabelText="First Name"
              defaultValue={this.dialog.formData[ 'firstName' ]}
              errorText={errors.firstName}
              onChange={this.onChangeField.bind(this, 'firstName')}
              fullWidth={true}
            />
            <TextField
              floatingLabelText="Last Name"
              defaultValue={this.dialog.formData[ 'lastName' ]}
              errorText={errors.lastName}
              onChange={this.onChangeField.bind(this, 'lastName')}
              fullWidth={true}
            />
            <SelectField
              fullWidth={true}
              floatingLabelText={'Gender'}
              value={gender}
              onChange={this.onChangeField.bind(this, 'gender')}
            >
              <MenuItem value={'MALE'} primaryText={'Male'}/>
              <MenuItem value={'FEMALE'} primaryText={'Female'}/>
            </SelectField>
          </div>
        );

      case 3:
        return this.getOtherData();
    }
  }

  getOtherData () {
    const { errors, countries, selectedCountry } = this.state;

    return (
      <div>
        <DatePicker
          floatingLabelText="Birth Date"
          textFieldStyle={{ width: '100%' }}
          defaultValue={this.dialog.formData[ 'birthDate' ]}
          disableYearSelection={false}
          onChange={this.onChangeField.bind(this, 'birthDate')}
        />
        {
          errors.birthDate &&
          <div className="error-text">{errors.birthDate}</div>
        }
        <TextField
          floatingLabelText="Phone"
          hintText={'format: 000-123-4567'}
          defaultValue={this.dialog.formData[ 'phoneNumber' ]}
          errorText={errors.phoneNumber}
          onChange={this.onChangeField.bind(this, 'phoneNumber')}
          fullWidth={true}
        />
        <SelectField
          maxHeight={200}
          fullWidth={true}
          floatingLabelText={'Country'}
          value={selectedCountry}
          onChange={this.onChangeField.bind(this, 'countryCode')}
        >
          {
            countries.map((country, index) => {
              return (
                <MenuItem key={index} value={index} primaryText={country.name}/>
              );
            })
          }
        </SelectField>
      </div>
    )
  }

  render () {
    const { dialog, state } = this;

    return (
      <Dialog
        title={dialog.title}
        contentStyle={dialog.style}
        bodyStyle={dialog.bodyStyle}
        autoScrollBodyContent={true}
        actions={
          [
            <FlatButton
              label="Close"
              primary={false}
              onTouchTap={this.onCloseDialog}
            />,
            <FlatButton
              label="Sign Up"
              primary={true}
              disabled={state.activeStepIndex <= 3}
              onTouchTap={this.onSignUp}
            />
          ]
        }
        open={true}
        modal={false}>
        <div className="sign-in-container">
          <div className="fields">
            {
              this.getContentByActiveStep()
            }
          </div>
          <div className="stepper-section">
            <Stepper activeStep={state.activeStepIndex}>
              {
                this.steps.map((item, index) => {
                  return (
                    <Step key={index}>
                      <StepLabel>{item}</StepLabel>
                    </Step>
                  );
                })
              }
            </Stepper>
            <FlatButton
              label="Back"
              disabled={state.activeStepIndex === 0}
              onClick={this.backToPreviousStep}
              style={{ marginRight: 12 }}
            />
            {
              state.activeStepIndex <= 3 &&
              <RaisedButton
                label={state.activeStepIndex >= 3 ? 'Skip' : 'Next'}
                primary={true}
                onClick={this.goToNextStep}
              />
            }
          </div>
          {
            !!Object.keys(state.errors).length &&
            <div className="error-section">
              <span>{JSON.stringify(state.errors)}</span>
            </div>
          }
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