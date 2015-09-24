import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { Route } from 'react-router';
import { createHistory } from 'history';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';

import 'lib/styles/bootstrap';
import Counter from 'app/components/Counter';
import HelloWorld from 'app/components/HelloWorld';
import countingApp from 'app/reducers/countingApp';
import { increment } from 'app/actions/counter';

const routes = (
  <Route path="">
    <Route path="/counter" component={Counter} />
    <Route path="/hello" component={HelloWorld} />
  </Route>
);

const middleware = applyMiddleware();
let finalCreateStore;
if (__DEVTOOLS__) {
  const { devTools, persistState } = require('redux-devtools');
  finalCreateStore = compose(
    middleware,
    reduxReactRouter({
      routes,
      createHistory,
    }),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = compose(
    middleware,
    reduxReactRouter({
      routes,
      createHistory,
    }),
  )(createStore);
}

const reducer = combineReducers({
  counting: countingApp,
  router: routerStateReducer,
});
const store = finalCreateStore(reducer);
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
      <ReduxRouter />
    </Provider>
    { debugPanel }
  </div>,
  document.getElementById('react-container')
);
