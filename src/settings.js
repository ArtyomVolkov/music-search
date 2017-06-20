const USER_ID = '283153904';
// for sound cloud API
export const CLIENT_ID = '2t9loNQH90kzJcsFCODdigxfp325aq4z';
export const CLOUD_API_USER = `http://api.soundcloud.com/users/${USER_ID}?client_id=${CLIENT_ID}`;
export const CLOUD_API_TRACKS = `https://api.soundcloud.com/tracks/?client_id=${CLIENT_ID}`;
export const CLOUD_API_PLAY_LISTS = `https://api.soundcloud.com/users/${USER_ID}/playlists?client_id=${CLIENT_ID}`;

// AWS api
const SERVER_URL = 'http://ec2-52-14-232-217.us-east-2.compute.amazonaws.com:9999';
export const ARTIST_SEARCH = `${SERVER_URL}/artist/search`;
export const ARTIST_DATA = `${SERVER_URL}/artist`;
// AWS Tracks
export const ARTIST_TRACKS = `${SERVER_URL}/track/top`;
// Stream
export const STREAM = `${SERVER_URL}/stream`;
export const SONG_MBID = `${SERVER_URL}/stream/song`;

// Other
export const NO_DATA = 'N/A';
export const MESSAGE_DURATION_TIME = 3000;
// Player
export const DEFAULT_VOLUME = 0.7;
export const SONG_IMG_URL = 'http://www.freeiconspng.com/uploads/audio-file-format-mp3-icon-33.png';