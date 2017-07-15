// actions
import {
  SET_SONG,
  SET_PLAYLIST_DATA,
  TOGGLE_PLAY,
  SET_ERROR_TRACK_ID,
  LOADING_TRACK_STREAM,
  RECEIVE_TRACK_STREAM
} from './index';
// endpoints
import { getSongStreamById } from '../endpoints/aws-api';
// other actions
import { onPushMessage, showSpinner, hideSpinner } from './system';

export function selectSong (songData, index, showGlobalSpinner) {
  return function (dispatch) {
    // check song data stream URL
    if (songData.stream_url) {
      dispatch(setSong({ index, songData }));
      return;
    }

    if (showGlobalSpinner) {
      dispatch(showSpinner());
    }
    // load stream URL
    dispatch(setLoadingStream(songData.mbid));

    const streams = songData.streams.map((item)=> {return item.platformTrackId});
    getSongStreamById(streams[0]).then((resp) => {
      dispatch(receiveTrackStream(resp.data));

      if (showGlobalSpinner) {
        dispatch(hideSpinner());
      }

      if (!resp.data) {
        dispatch(onErrorTrackID(songData.mbid));
        dispatch(onPushMessage({
          type: 'error',
          msg: 'Error in loading of song data stream'
        }));
        return;
      }
      songData.stream_url = resp.data;
      dispatch(setSong({ index, songData }));
    });
  }
}

function setSong (data) {
  return {
    type: SET_SONG,
    payload: data
  };
}

export function onTogglePlay () {
  return function (dispatch) {
    dispatch(togglePlay());
  }
}

function togglePlay () {
  return {
    type: TOGGLE_PLAY
  };
}

export function setPlayListData (data) {
  return function (dispatch) {
    dispatch(pushPlaylistData(data));
  }
}

function pushPlaylistData (data) {
  return {
    type: SET_PLAYLIST_DATA,
    payload: data
  };
}

export function onErrorTrackID (trackId) {
  return function (dispatch) {
    dispatch(setErrorTrackId(trackId))
  }
}

function setErrorTrackId (trackId) {
  return {
    type: SET_ERROR_TRACK_ID,
    payload: trackId
  };
}

export function playNext (index, type = 'track', showGlobalSpinner) {
  return function (dispatch, getState) {
    const state = getState();
    let songData = null;

    switch (type) {
      case 'track':
        const tracks = state.searchResults.data || [];
        songData = tracks[ index ] || tracks[ 0 ];
        // clear playlist data
        dispatch(setPlayListData(null));
        break;

      case 'playlist-track':
        const playListTracks = state.player.playList || [];
        songData = playListTracks[ index ] || playListTracks[ 0 ];
        break;

      default:
        break;
    }

    if (songData) {
      dispatch(selectSong(songData, index, showGlobalSpinner));
    }
  }
}

function setLoadingStream (songId) {
  return {
    type: LOADING_TRACK_STREAM,
    payload: songId
  };
}

function receiveTrackStream () {
  return {
    type: RECEIVE_TRACK_STREAM
  };
}
