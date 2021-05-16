import React, { Component } from "react";

import { STRAVA_AUTHORIZE_URI } from "../../constants"
import AuthButtonIcon from "../../assets/btn_strava_connectwith_orange.svg";

import "./StravaAuthorize.css";

class StravaAuthorize extends Component {
  render() {
    return (
      <div className="auth-button">
        <a href={STRAVA_AUTHORIZE_URI}>
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
