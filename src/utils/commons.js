export function setSessionData (data) {
  if (!data || !data.accessToken || !data.refreshToken) {
    return;
  }

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      sessionStorage.setItem(key, data[key]);
    }
  }
}

export function getSessionData () {
  return {
    accessToken: sessionStorage.getItem('accessToken'),
    refreshToken: sessionStorage.getItem('refreshToken'),
    username: sessionStorage.getItem('username')
  };
}

export function clearSessionData () {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('username');
}