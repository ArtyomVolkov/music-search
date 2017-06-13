import {combineReducers} from 'redux';
// reducers
import app from './app';
import player from  './player';
import searchResults from './search-results';
import playLists from './playlists';
import system from './system';
import dialog from './dialog';
import auth from './auth';

const ROOT = combineReducers({
  app,
  auth,
  player,
  system,
  dialog,
  playLists,
  searchResults
});

export default ROOT;
