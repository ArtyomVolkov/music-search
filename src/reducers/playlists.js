import { RECEIVE_PLAY_LISTS } from './../actions/playlists';

const defaultState = {
  data: null
};
export default function playLists (state = defaultState, action) {
  if (action.type === RECEIVE_PLAY_LISTS) {
    return Object.assign({}, state, {
      data: action.payload
    });
  }
  return state;
}
