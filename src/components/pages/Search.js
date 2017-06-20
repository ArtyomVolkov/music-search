import React, { Component } from 'react';

import MusicList from '../custom-components/MusicList/MusicList';
import SearchBar from '../custom-components/SearchBar/Search-bar';

class Search extends Component {
  constructor (props) {
    super(props);
  }

  render () {

    return (
      <div>
        <SearchBar />
        <MusicList />
      </div>
    )
  }
}

export default Search;