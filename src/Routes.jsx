import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, MemosIndex, MemosSingleFull, NotFound, Login, SignUp, Settings, Ideas } from './containers';
import RouterGuard from './containers/_Common/_RouterGuard';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { currentUser: state.currentUser };
};

const Routes = ({currentUser}) => (
  <Switch>

    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />

    <RouterGuard path="/memos" component={MemosIndex} auth={!!currentUser} />
    <RouterGuard path="/memo/:ids" component={MemosSingleFull} auth={!!currentUser} />
    <RouterGuard path="/memo/add" component={MemosSingleFull} auth={!!currentUser} />

    <RouterGuard path="/settings" component={Settings} auth={!!currentUser} />

    <RouterGuard path="/Ideas" component={Ideas} auth={!!currentUser} />

    <Route component={NotFound} />

  </Switch>
);
const guardRoutes = connect(mapStateToProps)(Routes)
export default guardRoutes;
