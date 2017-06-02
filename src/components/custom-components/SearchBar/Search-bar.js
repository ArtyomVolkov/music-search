import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';

import './Search-bar.scss';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			disableSearch: true
		};
	}

	onKeyUp = (e) => {
		const {disableSearch} = this.state;

		if (disableSearch && e.target.value) {
			this.setState({
				disableSearch: false
			});
			return;
		}

		if (!disableSearch && !e.target.value) {
			this.setState({
				disableSearch: true
			});
		}
	};

	render() {
		const {disableSearch} = this.state;

		return (
			<div className="search-bar">
				<input type="text" className="input-search" onKeyUp={this.onKeyUp}/>
				<RaisedButton
					label="Search"
					icon={<ActionSearch />}
					backgroundColor="#f5f5f5"
					disabled={disableSearch} />
			</div>
		);
	}
}

export default SearchBar;