import {RECEIVE_SONGS} from '../actions/index';

const defaultState = {
  type: 'all',
  data: null
};
export default function searchResults(state = defaultState, action) {
  if (action.type === RECEIVE_SONGS) {
    return Object.assign({}, state, {
      data: action.payload.data,
      type: action.payload.type
    });
  }
  return state;
}
