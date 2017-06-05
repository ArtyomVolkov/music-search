import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {TextField} from 'material-ui';
// endpoints
import * as searchActions from './../../../actions/search';
// Style
import './Search-bar.scss';

const ENTER_KEY_CODE = 13;

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
      disableSearch: false
    };

    this.searchValue = '';
  }

  onKeyUp = (e) => {
    const { disableSearch } = this.state;

    this.searchValue = e.target.value;

    if (this.searchValue.length < 3) {
      this.setState({
        disableSearch: true
      });
      return;
    }

    if (disableSearch) {
      this.setState({
        disableSearch: false
      });
    }

    if (e.keyCode === ENTER_KEY_CODE) {
      this.props.actions.searchSongs(this.searchValue);
    }
  };

  render () {
    const { disableSearch } = this.state;

    return (
      <div className="search-bar">
        <TextField
          className={"input-search"}
          hintText="Type any song and press Enter"
          onKeyUp={this.onKeyUp}
          style={{fontSize: 20}}
          errorStyle={{color: 'orange'}}
          errorText={disableSearch ? 'Type at least 3 symbols' : ''}
          fullWidth={true}
        />
      </div>
    );
  }
}

export default SearchBar;