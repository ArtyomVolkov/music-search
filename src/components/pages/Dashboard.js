import React, {Component} from 'react';

import MusicList from '../custom-components/MusicList/MusicList';
import SearchBar from '../custom-components/SearchBar/Search-bar';
import mockData from './../../mock-data/music';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
	      <SearchBar />
        <MusicList musicData={mockData} />
      </div>
    )
  }
}

export default Dashboard;