import React from 'react';
import { Redirect } from "react-router-dom";

import { StravaDispatchContext, StravaStateContext } from "../../contexts/StravaContext";
import { fetchAuthorizedStravaUser } from "../../api/strava";

const StravaRedirect = () => {
  const dispatch = React.useContext(StravaDispatchContext);
  const stravaState = React.useContext(StravaStateContext);

  React.useEffect(() => {
    let isMounted = true;
    if (!stravaState?.token) {
      const searchParams = new URLSearchParams(window.location.search);
      const fetchAuthedUser = async () => {
        const code =  searchParams.get("code") ?? "";
        const response = await fetchAuthorizedStravaUser(code);
        if (isMounted && response) {
          if (dispatch) {
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
      }

      fetchAuthedUser();
      return () => {};
    }
    

    // useEffect cleanup
    return () => (isMounted = false)
  });

  if (stravaState?.token) {
    return <Redirect to='/' />;
  }

  return <div>Handling strava redirect...</div>;
};

export default StravaRedirect;
