import {SET_SONG} from './../actions/player';

const defaultState = {
  play: false,
  songData: null,
  soundIndex: 0
};
export default function player(state = defaultState, action) {
  if (action.type === SET_SONG) {
    return Object.assign({}, state, {
      play: true,
      songData: action.payload.songData,
      soundIndex: action.payload.index
    });
  }
  return state;
}
