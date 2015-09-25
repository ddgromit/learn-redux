import React from 'react';
import { Route } from 'react-router';
import Counter from 'app/components/Counter';
import HelloWorld from 'app/components/HelloWorld';

export default function getRoutes({dispatch, getState}) {
  function requireAuth() {
    // Bug preventing access to getState currently: https://github.com/rackt/redux-router/pull/62
  }

  return (
    <Route path="">
      <Route path="/counter" component={Counter} onEnter={requireAuth} />
      <Route path="/hello" component={HelloWorld} />
    </Route>
  );
}
