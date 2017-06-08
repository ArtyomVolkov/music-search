import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import * as playlistActions from './../../../actions/playlists';

// Components
import Card from './Card/Card';

// utils
import {replaceStringURL} from '../../../utils/parsers';

// Styles
import './PlayListCards.scss';

@connect(
  state => ({
    playLists: state.playLists
  }),
  dispatch => ({
    actions: bindActionCreators(playlistActions, dispatch)
  })
)
class PlayListCards extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.actions.getPlayLists();
  }

  onCallAction =(name)=> {
    console.log(name);
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
                  media={replaceStringURL(list.artwork_url || list.tracks[0].artwork_url, 'large', 'crop')}
                  onAction={this.onCallAction}
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
