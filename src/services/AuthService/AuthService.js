import STORE from '../../redux-store/index';
import { login, signOut } from '../../actions/auth';

// Service Adapter
const AuthService = {
  authUser(data) {
    STORE.dispatch(login(data));
  },
  signOut() {
    STORE.dispatch(signOut());
  }
};

export default AuthService;