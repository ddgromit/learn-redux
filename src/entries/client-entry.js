import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import myLogger from 'lib/redux-middleware/myLogger';

import 'lib/styles/bootstrap';
import Counter from 'app/components/Counter';
import countingApp from 'app/reducers/countingApp';
import { increment } from 'app/actions/counter';

let finalCreateStore = compose(
  applyMiddleware(myLogger),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);
let store = finalCreateStore(countingApp);
store.dispatch(increment());

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Counter />
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
  document.getElementById('react-container')
);
