// actions
import { RECEIVE_SONGS, LOAD_MORE_TRACKS } from './index';

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
      return;
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

export function loadMoreTracks(value, page) {
	return function (dispatch) {
		dispatch(loadMore());
		searchByTrack(value, page).then((resp) => {

		});
	}
}

function loadMore() {
	return {
		type: LOAD_MORE_TRACKS
	}
}

function receiveMoreResults() {
	return {
		type: ''
	}
}