import {combineReducers} from 'redux';
// reducers
import app from './app';
import player from  './player';
import searchResults from './search-results';

const ROOT = combineReducers({
  app,
  player,
  searchResults
});

export default ROOT;
