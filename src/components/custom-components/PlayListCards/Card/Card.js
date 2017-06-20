import React, { Component } from 'react';
import { connect } from 'react-redux';

// Style
import './Card.scss';

@connect(
  state => ({
    player: state.player
  }),
  dispatch => ({})
)
class Card extends Component {
  constructor (props) {
    super(props);
  }

  onTogglePlay = (e) => {
    if (e.target.classList.contains('fa-pause-circle')) {
      e.target.classList.remove('fa-pause-circle');
      e.target.classList.add('fa-play-circle');
    } else {
      e.target.classList.remove('fa-play-circle');
      e.target.classList.add('fa-pause-circle');
    }
    this.props.onAction('play');
  };

  render () {
    const { title, subTitle, media, active, player } = this.props;

    return (
      <div className={`card ${active ? 'active' : ''}`}>
        <div className="card-header">
          <div className="title">
            <span>{title}</span>
          </div>
          <div className="sub-title">
            <span>{subTitle}</span>
          </div>
        </div>
        <div className="card-body">
          <img src={media}/>
          <i className={`fa ${active && player.play ? 'fa-pause-circle' : 'fa-play-circle'}`}
             aria-hidden="true"
             onClick={this.onTogglePlay}/>
          <div className="shadow-wrap"/>
        </div>
      </div>
    )
  }
}

export default Card;
