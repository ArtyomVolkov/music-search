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
  }

  render () {
    const { styles } = this;
    const { tracks } = this.props;

    return (
      <div className="tracks">
        <List style={styles.list}>
          <Subheader style={styles.subHeader}>Tracks for include (1)</Subheader>
          {
            tracks.map((track, index) => {
              return (
                <ListItem
                  key={index}
                  style={styles.listItem}
                  innerDivStyle={styles.listItemInnerDiv}
                  primaryText={
                    <div className="song-info">
                      <span className="singer">{track.singer}</span>
                      <span className="divider">-</span>
                      <span className="song-name">{track.song}</span>
                    </div>
                  }
                  leftAvatar={
                    <Checkbox defaultChecked={true}/>
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