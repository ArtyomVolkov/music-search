import {combineReducers} from 'redux';
// reducers
import app from './app';
import player from  './player';
import searchResults from './search-results';
import playLists from './playlists';
import system from './system';
import auth from './auth';

const ROOT = combineReducers({
  app,
  auth,
  player,
  system,
  playLists,
  searchResults
});

export default ROOT;
