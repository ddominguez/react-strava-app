import React from "react";

export const StravaContext = React.createContext();

const defaultState = {
  token: null,
  refreshToken: null,
  user: null
};

/**
 * Attempts to get strava data from session storage and return as defaul state.
 */
const getDefaultState = () => {
  const token = sessionStorage.getItem("token");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const user = sessionStorage.getItem("user");
  if (!!token || !!refreshToken || !!user) {
    return {
      token,
      refreshToken,
      user: JSON.parse(user)
    };
  }

  return defaultState;
};

/**
 * Adds strava athlete and api tokens to session storage.
 */
const addUserToStorage = (payload) => {
  if (payload?.token) {
    sessionStorage.setItem("token", payload.token);
  }
  if (payload?.refreshToken) {
    sessionStorage.setItem("refreshToken", payload.refreshToken);
  }
  if (payload?.user) {
    sessionStorage.setItem("user", JSON.stringify(payload.user));
  }
};

const StravaStateContext = React.createContext();
const StravaDispatchContext = React.createContext();

const stravaReducer = (state, action) => {
  switch (action.type) {
    case "update_user_auth": {
      addUserToStorage(action?.payload);
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
      }
    }
    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
};

const StravaContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(stravaReducer, getDefaultState());

  return (
    <StravaStateContext.Provider value={state}>
      <StravaDispatchContext.Provider value={dispatch}>
        {children}
      </StravaDispatchContext.Provider>
    </StravaStateContext.Provider>
  );
};

export {
  StravaContextProvider,
  StravaStateContext,
  StravaDispatchContext
};