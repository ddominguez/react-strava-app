import React, { Component } from 'react';

export const StravaContext = React.createContext();

export class StravaProvider extends Component {
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
      <StravaContext.Provider
        value={{
          ...this.state,
          handleTokenUpdate: this.handleTokenUpdate
        }}>
        {this.props.children}
      </StravaContext.Provider>
    );
  }
}