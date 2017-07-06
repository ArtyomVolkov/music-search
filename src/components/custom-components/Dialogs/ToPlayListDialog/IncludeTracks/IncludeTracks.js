import React from 'react';
// MU components
import { Subheader, Checkbox } from 'material-ui';
import { List, ListItem } from 'material-ui/List';
// Styles
import './IncludeTracks.scss';

class IncludeTracks extends React.Component {
  constructor (props) {
    super(props);

    this.styles = {
      list: {
        padding: 0
      },
      listItem: {
        padding: 0,
        borderTop: '1px solid #dcdcdc'
      },
      listItemInnerDiv: {
        padding: '12px 5px 12px 45px'
      },
      subHeader: {
        fontSize: 16,
        color: "#9d9898",
        fontWeight: 600,
        background: '#efefef'
      }
    };
    this.state = {
      selectedTrackIds: props.tracks.map((track) => track.fileId)
    };
  }

  onToggleTracks (id) {
    const {selectedTrackIds} = this.state;
    const trackIndex = selectedTrackIds.indexOf(id);

    trackIndex === -1 ? selectedTrackIds.push(id) : selectedTrackIds.splice(trackIndex, 1);
    this.setState({
      selectedTrackIds: selectedTrackIds
    });
    this.props.onChange(selectedTrackIds);
  }

  render () {
    const { styles, state } = this;
    const { tracks, limit } = this.props;

    return (
      <div className="tracks-container">
        <List style={styles.list}>
          <Subheader style={styles.subHeader}>
            <span>Tracks for include ({state.selectedTrackIds.length})</span>
            {limit && <span className="limit">Limit 10 tracks</span>}
          </Subheader>
          {
            tracks.map((track, index) => {
              return (
                <ListItem
                  key={index}
                  style={styles.listItem}
                  innerDivStyle={styles.listItemInnerDiv}
                  onTouchTap={this.onToggleTracks.bind(this, track.fileId)}
                  primaryText={
                    <div className="song-info">
                      <span className="singer">{track.singer}</span>
                      <span className="divider">-</span>
                      <span className="song-name">{track.song}</span>
                    </div>
                  }
                  leftAvatar={
                    <Checkbox checked={state.selectedTrackIds.indexOf(track.fileId) !== -1}/>
                  }
                />
              );
            })
          }
        </List>
      </div>
    );
  }
}

export default IncludeTracks;