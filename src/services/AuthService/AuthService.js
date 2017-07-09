import STORE from '../../redux-store/index';
// endpoints
import { onAuthorized, signOut, checkAuthUser } from '../../actions/auth';
import {getCookie} from '../../utils/commons';

// Service Adapter
const AuthService = {
  checkBasicAuth() {
    STORE.dispatch(checkAuthUser())
  },
  authUser(data) {
    STORE.dispatch(onAuthorized(data));
  },
  signOut() {
    STORE.dispatch(signOut());
  },
  checkSocialCookie() {
    const googleCode = getCookie('google');
    if (googleCode) {
      this.socialAuth('google', googleCode);
      return true;
    }

    const facebookCode = getCookie('facebook');
    if (facebookCode) {
      this.socialAuth('facebook', facebookCode);
      return true;
    }

    const vkCode = getCookie('vk');
    if (vkCode) {
      this.socialAuth('vk', vkCode);
      return true;
    }
  }
};

export default AuthService;