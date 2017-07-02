import {render} from 'react-dom';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import STORE from './redux-store/index';
import injectTapEventPlugin from 'react-tap-event-plugin';
// web components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Page from './components/layout/Page';
// pages
import Search from './components/pages/Search';
import Artist from './components/pages/Artist';
import Favorites from './components/pages/Favorites';
import PlayLists from './components/pages/PlayLists';
import Auth from './components/pages/Auth';
import Statistic from './components/pages/Statistic';
import NotFound from './components/pages/NotFound';
// common styles
import './styles/commons.scss';

injectTapEventPlugin();

render(
	<MuiThemeProvider>
		<Provider store={STORE}>
			<Router history={browserHistory}>
				<Route path="/" component={Page}>
					<IndexRedirect to="search"/>
					<Route path="search" components={{content: Search, header: Header, footer: Footer}}/>
					<Route path="artist/:id" components={{content: Artist, header: Header, footer: Footer}}/>
					<Route path="favorites" components={{content: Favorites, header: Header, footer: Footer}}/>
					<Route path="play-lists" components={{content: PlayLists, header: Header, footer: Footer}}/>
					<Route path="statistic" components={{content: Statistic, header: Header, footer: Footer}}/>
					<Route path="/:social/authentication*" components={{content: Auth, header: Header, footer: Footer}}/>
					<Route path="*" components={{content: NotFound, header: Header, footer: Footer}}/>
				</Route>
			</Router>
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('app')
);
