import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import myLogger from 'lib/redux-middleware/myLogger';

import 'lib/styles/bootstrap';
import Counter from 'app/components/Counter';
import countingApp from 'app/reducers/countingApp';
import { increment } from 'app/actions/counter';

const middleware = applyMiddleware(myLogger);
let finalCreateStore;
if (__DEVTOOLS__) {
  const { devTools, persistState } = require('redux-devtools');
  finalCreateStore = compose(
    middleware,
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = compose(
    middleware,
  )(createStore);
}

let store = finalCreateStore(countingApp);
store.dispatch(increment());

let debugPanel = null;
if (__DEVTOOLS__) {
  const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
  debugPanel = (
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  );
}

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Counter />
    </Provider>
    { debugPanel }
  </div>,
  document.getElementById('react-container')
);
