import {RECEIVE_ARTIST_DATA} from '../actions/index';

const defaultState = {};

export default function artistData(state = defaultState, action) {
  if (action.type === RECEIVE_ARTIST_DATA) {
    return Object.assign({}, state, action.payload);
  }

  return state;
}