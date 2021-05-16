import React from 'react';
import { Redirect } from "react-router-dom";

import { StravaDispatchContext, StravaStateContext } from "../../contexts/StravaContext";
import { fetchAuthorizedStravaUser } from "../../api/strava";

const StravaRedirect = () => {
  const dispatch = React.useContext(StravaDispatchContext);
  const stravaState = React.useContext(StravaStateContext);

  React.useEffect(() => {
    let isMounted = true;
    if (!stravaState.token) {
      const searchParams = new URLSearchParams(window.location.search);
      const fetchAuthedUser = async () => {
        const response = await fetchAuthorizedStravaUser(searchParams.get("code"));
        if (isMounted && response) {
          dispatch({
            type: "update_user_auth",
            payload: {
              token: response.access_token,
              refreshToken: response.refresh_token,
              user: response.athlete,
            }
          });
        }
      }

      fetchAuthedUser();
    }

    // useEffect cleanup
    return () => (isMounted = false)
  });

  if (stravaState.token) {
    return <Redirect to='/' />;
  }

  return <div>Handling strava redirect...</div>;
};

export default StravaRedirect;
