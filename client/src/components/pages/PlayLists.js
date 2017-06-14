import React, { Component } from 'react';
// components
import PlayListCards from '../custom-components/PlayListCards/PlayListCards';

class PlayLists extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="play-lists-page">
        <PlayListCards />
      </div>
    );
  }
}

export default PlayLists;
