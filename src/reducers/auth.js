import { FETCH_USER } from '../actions/index';

const defaultState = {
  authorization: false,
  user: null
};

export default function auth (state = defaultState, action) {
  if (action.type === FETCH_USER) {
    return Object.assign({}, state, {
      authorization: true,
      user: action.payload
    });
  }
  return state;
}
