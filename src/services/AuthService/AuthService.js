import STORE from '../../redux-store/index';
// endpoints
import { socialAuthorization } from './../../endpoints/aws-api';
import { onAuthorized, signOut } from '../../actions/auth';

// Service Adapter
const AuthService = {
  authUser(data) {
    STORE.dispatch(onAuthorized(data));
  },
  signOut() {
    STORE.dispatch(signOut());
  },
  socialAuth(socialName, code) {
    socialAuthorization(socialName, code)
      .then((resp) => {
        STORE.dispatch(
          onAuthorized(
            Object.assign(resp.data, {username: 'social user'})
          )
        );
      })
      .catch((err) => {
        console.error(err.message);
      });
  }
};

export default AuthService;