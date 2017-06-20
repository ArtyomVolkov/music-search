export const RECEIVE_SONGS = 'RECEIVE_SONGS';

// endpoints
import { searchArtist } from '../endpoints/aws-api';
import { showSpinner, hideSpinner } from './system';

export function searchSongs (value) {
  return function (dispatch) {
    dispatch(showSpinner());

    searchArtist(value).then((resp) => {
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