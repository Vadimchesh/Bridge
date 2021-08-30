import React, { ReactElement, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Main from './pages/main/Main';

export default function App(): ReactElement {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/'>
          <Main />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}
