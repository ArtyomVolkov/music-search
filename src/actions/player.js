export const SET_SONG = 'SET_SONG';

export function selectSong (songData) {
  return function (dispatch) {
    dispatch(setSong(songData));
  }
}
function setSong (songData) {
  return {
    type: SET_SONG,
    payload: songData
  }
}

