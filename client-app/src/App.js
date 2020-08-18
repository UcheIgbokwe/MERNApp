import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './users/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';



const App = () => {
  
  return  (
    <Router>
      <MainNavigation/>
      <main>
        <Switch>
          <Route path="/" exact={true}>
            <Users/>
          </Route>
          <Route path="/:userId/places" exact={true}>
            <UserPlaces/>
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
      
  </Router>
  )

}

export default App;
