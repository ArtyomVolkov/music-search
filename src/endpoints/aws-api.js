import * as axios from 'axios';
import { ARTIST_SEARCH, ARTIST_TRACKS, ARTIST_DATA, STREAM, SONG_MBID } from '../settings';

export function searchArtist (value) {
  return axios.get(`${ARTIST_SEARCH}?query=${value}`);
}

export function getArtistTracks(artistId) {
  return axios.get(`${ARTIST_TRACKS}/${artistId}`);
}

export function getArtistImages (artistId) {
  return axios.get(`${ARTIST_DATA}/${artistId}`);
}

export function getSongData(artistId, songMbid) {
  return axios.get(`${SONG_MBID}?artistId=${artistId}&songMbid=${songMbid}`);
}

export function getSongStreamById (songId) {
  return axios.get(`${STREAM}/${songId}`);
}