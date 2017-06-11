import {RECEIVE_PLAY_LISTS, TOGGLE_PLAYLIST_SECTION, SET_ACTIVE_INDEX} from './../actions/playlists';

const defaultState = {
  data: null,
  showPlayList: false,
  activeIndex: null
};
export default function playLists(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_PLAY_LISTS:
      return Object.assign({}, state, {
        data: action.payload
      });

    case TOGGLE_PLAYLIST_SECTION:
      return Object.assign({}, state, {
        showPlayList: !state.showPlayList
      });

    case SET_ACTIVE_INDEX:
      return Object.assign({}, state, {
        activeIndex: action.payload
      });

    default:
      return state;
  }
}
