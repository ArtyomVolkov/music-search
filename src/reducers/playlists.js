import { RECEIVE_PLAY_LISTS, TOGGLE_PLAYLIST_SECTION } from './../actions/playlists';

const defaultState = {
  data: null,
  showPlayList: false
};
export default function playLists (state = defaultState, action) {
  if (action.type === RECEIVE_PLAY_LISTS) {
    return Object.assign({}, state, {
      data: action.payload
    });
  }

  if (action.type === TOGGLE_PLAYLIST_SECTION) {
    return Object.assign({}, state, {
      showPlayList: !state.showPlayList
    });
  }
  return state;
}
