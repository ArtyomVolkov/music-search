const USER_ID = '283153904';
// for sound cloud API
export const CLIENT_ID = '2t9loNQH90kzJcsFCODdigxfp325aq4z';
export const CLOUD_API_USER = `http://api.soundcloud.com/users/${USER_ID}?client_id=${CLIENT_ID}`;
export const CLOUD_API_TRACKS = `https://api.soundcloud.com/tracks/?client_id=${CLIENT_ID}`;
export const CLOUD_API_PLAY_LISTS = `https://api.soundcloud.com/users/${USER_ID}/playlists?client_id=${CLIENT_ID}`;

// AWS api
export const SERVER_URL = 'http://ec2-52-14-232-217.us-east-2.compute.amazonaws.com:9999/api/v1';
export const ARTIST_SEARCH = `${SERVER_URL}/artist/search`;
export const ARTIST_DATA = `${SERVER_URL}/artist`;
// Auth
export const USER_REGISTRATION = `${SERVER_URL}/registrations/users`;
export const USER_LOGIN = `${SERVER_URL}/authentication`;
export const SOCIAL_LOGIN = `${SERVER_URL}/redirects/`;
export const REFRESH_AUTH = `${SERVER_URL}/authentication/refresh`;
export const COUNTRIES = `${SERVER_URL}/countries`;
// Social AUTH config
export const SOCIAL_AUTH_CONFIG = {
  vk: {
    appId: '6081850',
    secret: 'eSzJuWX4pC6yGABONqtE'
  },
  google: {
    appId: '737760204259-lohfeoudb15s2bjfh61ek7bssf6npmv3.apps.googleusercontent.com',
    secret: 'W3AU2StLs7wQJYf08X0OYk-3'
  }
};
// Search Music
export const SEARCH_ARTIST = `${SERVER_URL}/search/artist`;
export const SEARCH_GENRE = `${SERVER_URL}/search/genre`;
export const SEARCH_TRACK = `${SERVER_URL}/search/track`;

// AWS Tracks
export const ARTIST_TRACKS = `${SERVER_URL}/track/top`;
// Stream
export const STREAM = `${SERVER_URL}/stream`;
export const SONG_MBID = `${SERVER_URL}/stream/song`;

// Other
export const NO_DATA = 'N/A';
export const MESSAGE_DURATION_TIME = 3000;
export const DATE_FORMAT = 'YYYY-MM-DD';
// Drawer
export const LOGO_APP_URL = 'http://findicons.com/files/icons/1198/agua_onyx_folders/128/music_folder_badged.png';
// Player
export const DEFAULT_VOLUME = 0.7;
export const PLAY_NEXT = true;
export const AUTO_UPDATE_TRACK_BAR = 200; // ms
export const SONG_IMG_URL = 'http://findicons.com/files/icons/2455/web_icons/48/music.png';
// Search
export const TRACK_LIMIT = 20;
// User Section
export const USER_IMG_DEFAULT = 'https://thumbs.dreamstime.com/t/human-head-headphones-vector-illustration-63700471.jpg';