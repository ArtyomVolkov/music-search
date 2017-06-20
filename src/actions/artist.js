// endpoints
import { getArtistTracks, getSongData, getSongStreamById } from '../endpoints/aws-api';
// player actions
import { selectSong } from './player';
// system actions
import { showSpinner, hideSpinner, onPushMessage } from './system';

export const RECEIVE_ARTIST_DATA = 'RECEIVE_ARTIST_DATA';

export function getAtristData (artistId) {
  return function (dispatch) {
    dispatch(showSpinner());
    getArtistTracks(artistId).then((result) => {
      dispatch(hideSpinner());
      dispatch(receiveArtistData(result.data));
    });
  }
}

function receiveArtistData (data) {
  return {
    type: RECEIVE_ARTIST_DATA,
    payload: data
  };
}

export function getArtistSongData (artistId, songMbid, index) {
  return function (dispatch) {
    dispatch(showSpinner());
    getSongData(artistId, songMbid).then((songDataResp) => {
      const songData = songDataResp.data;

      getSongStreamById(songDataResp.data.id).then((stream) => {
        songData.stream_url = stream.data;
        dispatch(selectSong(songData, index));
        dispatch(hideSpinner());
      }).catch((err) => {
        dispatch(onPushMessage({type: 'error', msg: 'Error in loading of song data stream'}));
        dispatch(hideSpinner());
      });
    })
  }
}