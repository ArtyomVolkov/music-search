// actions
import {
  SET_SONG,
  SET_NEXT_SONG,
  SET_PLAYLIST_DATA,
  TOGGLE_PLAY,
  SET_ERROR_TRACK_ID,
  LOADING_TRACK_STREAM,
  RECEIVE_TRACK_STREAM
} from './index';

import {getSongStreamById} from '../endpoints/aws-api';

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

export function setNextSong (soundIndex) {
  return function (dispatch, getState) {
    const state = getState();
    const searchResults = state.searchResults;
    const playList = state.player.playList;
    let nextSongData = playList
      ? playList[ soundIndex ] || playList[0]
      : searchResults.data[ soundIndex ] || searchResults.data[0];

    if (playList) {
      nextSongData = playList[ soundIndex ] || playList[0];
    } else {
      if (searchResults.type === 'TRACK' && searchResults.data.length) {
        nextSongData = searchResults.data[ soundIndex ] || searchResults.data[0];
      }
    }

    dispatch(nextSong());
    dispatch(setSong({
      index: soundIndex,
      songData: nextSongData
    }));
  }
}

function nextSong () {
  return {
    type: SET_NEXT_SONG
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

export function loadingSongStream (songId) {
  return function (dispatch) {
    dispatch(setLoadingStream());

    getSongStreamById(songId).then((resp) => {
      dispatch(receiveTrackStream(resp.data));
    });
  }
}

function setLoadingStream () {
  return {
    type: LOADING_TRACK_STREAM
  };
}

function receiveTrackStream (url) {
  return {
    type: RECEIVE_TRACK_STREAM,
    payload: url
  };
}
