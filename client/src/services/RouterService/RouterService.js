import { hashHistory } from 'react-router'

const RouterService = {
  navigate(page){
    hashHistory.push(page);
  },
  goBack() {
    hashHistory.goBack();
  },
  forward() {
    hashHistory.goForward();
  },
  getCurrentPageName() {
    return hashHistory.getCurrentLocation().pathname;
  }
};

export default RouterService;
