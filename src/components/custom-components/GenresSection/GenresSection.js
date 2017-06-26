import React from 'react';
// MU components
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Avatar } from 'material-ui';
// Settings
import { NO_DATA } from '../../../settings';

class GenresSection extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      showDetailsId: null
    };
  }

  onToggleDetails (id, expanded) {
    this.setState({
      showDetailsId: expanded ? id : null
    });
  }

  render () {
    const { genres } = this.props;
    const { showDetailsId } = this.state;

    return (
      <div className="genres">
        {
          genres.map((genre, index) => {
            return (
              <div className="genre-item" key={index}>
                <Card
                  expanded={showDetailsId === genre.id}
                  onExpandChange={this.onToggleDetails.bind(this, genre.id)}>
                  <CardHeader
                    avatar={
                      <Avatar
                        size={50}
                        src="http://onlyfreewallpaper.com/walls/creative-vector-music-wide.jpg"
                      />
                    }
                    title={genre.name}
                    subtitle={'Music style'}
                    titleStyle={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}
                    showExpandableButton={true}
                  />
                  <CardText expandable={true}>
                    {genre.description || NO_DATA}
                  </CardText>
                </Card>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default GenresSection;