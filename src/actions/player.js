export const SET_SONG = 'SET_SONG';
export const SET_NEXT_SONG = 'SET_NEXT_SONG';
export const SET_PLAYLIST_DATA = 'SET_PLAYLIST_DATA';
export const TOGGLE_PLAY = 'TOGGLE_PLAY';
export const SET_ERROR_TRACK_ID = 'SET_ERROR_TRACK_ID';

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
    const nextSongData = playList
      ? playList[ soundIndex ] || playList[ 0 ]
      : searchResults.data[ soundIndex ] || searchResults.data[ 0 ];

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

