import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, MemosIndex, MemosSingleFull, NotFound, Login } from './containers';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route path="/memos" component={MemosIndex} />
    <Route path="/memo/:ids" component={MemosSingleFull} />
    <Route path="/memo/add" component={MemosSingleFull} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
