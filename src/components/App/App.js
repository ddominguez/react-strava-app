import React, { Component } from 'react';
import './App.css';
import StravaAuthorize from '../StravaAuthorize'
import Strava from '../Strava'
import StravaRedirect from '../StravaRedirect'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  state = {
    token: sessionStorage.getItem('token') || null,
    refreshToken: sessionStorage.getItem('refreshToken') || null,
    user: JSON.parse(sessionStorage.getItem('user') || null)
  }

  handleTokenUpdate = (data) => {
    this.setState({
      token: data.access_token,
      refreshToken: data.refresh_token,
      user: data.athlete
    });
    // add to session storage
    sessionStorage.setItem('token', data.access_token);
    sessionStorage.setItem('refreshToken', data.refresh_token);
    sessionStorage.setItem('user', JSON.stringify(data.athlete));
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            render={() => {
              if (!this.state.token) {
                return <StravaAuthorize />
              } else {
                return <Strava
                          token={this.state.token}
                          refreshToken={this.state.refreshToken}
                        />
              }
            }}
          />
          <Route
            path="/strava_redirect"
            render={() => {
              return <StravaRedirect
                        tokenUpdate={this.handleTokenUpdate}
                      />
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
