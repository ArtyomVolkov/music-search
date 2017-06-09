import React, {Component} from 'react';

// Styles
import './PlayListSection.scss';

class PlayListSection extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    const {tracks} = this.props;

    return (
      <div className="playlist-section">
        {
          tracks.map((track, index) => {
            return (
              <div className="track-item" key={index}>
                <p>{track.title}</p>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default PlayListSection;
