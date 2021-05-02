import React from "react";

export const StravaContext = React.createContext();

const defaultState = {
  token: null,
  refreshToken: null,
  user: null
};

const StravaStateContext = React.createContext();
const StravaDispatchContext = React.createContext();

const stravaReducer = (state, action) => {
  switch (action.type) {
    case "update_user_auth": {
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
  const [state, dispatch] = React.useReducer(stravaReducer, defaultState);

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