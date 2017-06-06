import {SHOW_GLOBAL_SPINNER, HIDE_GLOBAL_SPINNER} from './../actions/system';

const defaultState = {
  spinner: false
};
export default function system(state = defaultState, action) {
  if (action.type === SHOW_GLOBAL_SPINNER) {
    return Object.assign({}, state, {spinner: true});
  }

  if (action.type === HIDE_GLOBAL_SPINNER) {
    return Object.assign({}, state, {spinner: false});
  }

  return state;
}
