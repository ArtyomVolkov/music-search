import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField, SelectField, MenuItem } from 'material-ui';
// endpoints
import * as searchActions from '../../../actions/search';
// Services
import URL_Service from '../../../services/QueryParamService/URLservice';
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
      disableSearch: false,
      searchFilter: 0
    };

    this.searchValue = '';
    if (URL_Service.getQueryParam('searchTerm')) {
      this.searchValue = decodeURI(URL_Service.getQueryParam('searchTerm').value);
    }
  }

  componentDidMount () {
    if (this.searchValue) {
      this.props.actions.searchSongs(this.searchValue);
    }
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
      URL_Service.setQueryParam('searchTerm', this.searchValue);
      this.props.actions.searchSongs(this.searchValue);
    }
  };

  onChangeSearchFilter = (e, value) => {
    this.setState({
      searchFilter: value
    });
  };

  render () {
    const { disableSearch, searchFilter } = this.state;

    return (
      <div className="search-bar">
        <TextField
          className={"input-search"}
          floatingLabelText="Search any song or artist"
          hintText="Type any song and press Enter"
          onKeyUp={this.onKeyUp}
          defaultValue={this.searchValue}
          style={{ fontSize: 20 }}
          errorStyle={{ color: 'orange' }}
          errorText={disableSearch ? 'Type at least 3 symbols' : ''}
          fullWidth={true}
        />
        <SelectField
          value={searchFilter}
          floatingLabelText="Search by"
          onChange={this.onChangeSearchFilter}>
          <MenuItem value={0} primaryText="All"/>
          <MenuItem value={1} primaryText="Artist"/>
        </SelectField>
      </div>
    );
  }
}

export default SearchBar;