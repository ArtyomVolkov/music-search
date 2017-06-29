// actions
import { FETCH_USER, AUTHORIZED, UNAUTHORIZED } from './index';
// endpoints
import { fetchUser } from '../endpoints/sound-cloud-api';
import { refreshAuth } from '../endpoints/aws-api';
// utils
import { setSessionData, getSessionData, clearSessionData } from '../utils/commons';

const UNAUTHORIZED_CODE = 401;

export function getUser () {
  return function (dispatch) {
    fetchUser().then((response) => {
      dispatch(fetchUserData(response.data));
    });
  }
}

function fetchUserData (data) {
  return {
    type: FETCH_USER,
    payload: data
  };
}

export function checkAuthUser () {
  return function (dispatch) {
    const sessionData = getSessionData();

    // check refreshToken is exists and is valid
    if (!sessionData.refreshToken) {
      return;
    }

    refreshAuth({refreshToken: sessionData.refreshToken})
    .then((resp) => {
      dispatch(authorized({
        username: sessionData.username
      }));
      setSessionData(Object.assign(resp.data));
    })
    .catch((err) => {
      if (err.response.status === UNAUTHORIZED_CODE) {
        dispatch(signOut());
      }
    });
  }
}

export function onAuthorized (credentials) {
  return function (dispatch) {
    dispatch(authorized({
      username: credentials.username
    }));
    setSessionData(credentials);
  }
}

function authorized (data) {
  return {
    type: AUTHORIZED,
    payload: data
  };
}


export function signOut () {
  return function (dispatch) {
    dispatch(unauthorized());
    clearSessionData();
  }
}

function unauthorized () {
  return {
    type: UNAUTHORIZED
  };
}