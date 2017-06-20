import { OPEN_DIALOG, CLOSE_DIALOG } from '../actions/dialog';

const defaultState = {
  open: false,
  name: '',
  data: null
};

export default function dialog (state = defaultState, action) {
  switch (action.type) {
    case OPEN_DIALOG:
      return Object.assign({}, state, {
        open: true,
        name: action.payload.name,
        data: action.payload.data
      });

    case CLOSE_DIALOG:
      return Object.assign({}, state, {open: false});

    default:
      return state;
  }
}