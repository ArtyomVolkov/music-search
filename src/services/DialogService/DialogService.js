import STORE from '../../redux-store/index';
import { openDialog, closeDialog } from '../../actions/dialog';

const DIALOG_SERVICE = {
  onOpen(name, data) {
    STORE.dispatch(openDialog(name, data));
  },
  onClose(name) {
    STORE.dispatch(closeDialog(name));
  }
};

export default DIALOG_SERVICE;