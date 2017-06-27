// actions
import { FETCH_USER, AUTHORIZED, UNAUTHORIZED } from './index';
// endpoints
import { fetchUser } from '../endpoints/sound-cloud-api';
import { authUser } from '../endpoints/aws-api';
// utils
import { setSessionData, getSessionData, clearSessionData } from '../utils/commons';

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

    if (sessionData.accessToken && sessionData.username) {
      dispatch(authorized({
        username: sessionData.username
      }));
    }
  }
}

export function login (credentials) {
  return function (dispatch) {
    authUser(credentials).then((resp) => {
      dispatch(authorized({
        username: credentials.username
      }));
      setSessionData(Object.assign(resp.data, { username: credentials.username }));
    }).catch((err) => {
      console.log(err);
    });
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