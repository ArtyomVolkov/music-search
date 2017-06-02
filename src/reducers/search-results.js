import {RECEIVE_SONGS} from './../actions/search';

const defaultState = {
  data: null
};
export default function searchResults(state = defaultState, action) {
  if (action.type === RECEIVE_SONGS) {
    return Object.assign({}, state, {
      data: action.payload
    });
  }
  return state;
}
