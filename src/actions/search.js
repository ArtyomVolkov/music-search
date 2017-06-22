export const RECEIVE_SONGS = 'RECEIVE_SONGS';

// endpoints
import { searchByArtist, searchByGenre, searchByTrack } from '../endpoints/aws-api';
import { showSpinner, hideSpinner } from './system';

export function searchBy (value, searchType) {
  return function (dispatch) {
    dispatch(showSpinner());

    if (searchType === 'ARTIST') {
      searchByArtist(value).then((resp) => {
        dispatch(receiveSongData(searchType, resp.data));
        dispatch(hideSpinner());
      });
      return;
    }

    if (searchType === 'GENRE') {
      searchByGenre(value).then((resp) => {
        dispatch(receiveSongData(searchType, resp.data));
        dispatch(hideSpinner());
      });
      return;
    }

    if (searchType === 'TRACK') {
      searchByTrack(value).then((resp) => {
        dispatch(receiveSongData(searchType, resp.data));
        dispatch(hideSpinner());
      });
    }
    dispatch(hideSpinner());
  };
}

function receiveSongData (type, data) {
  return {
    type: RECEIVE_SONGS,
    payload: { type, data }
  };
}