import React from 'react';
import ReactDOM from 'react-dom';
import Counter from 'app/components/Counter';
import 'lib/styles/bootstrap';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import countingApp from 'app/reducers/countingApp';
import { increment } from 'app/actions/counter';

let store = createStore(countingApp);
store.subscribe(() => {
  console.log('New State', store.getState());
});
console.log(store.getState());
console.log(store.dispatch(increment()));
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('react-container')
);
