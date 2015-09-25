import React from 'react';
import { createDebugPanel } from 'app/redux';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

export default function AppRoot(props) {
  return (
    <div>
      <Provider store={props.store}>
        <ReduxRouter />
      </Provider>
      { createDebugPanel(props.store) }
    </div>
  );
}
