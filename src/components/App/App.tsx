import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import StravaAuthorize from '../StravaAuthorize';
import Strava from '../Strava/Strava';
import StravaRedirect from '../StravaRedirect/StravaRedirect';
import { StravaStateContext } from "../../contexts/StravaContext";

const App = () => {
  const stravaState = React.useContext(StravaStateContext);
  return (
    <Router>
      <Switch>
        <Route
          exact
          path='/'
          render={() => {
            if (!stravaState?.token) {
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

export default App;
