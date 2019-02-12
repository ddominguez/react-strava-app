import React, { Component } from 'react';
import './StravaAuthorize.css';
import AuthButtonIcon from '../../assets/btn_strava_connectwith_orange.svg'

class StravaAuthorize extends Component {
  render() {
    const authUrl = process.env.REACT_APP_AUTH_URI
    return (
      <div className="auth-button">
        <a href={authUrl}>
            <img
                className="auth-button-icon"
                alt="Connect with Strava"
                src={AuthButtonIcon}
            />
        </a>
      </div>
    );
  }
}

export default StravaAuthorize;
