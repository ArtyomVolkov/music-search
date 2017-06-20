import React from 'react';
// MU components
import { Avatar } from 'material-ui';
// endpoints
import {getArtistImages} from '../../../endpoints/aws-api';
// Styles
import './ArtistSection.scss';

class ArtistSection extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      title: '',
      img: ''
    };
  }

  componentDidMount() {
    const {artistId} = this.props;

    getArtistImages(artistId).then((resp) => {
      this.setState({
        title: resp.data.name,
        img: resp.data.images.smallImages[0]
      });
    });
  }

  render() {
    const {title, img} = this.state;

    return (
      <div className="artist-section">
        <Avatar size={80} src={'http://' + img}/>
        <p className="title">{title}</p>
      </div>
    )
  }
}

export default ArtistSection;
