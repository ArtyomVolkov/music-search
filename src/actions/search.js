export const RECEIVE_SONGS = 'RECEIVE_SONGS';

// endpoints
import { searchMusic } from './../endpoints/sound-cloud-api';

export function searchSongs (value) {
  return function (dispatch) {
    searchMusic(value).then((resp) => {
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