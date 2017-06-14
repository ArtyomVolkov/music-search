export const RECEIVE_SONGS = 'RECEIVE_SONGS';

// endpoints
import { searchMusic } from '../endpoints/sound-cloud-api';
import { showSpinner, hideSpinner } from './system';

export function searchSongs (value) {
  return function (dispatch) {
    dispatch(showSpinner());
    searchMusic(value).then((resp) => {
      dispatch(hideSpinner());
      dispatch(receiveSongs(resp.data));
    });
  };
}

function receiveSongs (data) {
  return {
    type: RECEIVE_SONGS,
    payload: data
  };
}