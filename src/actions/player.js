// actions
import {
  SET_SONG,
  SET_PLAYLIST_DATA,
  TOGGLE_PLAY,
  SET_ERROR_TRACK_ID,
  LOADING_TRACK_STREAM,
  RECEIVE_TRACK_STREAM
} from './index';
// endpoints
import { getSongStreamById } from '../endpoints/aws-api';
// other actions
import { onPushMessage } from './system';

export function selectSong (songData, index) {
  return function (dispatch) {
    dispatch(setSong({ index, songData }));
  }
}

function setSong (data) {
  return {
    type: SET_SONG,
    payload: data
  };
}

export function onTogglePlay () {
  return function (dispatch) {
    dispatch(togglePlay());
  }
}

function togglePlay () {
  return {
    type: TOGGLE_PLAY
  };
}

export function setPlayListData (data) {
  return function (dispatch) {
    dispatch(pushPlaylistData(data));
  }
}

function pushPlaylistData (data) {
  return {
    type: SET_PLAYLIST_DATA,
    payload: data
  };
}

export function onErrorTrackID (trackId) {
  return function (dispatch) {
    dispatch(setErrorTrackId(trackId))
  }
}

function setErrorTrackId (trackId) {
  return {
    type: SET_ERROR_TRACK_ID,
    payload: trackId
  };
}

export function playNext (index) {
  return function (dispatch, getState) {
    const state = getState();
    const searchResults = state.searchResults;

    if (searchResults.type !== 'TRACK' || !searchResults.data.length) {
      return;
    }
    const songData = searchResults.data[ index ] || searchResults.data[ 0 ];

    dispatch(setLoadingStream(songData.id));
    getSongStreamById(songData.id).then((resp) => {
      if (resp.data) {
        songData.stream_url = resp.data;
        dispatch(receiveTrackStream(resp.data));
        dispatch(selectSong(songData, index));
      } else {
        dispatch(receiveTrackStream());
        dispatch(onPushMessage({
          type: 'error',
          msg: 'Error in loading of song data stream'
        }));
        dispatch(onErrorTrackID(songData.id));
      }
    });
  }
}

function setLoadingStream (songId) {
  return {
    type: LOADING_TRACK_STREAM,
    payload: songId
  };
}

function receiveTrackStream () {
  return {
    type: RECEIVE_TRACK_STREAM
  };
}
