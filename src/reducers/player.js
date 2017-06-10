import { SET_SONG, SET_PLAYLIST_DATA, TOGGLE_PLAYLIST_SECTION} from './../actions/player';

const defaultState = {
  play: false,
  songData: null,
  playList: null,
  soundIndex: 0
};
export default function player (state = defaultState, action) {
  if (action.type === SET_SONG) {
    return Object.assign({}, state, {
      play: true,
      songData: action.payload.songData,
      soundIndex: action.payload.index
    });
  }

  if (action.type === SET_PLAYLIST_DATA) {
    console.log('set playlist');
    return Object.assign({}, state, {
      play: true,
      playList: action.payload,
      songData: action.payload.songData,
    });
  }

  return state;
}
