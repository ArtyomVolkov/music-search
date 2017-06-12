import * as axios from 'axios';
import { CLOUD_API_TRACKS, CLOUD_API_PLAY_LISTS, CLOUD_API_USER } from './../settings';

export function searchMusic (value) {
  return axios.get(`${CLOUD_API_TRACKS}&q=${value}&limit=10`);
}

export function fetchPlayLists () {
  return axios.get(`${CLOUD_API_PLAY_LISTS}&embeddable_by=me`);
}

export function fetchUser () {
  return axios.get(CLOUD_API_USER);
}