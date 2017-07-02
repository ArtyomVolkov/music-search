import React from 'react';
// Components
import NavigationBar from '../NavigationBar/NavigationBar';
import UserSection from '../UserSection/UserSection';
import DrawerCustom from '../Drawer/Drawer';
// Style
import './AppBar.scss';

class AppBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			openDrawer: false
		};
	}

	onToggleDrawer = (e) => {
		if (!e) {
			this.refs.settings.classList.remove('active');
			this.setState({
				openDrawer: !this.state.openDrawer
			});
			return;
		}

		this.refs.settings.classList.add('active');
		setTimeout(() => {
			this.setState({
				openDrawer: !this.state.openDrawer
			});
		}, 400);
	};

	render() {
		const {title} = this.props;
		const {openDrawer} = this.state;

		return (
			<div className="app-bar">
				<div className="logo-section">
					<i className="fa fa-cog" ref={'settings'} onClick={this.onToggleDrawer}/>
					<span className="app-title">{title}</span>
				</div>
				<div className="nav-section">
					<NavigationBar />
				</div>
				<div className="user-section">
					<UserSection />
				</div>
				<DrawerCustom open={openDrawer} onToggle={this.onToggleDrawer}/>
			</div>
		)
	}
}

export default AppBar;