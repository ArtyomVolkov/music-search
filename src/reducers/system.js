import {
  SHOW_GLOBAL_SPINNER,
  HIDE_GLOBAL_SPINNER,
  PUSH_MESSAGE
} from '../actions/index';

const defaultState = {
  spinner: false,
  message: {}
};
export default function system (state = defaultState, action) {
  if (action.type === SHOW_GLOBAL_SPINNER) {
    return Object.assign({}, state, { spinner: true });
  }

  if (action.type === HIDE_GLOBAL_SPINNER) {
    return Object.assign({}, state, { spinner: false });
  }

  if (action.type === PUSH_MESSAGE) {
    return Object.assign({}, state, {message: action.payload});
  }

  return state;
}
