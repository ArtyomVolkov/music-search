import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// MU components
import { Snackbar } from 'material-ui';
// actions]
import * as msgActions from '../../../../actions/system';
// settings
import { MESSAGE_DURATION_TIME, NO_DATA } from '../../../../settings';

@connect(
  (state) => ({
    message: state.system.message
  }),
  (dispatch) => ({
    actions: bindActionCreators(msgActions, dispatch),
  })
)
class Messenger extends React.Component {
  constructor (props) {
    super(props);

    this.style = {
      snackBar: {
        main: {
          top: 65,
          left: '50%',
          bottom: 'none'
        },
        body: {
          border: '2px solid #F44336'
        }
      }
    };
    this.state = {
      open: false,
      message: NO_DATA
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      open: true,
      message: nextProps.message.msg
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render () {
    const { snackBar } = this.style;
    const { open, message } = this.state;

    return (
      <div className="messenger">
        <Snackbar
          style={snackBar.main}
          bodyStyle={snackBar.body}
          open={open}
          action="Close"
          message={message}
          autoHideDuration={MESSAGE_DURATION_TIME}
          onActionTouchTap={this.handleRequestClose}/>
      </div>
    );
  }
}

export default Messenger;