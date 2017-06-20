export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

/*
 * Action functions for dispatch events, without binding components
 */
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