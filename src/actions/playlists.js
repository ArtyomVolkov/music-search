// actions
import {
  RECEIVE_PLAY_LISTS,
  TOGGLE_PLAYLIST_SECTION,
  SET_ACTIVE_INDEX
} from './index';

// endpoints
import { fetchPlayLists } from '../endpoints/sound-cloud-api';
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

export function onTogglePlayList () {
  return function (dispatch) {
    dispatch(togglePlayList());
  }
}

function togglePlayList () {
  return {
    type: TOGGLE_PLAYLIST_SECTION
  }
}

export function setActivePlaylist (index) {
  return function (dispatch) {
    dispatch(setActive(index));
  }
}

function setActive (index) {
  return {
    type: SET_ACTIVE_INDEX,
    payload: index
  }
}