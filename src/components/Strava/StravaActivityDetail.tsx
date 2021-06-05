// import React from "react";

import { StaticMap } from "./StaticMap";

const metersToMiles = (meters: number) => {
  return (meters * 0.00062137).toFixed(2);
}

const secondsToHms = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 3600 % 60);
  return ('0' + h).slice(-2) +':' + ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
}

const minutesPerMile = (seconds: number, meters: number) => {
  const minutes = Math.floor(seconds / 60);
  const miles = (meters * 0.00062137).toFixed(2);
  const pace = minutes / parseFloat(miles);
  const paceMinutes = Math.floor(pace);
  let paceSeconds: number | string = Math.round((pace - paceMinutes) * 60);
  if (paceSeconds < 10) {
    paceSeconds = '0'+paceSeconds;
  }
  return paceMinutes+':'+paceSeconds;
}

interface StravaActivityDetailProps {
  name: string;
  start_date: string;
  distance: number;
  elapsed_time: number;
  map: { [key: string]: string };
}

const StravaActivityDetail = (props: StravaActivityDetailProps) => {
  const {
    name,
    start_date,
    distance,
    elapsed_time,
    map
  } = props;

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
};


export default StravaActivityDetail;
