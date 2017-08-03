import * as axios from 'axios';
import {
  SEARCH_ARTIST,
  SEARCH_GENRE,
  SEARCH_TRACK,
  ARTIST_TRACKS,
  ARTIST_DATA,
  STREAM,
  SONG_MBID,
  USER_REGISTRATION,
  USER_LOGIN,
  SOCIAL_LOGIN,
  REFRESH_AUTH,
  SERVER_URL,
  COUNTRIES
} from '../settings';

export function searchByArtist (value) {
  return axios.get(`${SEARCH_ARTIST}?query=${value}`);
}

export function searchByGenre (value) {
  return axios.get(`${SEARCH_GENRE}?query=${value}`);
}

export function searchByTrack (value, page = 0) {
  return axios.get(`${SEARCH_TRACK}?query=${value}&page=${page}`);
}

export function getArtistTracks (artistId) {
  return axios.get(`${ARTIST_TRACKS}/${artistId}`);
}

export function getArtistImages (artistId) {
  return axios.get(`${ARTIST_DATA}/${artistId}`);
}

export function getSongData (artistId, songMbid) {
  return axios.get(`${SONG_MBID}?artistId=${artistId}&songMbid=${songMbid}`);
}

export function getSongStreamById (songId) {
  return axios.get(`${STREAM}/${songId}`);
}

/*
 * Authorization
 */
export function userRegistration (data) {
  return axios.post(USER_REGISTRATION, data);
}
export function authUser (credentials) {
  return axios.post(USER_LOGIN, credentials);
}
export function getSocialLogin (socialName) {
  return axios.get(SOCIAL_LOGIN + socialName);
}
export function refreshAuth (data) {
  return axios.post(REFRESH_AUTH, data);
}
export function socialAuthorization (socialName, accessToken) {
  return axios.post(`${SERVER_URL}/authentication/${socialName}?accessToken=${accessToken}`);
}

export function getCountries () {
  return axios.get(COUNTRIES);
}