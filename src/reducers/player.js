import {SET_SONG} from './../actions/player';

const defaultState = {
  play: false,
  songData: null
};
export default function player(state = defaultState, action) {
  if (action.type === SET_SONG) {
    console.log(action.payload);
    return Object.assign({}, state, {
      play: true,
      songData: action.payload
    });
  }
  return state;
}
