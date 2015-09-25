import React from 'react';
import getRoutes from 'app/routes';
import { createHistory } from 'history';
import { reduxReactRouter } from 'redux-router';
import { createStore, compose } from 'redux';

let finalCreateStore;
if (__DEVTOOLS__) {
  const { devTools, persistState } = require('redux-devtools');
  finalCreateStore = compose(
    reduxReactRouter({
      getRoutes,
      createHistory,
    }),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = compose(
    reduxReactRouter({
      getRoutes,
      createHistory,
    }),
  )(createStore);
}

function createDebugPanel(store) {
  if (__DEVTOOLS__) {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
    return (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
  } else {
    return null;
  }
}


export {
  finalCreateStore,
  createDebugPanel,
};
