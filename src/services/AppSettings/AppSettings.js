import {DEFAULT_VOLUME, PLAY_NEXT, AUTO_UPDATE_TRACK_BAR, TRACK_LIMIT} from '../../settings';

const APP_SETTINGS = {
  account: {
    showFriends: false,
    showMessages: false,
    useStatistic: true
  },
  player: {
    volume: DEFAULT_VOLUME,
    playNext: PLAY_NEXT,
    updateTrackBar: AUTO_UPDATE_TRACK_BAR
  },
  search: {
    limit: TRACK_LIMIT
  }
};

const Settings_SRV = {
  getValue(name, key) {
    if (APP_SETTINGS[name]) {
      return APP_SETTINGS[name][key];
    }
    return null;
  },
  getDefaultValue(key) {

  },
  setValue(name, key, value) {
    if (APP_SETTINGS[name]) {
      APP_SETTINGS[name][key] = value;
      return value;
    }
    return null;
  }
};

export default Settings_SRV;

