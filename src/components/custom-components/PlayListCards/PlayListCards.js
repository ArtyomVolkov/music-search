import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import * as playlistActions from './../../../actions/playlists';
import * as playerActions from './../../../actions/player';
// Components
import Card from './Card/Card';
// utils
import { replaceStringURL } from '../../../utils/parsers';
// Styles
import './PlayListCards.scss';

@connect(
  state => ({
    playLists: state.playLists
  }),
  dispatch => ({
    playListActions: bindActionCreators(playlistActions, dispatch),
    playerActions: bindActionCreators(playerActions, dispatch)
  })
)
class PlayListCards extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.playListActions.getPlayLists();
  }

  onCallAction (index, actionName) {
    const { playLists } = this.props;
    const tracks = playLists.data[index].tracks;

    this.props.playerActions.setPlayListData(tracks);
    // select first song to play
    this.props.playerActions.selectSong(tracks[0], 0);
  };

  render () {
    const { playLists } = this.props;

    return (
      <div className="play-list-cards">
        {
          playLists.data && playLists.data.map((list, index) => {
            return (
              <div key={index} className="card-item">
                <Card
                  title={list.title}
                  subTitle={`${list.track_count} ${list.track_count > 1 ? 'tracks' : 'track'}`}
                  media={replaceStringURL(list.artwork_url || list.tracks[ 0 ].artwork_url, 'large', 'crop')}
                  onAction={this.onCallAction.bind(this, index)}
                />
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default PlayListCards;
