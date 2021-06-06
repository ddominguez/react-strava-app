import React from "react";

// export const StravaContext = React.createContext(undefined);

interface UserAuth {
  token: string;
  refreshToken: string;
  user: { [key: string]: any };
}

interface UpdateUserAuthAction {
  type: "update_user_auth";
  payload: UserAuth
}

type Dispatch = (action: UpdateUserAuthAction) => void;

const defaultState: UserAuth = {
  token: "",
  refreshToken: "",
  user: {}
};

/**
 * Attempts to get strava data from session storage and return as defaul state.
 */
const getDefaultState = (): UserAuth => {
  const token = sessionStorage.getItem("token");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const user = sessionStorage.getItem("user");
  if (!!token && !!refreshToken && !!user) {
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
const addUserToStorage = (payload: UserAuth) => {
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

const StravaStateContext = React.createContext<UserAuth | undefined>(undefined);
const StravaDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const stravaReducer = (state: UserAuth, action: UpdateUserAuthAction) => {
  switch (action.type) {
    case "update_user_auth": {
      addUserToStorage(action.payload);
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

const StravaContextProvider = ({ children }: { children: React.ReactNode }) => {
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