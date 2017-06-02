// For sound cloud API
const SOUND_CLOUD_CLIENT_ID = '2t9loNQH90kzJcsFCODdigxfp325aq4z'; // MY client id
const mockData = [
  {
    band: 'The offspring',
    song: "The Kids Aren't Alright",
    img: 'http://offspring.com/o/style/og_skull.png',
    stream: `https://api.soundcloud.com/tracks/149899418/stream?client_id=${SOUND_CLOUD_CLIENT_ID}`
  },
  {
    band: 'Linkin Park',
    song: 'In the end',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/LPLogo-black.svg/200px-LPLogo-black.svg.png',
    stream: `https://api.soundcloud.com/tracks/219074813/stream?client_id=${SOUND_CLOUD_CLIENT_ID}`
  },
  {
    band: 'Scorpions',
    song: 'Wind of change',
    img: 'https://images-na.ssl-images-amazon.com/images/I/51c0kO8DPbL.jpg',
    stream: `https://api.soundcloud.com/tracks/49668842/stream?client_id=${SOUND_CLOUD_CLIENT_ID}`
  }
];

export default mockData;
