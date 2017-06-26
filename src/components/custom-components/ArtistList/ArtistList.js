import React from 'react';
// MU components
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';
import { Avatar } from 'material-ui';
// Components
import Chip from  '../Chip/Chip';
// utils
import { durationToMinutes } from '../../../utils/parsers';
// Settings
import { NO_DATA } from '../../../settings';
// Styles
import './ArtistList.scss';

class ArtistList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      showDetailsId: null
    };
  }

  onCallAction (name, item, index) {
    const { onAction } = this.props;

    if (onAction) {
      // TODO: temporary disabled functionality
      return;
      onAction(name, item, index);
    }
  }

  onToggleDetails (id, expanded) {
    this.setState({
      showDetailsId: expanded ? id : null
    });
  }

  onOpenArtistSongs() {
    console.log('open artist songs');
  }

  render () {
    const { artists, songData } = this.props;
    const { showDetailsId } = this.state;

    return (
      <div className="artists">
        {
          artists && artists.map((item, index) => {
            if (!item.artistData) {
              return false;
            }

            return (
              <div key={index} className={`artist ${songData && songData.id === item.id ? 'active' : ''}`}>
                <Card
                  expanded={showDetailsId === item.stringId}
                  onClick={this.onCallAction.bind(this, 'selectSong', item, index)}
                  onExpandChange={this.onToggleDetails.bind(this, item.stringId)}
                  style={{ backgroundColor: 'inherit' }}>
                  <CardHeader
                    title={
                      <span
                        className="artist-name"
                        onClick={this.onOpenArtistSongs}>{item.artistData.fullName}</span>
                    }
                    titleStyle={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}
                    subtitle={
                      <div className="music-actions">
                        <i className="fa fa-clock-o" title="Total duration"/>
                        <span>Total Duration: {durationToMinutes(item.artistData.id.timestamp, 'ms')}</span>
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
                            <Chip key={index} tagName={tag}>{tag}</Chip>
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

export default ArtistList;