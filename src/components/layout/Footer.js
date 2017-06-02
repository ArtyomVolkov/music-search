import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Slider from 'material-ui/Slider';

// Style
import './Footer.scss';

@connect(
	state => ({
    player: state.player
	}),
	dispatch => ({

	})
)
class Footer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
	  const {player} = this.props;

		return (
			<div className="music-panel">
        <div className="img-container">
          <img src={player.songData.img}/>
        </div>
				<div className="player-actions">
          <i className="fa fa-backward" aria-hidden="true" />
          <i className="fa fa-play" aria-hidden="true" />
          <i className="fa fa-forward" aria-hidden="true" />
        </div>

        <div className="track-bar">
          <Slider min={0} max={1000} step={1} />
        </div>
			</div>
		)
	}
}
export default Footer;
