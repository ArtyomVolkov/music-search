import React, {Component} from 'react';
// Style
import './PlayerActions.scss';

class PlayerActions extends Component {
  constructor(props) {
    super(props);
  }

  onChangeAction(action) {
    this.props.onChange(action);
  }

  render() {
    const {isPlaying} = this.props;

    return (
      <div className="player-actions">
        <i
          className="fa fa-step-backward"
          aria-hidden="true"
          onClick={this.onChangeAction.bind(this, 'previous')}
        />
        <i
          className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'}`}
          aria-hidden="true"
          onClick={this.onChangeAction.bind(this, 'play')}
        />
        <i
          className="fa fa-step-forward"
          aria-hidden="true"
          onClick={this.onChangeAction.bind(this, 'next')}
        />
      </div>
    );
  }
}

export default PlayerActions;