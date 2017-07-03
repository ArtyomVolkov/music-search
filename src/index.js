import React from 'react';
import ReactDOM from 'react-dom';
import STORE from './redux-store/index';
// M-UI theme provider
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// plugins
import injectTapEventPlugin from 'react-tap-event-plugin';
// entry point
import AppRoot from './routes/Root';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <AppRoot store={STORE} />
  </MuiThemeProvider>,
  document.getElementById('app')
);
