import React from 'react';
import { Redirect } from "react-router-dom";

import { StravaDispatchContext, StravaStateContext } from "../../contexts/StravaContext";

const StravaRedirect = () => {
  const dispatch = React.useContext(StravaDispatchContext);
  const stravaState = React.useContext(StravaStateContext);

  React.useEffect(() => {
    if (!stravaState.token) {
      const searchParams = new URLSearchParams(window.location.search);
      let tokenURI = new URL(process.env.REACT_APP_TOKEN_URI);
      const params = {
        code: searchParams.get('code')
      };

      Object.keys(params).forEach(key => tokenURI.searchParams.append(key, params[key]));
      fetch(tokenURI)
        .then(res => res.json())
        .then(res => {
          dispatch({
            type: "update_user_auth",
            payload: {
              token: res.access_token,
              refreshToken: res.refresh_token,
              user: res.athlete,
            }
          });
        });
    }
  });

  if (stravaState.token) {
    return <Redirect to='/' />;
  }

  return <div>Handling strava redirect...</div>;
};

export default StravaRedirect;
