import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './users/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth-context';



const App = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact={true}>
          <Users/>
        </Route>
        <Route path="/:userId/places" exact={true}>
          <UserPlaces/>
        </Route>
        <Route path="/places/new" exact={true}>
          <NewPlace/>
        </Route>
        <Route path="/places/:placeId" exact={true}>
          <UpdatePlace/>
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }else{
    routes = (
      <Switch>
        <Route path="/" exact={true}>
          <Users/>
        </Route>
        <Route path="/:userId/places" exact={true}>
          <UserPlaces/>
        </Route>
        <Route path="/auth" exact={true}>
          <Auth/>
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return  (
    //the values are matched with the function and parameter from the authcontext page.
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <Router>
        <MainNavigation/>
        <main>
          {routes}
        </main>
    </Router>
  </AuthContext.Provider>
  );
}

export default App;
