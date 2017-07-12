import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
// web components
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Page from '../components/layout/Page';
// pages
import Search from '../components/pages/Search';
import Artist from '../components/pages/Artist';
import Favorites from '../components/pages/Favorites';
import PlayLists from '../components/pages/PlayLists/PlayLists';
import PlayList from '../components/pages/PlayLists/PlayList';
import Auth from '../components/pages/Auth';
import Statistic from '../components/pages/Statistic';
import NotFound from '../components/pages/NotFound';
// Services
import AuthService from '../services/AuthService/AuthService';
import SocialAuthService from '../services/AuthService/SocialAuthService';
import {getCookie} from '../utils/commons';
// common styles
import '../styles/commons.scss';

function onEnter (store, nextState, replace, success) {
  const { auth } = store.getState();

  if (!auth.authorization) {
    // TODO: special service for that
    // check auth async
    // callback()
  }
  success();
}

function AppRoot ({ store }) {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Page}>
          <IndexRedirect to="search"/>
          <Route path="search" components={{ content: Search, header: Header, footer: Footer }}/>
          <Route path="artist/:id" components={{ content: Artist, header: Header, footer: Footer }}/>
          <Route
            path="favorites"
            components={{ content: Favorites, header: Header, footer: Footer }}
            onEnter={onEnter.bind(null, store)}
          />
          <Route
            path="play-lists"
            components={{ content: PlayLists, header: Header, footer: Footer }}
            onEnter={onEnter.bind(null, store)}
          />
          <Route
            path="play-lists/:id"
            components={{ content: PlayList, header: Header, footer: Footer }}
            onEnter={onEnter.bind(null, store)}
          />
          <Route
            path="statistic"
            components={{ content: Statistic, header: Header, footer: Footer }}
            onEnter={onEnter.bind(null, store)}
          />
          <Route
            path="/:social/authentication*"
            components={{ content: Auth, header: Header, footer: Footer }}
          />
          <Route path="*" components={{ content: NotFound, header: Header, footer: Footer }}/>
        </Route>
      </Router>
    </Provider>
  )
}

export default AppRoot;