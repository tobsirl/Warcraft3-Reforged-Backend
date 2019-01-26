import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect path="/" to="/auth" exact />
          <Route path="/auth" component={AuthPage} />
          <Route path="/replays" component={null} />
          <Route path="/uploads" component={null} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
