import {combineReducers} from 'redux';
// reducers
import app from './app';
import player from  './player';
import searchResults from './search-results';
import playLists from './playlists';
import system from './system';

const ROOT = combineReducers({
  app,
  player,
  system,
  playLists,
  searchResults
});

export default ROOT;
