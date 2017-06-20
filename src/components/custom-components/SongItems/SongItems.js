import React, { Component } from 'react';
// MU components
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';
import { Chip, Avatar } from 'material-ui';
// utils
import { durationToMinutes } from '../../../utils/parsers';
// Settings
import { NO_DATA } from '../../../settings';
// Styles
import './SongItems.scss';

class SongItems extends Component {
  constructor (props) {
    super(props);

    this.state = {
      showDetailsId: null
    };
  }

  onCallAction (name, item, index) {
    const { onAction } = this.props;

    if (onAction) {
      onAction(name, item, index);
    }
  }

  onToggleDetails (id, expanded) {
    this.setState({
      showDetailsId: expanded ? id : null
    });
  }

  render () {
    const { songs, songData } = this.props;
    const { showDetailsId } = this.state;

    return (
      <div className="song-items">
        {
          songs && songs.map((item, index) => {
            if (!item.artistData) {
              return false;
            }

            return (
              <div key={index} className={`song-item ${songData && songData.id === item.id ? 'active' : ''}`}>
                <Card
                  expanded={showDetailsId === item.stringId}
                  onClick={this.onCallAction.bind(this, 'selectSong', item, index)}
                  onExpandChange={this.onToggleDetails.bind(this, item.stringId)}
                  style={{ backgroundColor: 'inherit' }}>
                  <CardHeader
                    title={item.artistData.fullName}
                    titleStyle={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}
                    subtitle={
                      <div className="music-actions">
                        <i className="fa fa-clock-o" aria-hidden="true" title="Total duration"/>
                        <span>{durationToMinutes(item.artistData.id.timestamp, 'ms')}</span>
                      </div>
                    }
                    avatar={
                      <Avatar size={50}
                        src={item.artistData.images && item.artistData.images.MEDIUM}/>
                    }
                    showExpandableButton={true}
                  />
                  <CardActions>
                    <div className="tags">
                      {
                        item.artistData.tags.map((tag, index) => {
                          return (
                            <Chip key={index} style={{ marginRight: 10, backgroundColor: '#ffc93b' }}>
                              {tag}
                            </Chip>
                          );
                        })
                      }
                    </div>
                  </CardActions>
                  <CardText expandable={true}>
                    {item.artistData.wikiDescpiption || NO_DATA}
                  </CardText>
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