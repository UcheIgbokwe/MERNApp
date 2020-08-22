import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './users/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';



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
          <Route path="/places/new" exact={true}>
            <NewPlace/>
          </Route>
          <Route path="/places/:placeId" exact={true}>
            <UpdatePlace/>
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
      
  </Router>
  )

}

export default App;
