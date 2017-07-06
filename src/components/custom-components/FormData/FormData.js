import React from 'react';
// MU components
import { TextField, Checkbox } from 'material-ui';
// Styles
import './FormData.scss';

class FormData extends React.Component {
  constructor (props) {
    super(props);

    this.initData();
  }

  initData () {
    this.formData = {
      fields: {},
      valid: true
    };
    this.styles = {};
    this.state = {
      errors: {}
    };
  }

  onChangeField (key, validation, e, value) {
    if (!key && typeof key !== 'string') {
      return;
    }

    if (validation) {
      this.toValidate(key, value, validation);
    }

    this.formData.fields[ key ] = value;
    // update fields in 500 ms
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.formData.valid = !(Object.keys(this.state.errors).length);
      if (this.props.onChange) {
        this.props.onChange(key, value, this.formData);
      }
    }, 500);
  }

  toValidate (key, value, validation) {
    if (!value && validation.required) {
      this.state.errors[ key ] = 'Value is required';
      this.setState({
        errors: this.state.errors
      });
      return false;
    }

    if (value.length < validation.minLength) {
      this.state.errors[ key ] = `Min length must be more then ${validation.minLength - 1}`;
      this.setState({
        errors: this.state.errors
      });
      return false;
    }

    delete this.state.errors[ key ]; // clear error message
    this.setState({
      errors: this.state.errors
    });
    return true;
  }

  render () {
    const { errors } = this.state;
    const { data, classNameForm } = this.props;

    return (
      <div className={classNameForm || 'simple-form'}>
        {
          data.map((field, index) => {
            if (field.type === 'textField') {
              return (
                <TextField
                  key={index}
                  fullWidth={true}
                  errorText={errors[ field.key ]}
                  floatingLabelText={field.label}
                  onChange={this.onChangeField.bind(this, field.key, field.validation)}
                />
              );
            }
          })
        }
      </div>
    );
  }
}

export default FormData;