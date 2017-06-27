import { FETCH_USER, AUTHORIZED, UNAUTHORIZED } from '../actions/index';

const defaultState = {
  authorization: false,
  user: null
};

export default function auth (state = defaultState, action) {
  switch (action.type) {
    case FETCH_USER:
      return Object.assign({}, state, {
        authorization: true,
        user: action.payload
      });

    case AUTHORIZED:
      return Object.assign({}, state, {
        authorization: true,
        user: action.payload
      });

    case UNAUTHORIZED:
      return defaultState;

    default: return state;
  }
}
