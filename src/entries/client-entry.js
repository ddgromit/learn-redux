import React from 'react';
import ReactDOM from 'react-dom';
import { finalCreateStore } from 'app/redux';
import reducers from 'app/reducers';
import 'lib/styles/bootstrap';
import AppRoot from 'app/components/AppRoot';

const store = finalCreateStore(reducers);

ReactDOM.render(
  <AppRoot store={store} />,
  document.getElementById('react-container')
);
