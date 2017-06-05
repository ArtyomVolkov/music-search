import React, {Component} from 'react';

import {durationToMinutes} from '../../../../utils/parsers';

// Styles
import './Timer.scss';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timerValue: props.value
    };

    if (props.autoUpdate) {
      this.interval = setInterval(this.updateTimer, 200);
    }
  }

  updateTimer = () => {
    const {audio} = this.props;

    this.setState({
      timerValue: audio.currentTime * 1000 // ms
    });
  };

  componentWillReceiveProps(nextProps) {
    const {autoUpdate} = this.props;

    if (nextProps.value && !autoUpdate) {
      this.setState({
        timerValue: nextProps.value
      });
      return;
    }

    if (nextProps.value) {
      this.setState({
        timerValue: nextProps.value
      });
    }

    if (!nextProps.isPlaying) {
      clearInterval(this.interval);
      this.interval = null;
      return;
    }

    if (!this.interval) {
      this.interval = setInterval(this.updateTimer, 200);
    }
  }

  render() {
    const {timerValue} = this.state;

    return (
      <div className="timer">
        <span>{durationToMinutes(timerValue)}</span>
      </div>
    );
  }
}

export default Timer;