import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, MemosIndex, MemosSingleFull, NotFound, Login, SignUp, Settings, Ideas, MemoLinks } from './containers';
import RouterGuard from './containers/_Common/_RouterGuard';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { currentUser: state.currentUser };
};

const Routes = ({currentUser}) => (
  <Switch>

    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/login">
      <Login/>
    </Route>
    <Route path="/signup">
      <SignUp/>
    </Route>

    <RouterGuard path="/memos" auth={!!currentUser}>
      <MemosIndex />
    </RouterGuard>
    <RouterGuard path="/memo/:ids" auth={!!currentUser}>
      <MemosSingleFull />
    </RouterGuard>
    <RouterGuard path="/memo/add" auth={!!currentUser}>
      <MemosSingleFull />
    </RouterGuard>

    <RouterGuard path="/settings" cauth={!!currentUser}>
      <Settings />
    </RouterGuard>

    <RouterGuard path="/ideas" auth={!!currentUser}>
      <Ideas />
    </RouterGuard>
    
    <RouterGuard path="/mlinks" auth={!!currentUser} >
      <MemoLinks/>
    </RouterGuard>

    <Route component={NotFound} />

  </Switch>
);
const guardRoutes = connect(mapStateToProps)(Routes)
export default guardRoutes;
