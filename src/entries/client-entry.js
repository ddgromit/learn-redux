import React from 'react';
import ReactDOM from 'react-dom';
import { finalCreateStore, createDebugPanel } from 'app/redux';
import reducers from 'app/reducers';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import 'lib/styles/bootstrap';

const store = finalCreateStore(reducers);

ReactDOM.render(
  <div>
    <Provider store={store}>
      <ReduxRouter />
    </Provider>
    { createDebugPanel(store) }
  </div>,
  document.getElementById('react-container')
);
