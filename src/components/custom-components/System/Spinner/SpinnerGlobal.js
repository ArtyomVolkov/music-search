import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import { CircularProgress } from 'material-ui';
// Styles
import './SpinnerGlobal.scss';

@connect(
  state => ({
    spinner: state.system.spinner
  }),
  dispatch => ({})
)
class SpinnerGlobal extends Component {

  render () {
    const { spinner } = this.props;

    return (
      <div className={`global-spinner ${spinner ? 'active' : ''}`}>
        {spinner &&
        <div className="spinner">
          <CircularProgress size={70} thickness={3}/>
        </div>
        }
      </div>
    );
  }
}

export default SpinnerGlobal;