import React from 'react';
import { Route } from 'react-router';
import Counter from 'app/components/Counter';
import HelloWorld from 'app/components/HelloWorld';

export default (
  <Route path="">
    <Route path="/counter" component={Counter} />
    <Route path="/hello" component={HelloWorld} />
  </Route>
);
