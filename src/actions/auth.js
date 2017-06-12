export const FETCH_USER = 'FETCH_USER';

// endpoints
import { fetchUser } from '../endpoints/sound-cloud-api';

export function getUser () {
  return function (dispatch) {
    console.log('fetch user');
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