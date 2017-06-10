import React, {Component} from 'react';
// MU components
import {Card, CardHeader, CardActions} from 'material-ui/Card';
// utils
import {durationToMinutes} from '../../../utils/parsers';
// Styles
import './SongItems.scss';

class SongItems extends Component {
  constructor (props) {
    super(props);
  }

  onCallAction(name, item, index) {
    const {onAction} = this.props;

    if (onAction) {
      onAction(name, item, index);
    }
  }

  render() {
    const {songs, songData} = this.props;

    return (
      <div className="song-items">
        {
          songs && songs.map((item, index) => {
            return (
              <div key={index}
                   className={`song-item ${songData && songData.id === item.id ? 'active' : ''}`}>
                <Card
                  onClick={this.onCallAction.bind(this, 'selectSong', item, index)}
                  style={{backgroundColor: 'inherit'}}>
                  <CardHeader
                    title={item.user.username}
                    subtitle={item.title}
                    avatar={item.artwork_url || item.user.avatar_url}
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
            );
          })
        }
      </div>
    );
  }
}

export default SongItems;