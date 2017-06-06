export const SHOW_GLOBAL_SPINNER = 'SHOW_GLOBAL_SPINNER';
export const HIDE_GLOBAL_SPINNER = 'HIDE_GLOBAL_SPINNER';

export function onToggleGlobalSpinner(flag = false) {
  return function (dispatch) {
    dispatch(flag ? showSpinner() : hideSpinner());
  }
}

export function showSpinner () {
  return {
    type: SHOW_GLOBAL_SPINNER
  }
}

export function hideSpinner () {
  return {
    type: HIDE_GLOBAL_SPINNER
  }
}