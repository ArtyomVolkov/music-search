import STORE from '../../redux-store/index';
import { onPushMessage } from '../../actions/system';

const MSG_SRV = {
  pushMessage(msgData) {
    STORE.dispatch(onPushMessage(msgData));
  }
};

export default MSG_SRV;