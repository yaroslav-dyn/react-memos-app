import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, MemosIndex, MemosSingleFull, NotFound } from './containers';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route  path="/memos" component={MemosIndex} />
    <Route  path="/memo/:ids" component={MemosSingleFull} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
