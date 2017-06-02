import React, {Component} from 'react';
import {AppBar, IconButton} from 'material-ui';
import AvLibraryMusic from 'material-ui/svg-icons/av/library-music';
import SocialPerson from 'material-ui/svg-icons/social/person';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<AppBar
				title="Music Search"
				iconElementLeft={<IconButton><AvLibraryMusic /></IconButton>}
				iconElementRight={<IconButton><SocialPerson /></IconButton>}
				style={{background:'#272727'}}
			/>
		)
	}
}

export default Header;