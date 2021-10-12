import React from 'react';
import './App.css';
import { createBrowserHistory } from "history";
import {
  Router,
  Switch,
  Route,
  Redirect,
  useParams
} from "react-router-dom";
import AlertHook from "./shared/components/alert/AlertHook";
import ConfirmationHook from "./shared/components/confirmation/ConfirmationHook";
import LoginWidgetHook from "./shared/components/login-widget/LoginWidgetHook";
import LoadingHook from "./shared/components/loading/LoadingHook";
import GuardedRouteHook from "./shared/components/guarded-route/GuardedRouteHook";
import Login from "./login/Login"
import Home from "./home/Home"
import User from "./user/User"
import UserManage from "./user/manage/UserManage"
import Unauthorized from "./unauthorized/Unauthorized"

const history = createBrowserHistory()

function App() {
  return (
    <div>
      <Router history={history}>
        <AlertHook></AlertHook>
        <LoadingHook></LoadingHook>
        <ConfirmationHook></ConfirmationHook>
        <LoginWidgetHook></LoginWidgetHook>
        <Switch>
          <Route path="/user/add">
            <GuardedRouteHook claims={['admin']}>
              <UserManage view={false}/>
            </GuardedRouteHook>
          </Route>
          <Route path="/user/view/:name">
            <ViewUserManageGuardedRoute/>
          </Route>
          <Route path="/user/edit/:name">
            <EditUserManageGuardedRoute/>
          </Route>
          <Route path="/user">
            <GuardedRouteHook claims={['admin', 'standard']}>
              <User/>
            </GuardedRouteHook>
          </Route>
          <Route path="/home">
            <GuardedRouteHook claims={['admin', 'standard']}>
              <Home/>
            </GuardedRouteHook>
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/unauthorized'>
            <Unauthorized/>
          </Route>
          <Route path='/'>
            <Redirect to='/login'/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function ViewUserManageGuardedRoute() {
  let { name } = useParams();
  return (
    <GuardedRouteHook claims={['admin', 'standard']}>
      <UserManage name={name} view={true}/>
    </GuardedRouteHook>
  );
}

function EditUserManageGuardedRoute() {
  let { name } = useParams();
  return (
    <GuardedRouteHook claims={['admin']}>
      <UserManage name={name} view={false}/>
    </GuardedRouteHook>
  );
}

export const HISTORY = history;
export default App;
