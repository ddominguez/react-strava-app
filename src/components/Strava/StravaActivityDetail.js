import React, {Component} from 'react';

import { StaticMap } from './StaticMap';

const metersToMiles = (meters) => {
  return Number.parseFloat(meters * 0.00062137).toFixed(2);
}

const secondsToHms = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 3600 % 60);
  return ('0' + h).slice(-2) +':' + ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
}

const minutesPerMile = (seconds, meters) => {
  const minutes = Math.floor(seconds / 60);
  const miles = Number.parseFloat(meters * 0.00062137).toFixed(2);
  const pace = minutes / miles;
  const paceMinutes = Math.floor(pace);
  let paceSeconds = Math.round((pace - paceMinutes) * 60);
  if (paceSeconds < 10) {
    paceSeconds = '0'+paceSeconds;
  }
  return paceMinutes+':'+paceSeconds;
}

class StravaActivityDetail extends Component {
  render() {
    const {
      name,
      start_date,
      distance,
      elapsed_time,
      map
    } = this.props.activity;
    const distanceInMiles = metersToMiles(distance) + ' mi';
    const elapsedTime = secondsToHms(elapsed_time);
    const pace = minutesPerMile(elapsed_time, distance) + '/mi';
    const activityDate = new Date(start_date).toDateString();
    return (
      <div className="strava-activity-details">
        <div className="strava-activity-date">{activityDate}</div>
        <div className="strava-activity-name">{name}</div>
        <div className="strava-actvivity-stats">
          <div className="stat distance">
            <span className="stat-label">Distance</span>
            <span className="stat-value">{distanceInMiles}</span>
          </div>
          <div className="stat elapsed-time">
            <span className="stat-label">Elapsed Time</span>
            <span className="stat-value">{elapsedTime}</span>
          </div>
          <div className="stat pace">
            <span className="stat-label">Pace</span>
            <span className="stat-value">{pace}</span>
          </div>
        </div>

        <StaticMap mapType="mapbox" name={name} polyline={map.summary_polyline} />
      </div>
    );
  }
}

export default StravaActivityDetail;
