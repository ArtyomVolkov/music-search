import React from 'react';
// MU components
import { Subheader } from 'material-ui';
import { List } from 'material-ui/List';
// Components
import TrackItem from './TrackItem';
// Styles
import './TrackList.scss';

class TrackList extends React.Component {
  constructor (props) {
    super(props);

    this.style = {
      trackList: {
        list: {
          padding: 0
        },
        subHeader: {
          fontSize: 16,
          color: "#9d9898",
          fontWeight: 600,
          background: '#efefef'
        }
      }
    };
  }

  render () {
    const { tracks, artistId} = this.props;
    const { trackList } = this.style;

    return (
      <div className="tracks">
        <List style={trackList.list}>
          <Subheader style={trackList.subHeader}>Artist Tracks</Subheader>
          {
            tracks && tracks.map((track, index) => {
              return (<TrackItem key={index} track={track} indexItem={index} artistId={artistId} />);
            })
          }
        </List>
      </div>
    )
  }
}

export default TrackList;