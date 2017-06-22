import React from 'react';
import Waypoint from 'react-waypoint';
// MU components
import { Subheader, RefreshIndicator } from 'material-ui';
import { List } from 'material-ui/List';
// Components
import TrackItem from './TrackItem';
// Settings
import { TRACK_LIMIT } from '../../../settings';
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
    this.state = {
      loading: false,
      itemsCount: 0,
      tracks: this.props.tracks && props.tracks.slice(0, TRACK_LIMIT) || [] // first 20 songs
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tracks) {
      this.setState({
        tracks: nextProps.tracks.slice(0, TRACK_LIMIT)
      });
    }
  }

  loadMoreTracks = () => {
    const {props, state} = this;

    // TODO: custom lazy loading
    const newTracks = props.tracks.slice(state.tracks.length, (state.tracks.length + TRACK_LIMIT));
    if (!newTracks.length) {
      return;
    }

    this.setState({
      loading: true
    });
    setTimeout(() => {
      this.setState({
        loading: false,
        tracks: [...state.tracks, ...newTracks]
      });
    }, 1000);
  };

  render () {
    const { artistId, subHeader } = this.props;
    const { tracks, loading } = this.state;
    const { trackList } = this.style;

    return (
      <div className="tracks">
        <List style={trackList.list}>
          {!!subHeader && <Subheader style={trackList.subHeader}>{subHeader}</Subheader>}
          {
            tracks && tracks.map((track, index) => {
              return (<TrackItem key={index} track={track} indexItem={index} artistId={artistId}/>);
            })
          }
        </List>
        <div className={`spinner-container ${!loading ? 'hidden' : ''}`}>
          <div className="spinner">
            <RefreshIndicator
              size={40}
              top={0}
              left={0}
              status={`${loading ? 'loading' : 'hide'}`}
              loadingColor="#FF9800"
            />
          </div>
        </div>
        <Waypoint onEnter={this.loadMoreTracks}/>
      </div>
    )
  }
}

export default TrackList;