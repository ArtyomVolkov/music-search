import * as axios from 'axios';
import { CLIENT_ID, CLOUD_API_TRACKS, CLOUD_API_PLAY_LISTS } from './../settings';

export function searchMusic (value) {
  return axios.get(`${CLOUD_API_TRACKS}?client_id=${CLIENT_ID}&q=${value}&limit=10`);
}

export function fetchPlayLists () {
  return axios.get(`${CLOUD_API_PLAY_LISTS}?client_id=${CLIENT_ID}&embeddable_by=me`);
}