import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';

// endpoints
import * as searchActions from './../../../actions/search';

import './Search-bar.scss';

@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators(searchActions, dispatch)
  })
)
class SearchBar extends Component {
  constructor (props) {
    super(props);

    this.state = {
      disableSearch: true
    };

    this.searchValue = '';
  }

  onKeyUp = (e) => {
    const { disableSearch } = this.state;

    this.searchValue = e.target.value;
    if (disableSearch && this.searchValue) {
      this.setState({
        disableSearch: false
      });
      return;
    }

    if (!disableSearch && !this.searchValue) {
      this.setState({
        disableSearch: true
      });
    }
  };

  onSearchMusic = () => {
    const {actions} = this.props;

    actions.searchSongs(this.searchValue);
  };

  render () {
    const { disableSearch } = this.state;

    return (
      <div className="search-bar">
        <input type="text" className="input-search" onKeyUp={this.onKeyUp}/>
        <RaisedButton
          label="Search"
          icon={<ActionSearch />}
          backgroundColor="#f5f5f5"
          disabled={disableSearch}
          onTouchTap={this.onSearchMusic}/>
      </div>
    );
  }
}

export default SearchBar;