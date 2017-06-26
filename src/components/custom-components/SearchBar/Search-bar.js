import React from 'react';
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
const MIN_SEARCH_TERM_LENGTH = 3;
const FILTER_TYPES = [
  {index: 0, className: 'fa-users', value: "ARTIST"},
  {index: 1, className: 'fa-music', value: "GENRE"},
  {index: 2, className: 'fa-list', value: "TRACK"}
];

@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators(searchActions, dispatch)
  })
)
class SearchBar extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      disableSearch: false,
      filterIndex: 2,
      searchType: FILTER_TYPES[2].value
    };
    this.parseQueryParams();
  }

  parseQueryParams() {
    this.searchValue = '';
    URL_Service.getQueryParams().map((param) => {
      if (param.key === 'searchTerm' && param.value) {
        this.searchValue = param.value;
        return
      }
      if (param.key === 'type' && param.value) {
        const filter = FILTER_TYPES.find((filter) => filter.value === param.value);

        if (filter) {
          this.state.searchType = param.value;
          this.state.filterIndex = filter.index;
        } else {
          this.state.searchType = FILTER_TYPES[0].value; // set by default
        }
      }
    });
  }

  componentDidMount () {
    const { props, searchValue, state } = this;

    if (searchValue && searchValue.length >= MIN_SEARCH_TERM_LENGTH) {
      props.actions.searchBy(searchValue, state.searchType);
    }
  }

  onKeyUp = (e) => {
    const { disableSearch, searchType } = this.state;

    this.searchValue = e.target.value;

    if (this.searchValue.length < MIN_SEARCH_TERM_LENGTH) {
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
      this.searchMusic(this.searchValue, searchType);
    }
  };

  searchMusic (searchTerm, type) {
    const { actions } = this.props;

    URL_Service.setQueryParam('searchTerm', searchTerm);
    URL_Service.setQueryParam('type', type);
    actions.searchBy(searchTerm, type);
  }

  onChangeSearchFilter = (e, index) => {
    const { filterIndex } = this.state;
    const type = this.getFilterHintValue(index);

    if (this.searchValue.length >= MIN_SEARCH_TERM_LENGTH && filterIndex !== index) {
      this.searchMusic(this.searchValue, type);
    }

    this.setState({
      filterIndex: index,
      searchType: type
    });
  };

  getFilterHintValue (index) {
    switch (index) {
      case 0:
        return 'ARTIST';

      case 1:
        return 'GENRE';

      case 2:
        return 'TRACK';

      default :
        return 'ARTIST';
    }
  }

  render () {
    const { disableSearch, filterIndex, searchType } = this.state;

    return (
      <div className="search-bar">
        <TextField
          className={"input-search"}
          floatingLabelText={`Search by ${searchType}`}
          hintText="Type value and press Enter"
          onKeyUp={this.onKeyUp}
          defaultValue={this.searchValue}
          style={{ fontSize: 20 }}
          errorStyle={{ color: 'orange' }}
          errorText={disableSearch ? 'Type at least 3 symbols' : ''}
          fullWidth={true}
        />
        <SelectField
          value={filterIndex}
          floatingLabelText="Search by"
          onChange={this.onChangeSearchFilter}>
          {
            FILTER_TYPES.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  value={item.index}
                  primaryText={item.value}
                  leftIcon={<i className={`fa ${item.className}`}/>}/>
              );
            })
          }
        </SelectField>
      </div>
    );
  }
}

export default SearchBar;