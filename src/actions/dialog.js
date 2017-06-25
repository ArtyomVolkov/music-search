// actions
import { OPEN_DIALOG, CLOSE_DIALOG } from './index';

export function openDialog (name, data = null) {
  return {
    type: OPEN_DIALOG,
    payload: {
      name: name,
      data: data
    }
  };
}

export function closeDialog (name) {
  return {
    type: CLOSE_DIALOG,
  };
}