import React, { Component } from 'react';
import './App.css';
import StravaAuthorize from '../StravaAuthorize'
import Strava from '../Strava'
import StravaRedirect from '../StravaRedirect'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            render={() => {
              if (!this.props.token) {
                return <StravaAuthorize />
              } else {
                return <Strava />
              }
            }}
          />
          <Route
            path="/strava_redirect"
            render={() => {
              return <StravaRedirect />
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
