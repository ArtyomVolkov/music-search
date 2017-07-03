import STORE from '../../redux-store/index';
// endpoints
import { socialAuthorization } from './../../endpoints/aws-api';
import { onAuthorized, signOut } from '../../actions/auth';
import { showSpinner, hideSpinner, onPushMessage } from '../../actions/system';

// Service Adapter
const AuthService = {
  authUser(data) {
    STORE.dispatch(onAuthorized(data));
  },
  signOut() {
    STORE.dispatch(signOut());
  },
  socialAuth(socialName, code) {
    STORE.dispatch(showSpinner());
    socialAuthorization(socialName, code)
      .then((resp) => {
        STORE.dispatch(hideSpinner());
        STORE.dispatch(
          onAuthorized(
            Object.assign(resp.data, { username: 'social user' })
          )
        );
      })
      .catch((err) => {
        STORE.dispatch(hideSpinner());
        STORE.dispatch(onPushMessage({
          type: 'error',
          msg: 'Social authorization error'
        }));
      });
  },
  setSocialCookie(socialName, code) {
    document.cookie = `${socialName}=${code};path=/`;
  },
  getCookie(name) {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[ 1 ]) : undefined;
  },
  checkSocialCookie() {
    const googleCode = this.getCookie('google');
    if (googleCode) {
      this.socialAuth('google', googleCode);
      return true;
    }

    const facebookCode = this.getCookie('facebook');
    if (facebookCode) {
      this.socialAuth('facebook', facebookCode);
      return true;
    }

    const vkCode = this.getCookie('vk');
    if (vkCode) {
      this.socialAuth('vk', vkCode);
      return true;
    }
  }
};

export default AuthService;