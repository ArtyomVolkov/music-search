import STORE from '../../redux-store/index';
// endpoints
import { onAuthorized, signOut } from '../../actions/auth';
import { socialAuthorization } from '../../endpoints/aws-api';
// settings
import { SOCIAL_AUTH_CONFIG } from '../../settings';
// utils
import { setCookie } from '../../utils/commons';

const SocialAuthService = {
  google: {
    onLoad() {
      window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
          apiKey: SOCIAL_AUTH_CONFIG.google.secret,
          clientId: SOCIAL_AUTH_CONFIG.google.appId,
          scope: 'email'
        })
      });
    },
    onInit() {
      window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
          apiKey: SOCIAL_AUTH_CONFIG.google.secret,
          clientId: SOCIAL_AUTH_CONFIG.google.appId,
          scope: 'email'
        }).then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance();

          if (!authInstance.isSignedIn.Ab) {
            return
          }

          const auth = authInstance.currentUser.Ab;
          STORE.dispatch(onAuthorized({
            user: {
              username: auth.w3.getName(),
              imageURL: auth.w3.getImageUrl(),
              fromSocial: 'google'
            }
          }));
        });
      });
    },
    onSignIn() {
      if (!window.gapi.client) {
        window.gapi.load('client:auth2', () => {
          window.gapi.client.init({
            apiKey: SOCIAL_AUTH_CONFIG.google.secret,
            clientId: SOCIAL_AUTH_CONFIG.google.appId,
            scope: 'email'
          }).then(() => {
            window.gapi.auth2.getAuthInstance().signIn()
              .then((authData) => {
                return socialAuthorization(authData.Zi.access_token);
              });
          });
        });
        return;
      }

      return window.gapi.auth2.getAuthInstance().signIn()
        .then((authData) => {
          return socialAuthorization(authData.Zi.access_token);
        });
    },
    onSignOut() {
      // clear cookie (set other value)
      setCookie('_SAN', '');
      window.gapi.auth2.getAuthInstance().signOut().then(() => {
        STORE.dispatch(signOut());
      });
    }
  }
};

export default SocialAuthService;