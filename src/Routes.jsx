import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, MemosIndex } from './containers';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/memos" component={MemosIndex} />
  </Switch>
);

export default Routes;
