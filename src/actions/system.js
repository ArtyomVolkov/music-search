export const SHOW_GLOBAL_SPINNER = 'SHOW_GLOBAL_SPINNER';
export const HIDE_GLOBAL_SPINNER = 'HIDE_GLOBAL_SPINNER';
export const PUSH_MESSAGE = 'PUSH_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

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

export function onPushMessage (msg) {
  return function (dispatch) {
    dispatch(pushMessage(msg));
  }
}

function pushMessage (msg) {
  return {
    type: PUSH_MESSAGE,
    payload: msg
  }
}

export function onRemoveMessage (index) {
  return function (dispatch) {
    dispatch(removeMessage(index));
  }
}

function removeMessage (index) {
  return {
    type: REMOVE_MESSAGE,
    payload: index
  }
}