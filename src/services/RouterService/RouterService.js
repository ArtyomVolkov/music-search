import { browserHistory } from 'react-router'

const RouterService = {
  navigate(page){
    browserHistory.push(page);
  },
  goBack() {
    browserHistory.goBack();
  },
  forward() {
    browserHistory.goForward();
  },
  getCurrentPageName() {
    return browserHistory.getCurrentLocation().pathname;
  }
};

export default RouterService;
