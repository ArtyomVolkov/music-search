import React from 'react';
// Material UI components
import {Drawer, MenuItem, Divider, Toggle} from 'material-ui';
// settings
import {LOGO_APP_URL} from '../../../settings';
// styles
import './Drawer.scss';

class DrawerCustom extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		const {open, onToggle} = this.props;

		return (
			<Drawer
				docked={false}
				width={300}
				open={open}
				onRequestChange={onToggle}
			>
				<div className="drawer-content">
					<div className="app-logo">
						<img src={LOGO_APP_URL} alt="app-logo"/>
						<span className="title">Accord</span>
					</div>
					<Divider />
					<div className="topic">
						<i className="fa fa-sliders" />
						<span>Player Settings</span>
					</div>
					<Divider />
					<MenuItem>Play Next</MenuItem>
					<MenuItem>TrackBar update</MenuItem>
					<MenuItem>Default Volume</MenuItem>
					<Divider />
					<div className="topic">
						<i className="fa fa-wrench" />
						<span>Account settings</span>
					</div>
					<Divider />
					<MenuItem>Show Friends</MenuItem>
					<MenuItem>Show Messages</MenuItem>
					<MenuItem>Use Statistic</MenuItem>
				</div>
			</Drawer>
		)
	}
}

export default DrawerCustom;