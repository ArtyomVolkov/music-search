import React from 'react';
import { connect } from 'react-redux';
// Services
import RouterService from '../../../../services/RouterService/RouterService';
// Style
import './Card.scss';

@connect(
  state => ({
    player: state.player
  }),
  dispatch => ({})
)
class Card extends React.Component {
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

  onOpenPlayList =()=> {
    RouterService.navigate('play-lists/' + this.props.index);
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
          <i className="fa fa-external-link" onClick={this.onOpenPlayList} />
        </div>
        <div className="card-body">
          <img src={media}/>
          <i className={`fa ${active && player.play ? 'fa-pause-circle' : 'fa-play-circle'}`}
             onClick={this.onTogglePlay}/>
          <div className="shadow-wrap"/>
        </div>
      </div>
    )
  }
}

export default Card;
