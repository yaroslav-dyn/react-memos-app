import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, MemosIndex, MemosSingleFull, NotFound, Login, SignUp } from './containers';
import RouterGuard from './containers/_Common/_RouterGuard';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />

    <RouterGuard path="/memos" component={MemosIndex} auth={false} />
    <RouterGuard path="/memo/:ids" component={MemosSingleFull} auth={false} />
    <RouterGuard path="/memo/add" component={MemosSingleFull} auth={false} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
