import {
  SET_SONG,
  TOGGLE_PLAY,
  SET_PLAYLIST_DATA,
  SET_ERROR_TRACK_ID,
  LOADING_TRACK_STREAM,
  RECEIVE_TRACK_STREAM
} from '../actions/index';

const defaultState = {
  play: false,
  songData: null,
  playList: null,
  soundIndex: -1,
  trackIdError: null,
  streamLoading: false,
  streamId: null
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

    case SET_ERROR_TRACK_ID:
      return Object.assign({}, state, {
        trackIdError: action.payload
      });

    case LOADING_TRACK_STREAM:
      return Object.assign({}, state, {
        streamLoading: true,
        streamId: action.payload
      });

    case RECEIVE_TRACK_STREAM:
      return Object.assign({}, state, {
        streamLoading: false,
        streamId: null
      });

    default:
      return state;
  }
}
