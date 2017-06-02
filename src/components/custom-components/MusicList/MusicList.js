import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// actions
import * as playerAction from './../../../actions/player';

import './MusicList.scss';

@connect(
	state => ({}),
	dispatch => ({
		actions: bindActionCreators(playerAction, dispatch)
	})
)
class MusicList extends Component {
	constructor(props) {
		super(props);
	}

	onClickBySong(song) {
		const {actions} = this.props;
    actions.selectSong(song);
		console.log(song);
	};

	render() {
		const {props} = this;

		return (
			<div className="music-list">
				{
					props.musicData.map((item, index) => {
						return (
							<div key={index}>
								<Card onClick={this.onClickBySong.bind(this, item)}>
									<CardHeader
										title={item.band}
										subtitle={item.song}
										avatar={item.img}
									/>
								</Card>
							</div>
						)
					})
				}
			</div>
		);
	}
}

export default MusicList;
