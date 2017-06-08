import React, { Component } from 'react';

// Style
import './Card.scss';

class Card extends Component {
  constructor (props) {
    super(props);
  }

  onTogglePlay =() => {
    this.props.onAction('play');
  };

  render() {
    const {title, subTitle, media} = this.props;

    return (
      <div className="card">
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
          <i className="fa fa-play-circle" aria-hidden="true" onClick={this.onTogglePlay} />
          <div className="shadow-wrap"></div>
        </div>
      </div>
    )
  }
}

export default Card;
