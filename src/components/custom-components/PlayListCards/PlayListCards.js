import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import * as playlistActions from '../../../actions/playlists';
import * as playerActions from '../../../actions/player';
// Components
import Card from './Card/Card';
// utils
import { replaceStringURL } from '../../../utils/parsers';
// Styles
import './PlayListCards.scss';

@connect(
  state => ({
    playLists: state.playLists,
    playList: state.player.playList
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

  onCallAction (index) {
    const { playLists, playListActions, playerActions, playList } = this.props;
    const tracks = playLists.data[index].tracks;

    if (!playList || !playLists.activeIndex || playLists.activeIndex !== index) {
      playListActions.setActivePlaylist(index);
      playerActions.setPlayListData(tracks);
      // select first song to play
      playerActions.selectSong(tracks[0], 0, 'playlist-track');
      return;
    }

    if (playLists.activeIndex === index) {
      playerActions.onTogglePlay();
    }
  };

  render () {
    const { playLists, playList} = this.props;

    return (
      <div className="play-list-cards">
        {
          playLists.data && playLists.data.map((list, index) => {
            return (
              <div key={index} className="card-item">
                <Card
                  active={playList && playLists.activeIndex === index}
                  data={list}
                  title={list.name}
                  subTitle={`${list.tracks.length} ${list.tracks.length > 1 ? 'tracks' : 'track'}`}
                  media={list.image}
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
