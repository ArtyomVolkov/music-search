import { SET_SONG, SET_PLAYLIST_DATA, TOGGLE_PLAY} from '../actions/player';

const defaultState = {
  play: false,
  songData: null,
  playList: null,
  soundIndex: 0
};

export default function player (state = defaultState, action) {
  switch (action.type) {
    case SET_SONG:
      return Object.assign({}, state, {
        play: true,
        songData: action.payload.songData,
        soundIndex: action.payload.index
      });

    case SET_PLAYLIST_DATA:
      return Object.assign({}, state, {
        playList: action.payload
      });

    case TOGGLE_PLAY:
      return Object.assign({}, state, {
        play: !state.play,
      });

    default:
      return state;
  }
}
