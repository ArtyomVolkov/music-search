export const RECEIVE_PLAY_LISTS = 'RECEIVE_PLAY_LISTS';
export const TOGGLE_PLAYLIST_SECTION = 'TOGGLE_PLAYLIST_SECTION';

// endpoints
import { fetchPlayLists } from './../endpoints/sound-cloud-api';
import { showSpinner, hideSpinner } from './system';

export function getPlayLists () {
  return function (dispatch) {
    dispatch(showSpinner());
    fetchPlayLists().then((response) => {
      dispatch(hideSpinner());
      dispatch(receivePlayLists(response.data));
    });
  }
}

function receivePlayLists (data) {
  return {
    type: RECEIVE_PLAY_LISTS,
    payload: data
  };
}

export function onTogglePlayList() {
  return function (dispatch) {
    dispatch(togglePlayList());
  }
}

function togglePlayList() {
  return {
    type: TOGGLE_PLAYLIST_SECTION
  }
}