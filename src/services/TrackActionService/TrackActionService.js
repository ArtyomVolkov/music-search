import DIALOG_SERVICE from '../DialogService/DialogService';

const TRACK_ACTION_SERVICE = {
  toPlayList(track) {
    DIALOG_SERVICE.onOpen('to-playlist', {tracks: [track]});
  },
  toFavorite(track) {
    console.log(track);
  },
  onDownload(track) {
    if (track.stream_url) {
      window.open(track.stream_url, '_self');
    }
  },
  onEdit(track) {
    DIALOG_SERVICE.onOpen('on-edit-track', {track: track});
  }
};

export default TRACK_ACTION_SERVICE;