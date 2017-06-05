import React, {Component} from 'react';
import {Card, CardHeader, CardActions} from 'material-ui/Card';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {durationToMinutes} from '../../../utils/parsers';
// actions
import * as playerAction from './../../../actions/player';
// Styles
import './MusicList.scss';

@connect(
  state => ({
    searchResults: state.searchResults,
    songData: state.player.songData
  }),
  dispatch => ({
    actions: bindActionCreators(playerAction, dispatch)
  })
)
class MusicList extends Component {
  constructor(props) {
    super(props);
  }

  onClickBySong(song, index) {
    this.props.actions.selectSong(song, index);
  };


  render() {
    const {searchResults, songData} = this.props;

    return (
      <div className="music-list">
        {
          searchResults.data && searchResults.data.map((item, index) => {
            return (
              <div key={index}
                   className={`song-item ${songData && songData.id === item.id ? 'active' : ''}`}>
                <Card onClick={this.onClickBySong.bind(this, item, index)} style={{backgroundColor: 'inherit'}}>
                  <CardHeader
                    title={item.user.username}
                    subtitle={item.title}
                    avatar={item.user.avatar_url}
                  />
                  <CardActions>
                    <div className="music-actions">
                      <i className="fa fa-play-circle" aria-hidden="true"/>
                      <span>{durationToMinutes(item.duration)}</span>
                      <i className="fa fa-heart" aria-hidden="true"/>
                      <span>{item.likes_count}</span>
                      <i className="fa fa-headphones" aria-hidden="true"/>
                      <span>{item.playback_count}</span>
                      <i className="fa fa-commenting" aria-hidden="true"/>
                      <span>{item.comment_count}</span>
                    </div>
                  </CardActions>
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
