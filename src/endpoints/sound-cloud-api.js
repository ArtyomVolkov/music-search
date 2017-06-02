import * as axios from 'axios';
import {CLIENT_ID, CLOUD_API_TRACKS} from './../settings';

export function searchMusic (value) {
  return axios.get(`${CLOUD_API_TRACKS}?client_id=${CLIENT_ID}&q=${value}&limit=10`);
}