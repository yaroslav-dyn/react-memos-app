import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, MemosIndex, MemosSingleFull, NotFound, Login, SignUp } from './containers';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <Route path="/memos" component={MemosIndex} />
    <Route path="/memo/:ids" component={MemosSingleFull} />
    <Route path="/memo/add" component={MemosSingleFull} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
