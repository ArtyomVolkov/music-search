export const RECEIVE_PLAY_LISTS = 'RECEIVE_PLAY_LISTS';

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