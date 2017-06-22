import * as axios from 'axios';
import {
  SEARCH_ARTIST,
  SEARCH_GENRE,
  SEARCH_TRACK,
  ARTIST_TRACKS,
  ARTIST_DATA,
  STREAM,
  SONG_MBID
} from '../settings';

export function searchByArtist (value) {
  return axios.get(`${SEARCH_ARTIST}?query=${value}`);
}

export function searchByGenre (value) {
  return axios.get(`${SEARCH_GENRE}?query=${value}`);
}

export function searchByTrack (value) {
  return axios.get(`${SEARCH_TRACK}?query=${value}`);
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