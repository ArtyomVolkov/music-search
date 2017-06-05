export const SET_SONG = 'SET_SONG';
export const SET_NEXT_SONG = 'SET_NEXT_SONG';

export function selectSong (songData, index) {
  return function (dispatch) {
    dispatch(setSong({index, songData}));
  }
}

function setSong (data) {
  return {
    type: SET_SONG,
    payload: data
  }
}

export function setNextSong(soundIndex) {
  return function (dispatch, getState) {
    const state = getState();
    const searchResults = state.searchResults;
    const nextSongData = searchResults.data[soundIndex] || searchResults.data[0];

    dispatch(nextSong());
    dispatch(setSong({
      index: soundIndex,
      songData: nextSongData
    }));
  }
}

function nextSong() {
  return {
    type: SET_NEXT_SONG
  }
}

