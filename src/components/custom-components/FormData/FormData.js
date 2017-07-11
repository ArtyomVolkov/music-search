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
    for (let i = 0; i < validation.length; i++) {
      // required
      if (validation[i].key === 'required') {
        if (value) {
          delete this.state.errors[ key ];
          continue;
        } else {
          this.state.errors[ key ] = validation[i].message;
          break;
        }
      }
      // minLength
      if (validation[i].key === 'minLength') {
        if (value.length < validation[i].value) {
          this.state.errors[ key ] = validation[i].message;
          break;
        } else {
          delete this.state.errors[ key ];
          continue;
        }
      }
      // reserved names
      if (validation[i].key === 'reservedNames') {
        if (validation[i].value.indexOf(value.trim()) !== -1) {
          this.state.errors[ key ] = validation[i].message;
          break;
        } else {
          delete this.state.errors[ key ];
        }
      }
    }

    this.setState({
      errors: this.state.errors
    });
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