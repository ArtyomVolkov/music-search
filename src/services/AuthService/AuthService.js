import STORE from '../../redux-store/index';
import { onAuthorized, signOut } from '../../actions/auth';

// Service Adapter
const AuthService = {
  authUser(data) {
    STORE.dispatch(onAuthorized(data));
  },
  signOut() {
    STORE.dispatch(signOut());
  }
};

export default AuthService;