import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import ReplaysPage from './pages/Replays';
import UploadsPage from './pages/Uploads';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect path="/" to="/auth" exact />
          <Route path="/auth" component={AuthPage} />
          <Route path="/replays" component={ReplaysPage} />
          <Route path="/uploads" component={UploadsPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
