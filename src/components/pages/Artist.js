import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import TrackList from '../custom-components/TrackList/TrackList';
import ArtistSection from '../custom-components/ArtistSection/ArtistSection';
// actions
import * as artistActions from '../../actions/artist';

@connect(
  state => ({
    artistData: state.artistData
  }),
  dispatch => ({
    artistActions: bindActionCreators(artistActions, dispatch)
  })
)
class Artist extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.artistActions.getAtristData(this.props.params.id);
  }

  render () {
    const { artistData, params } = this.props;

    if (!artistData) {
      return false;
    }

    return (
      <div>
        <ArtistSection artistId={params.id}/>
        {artistData.tracks && <TrackList tracks={artistData.tracks} type={'track'} />}
      </div>
    )
  }
}

export default Artist;