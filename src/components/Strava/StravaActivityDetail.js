import React, {Component} from 'react';

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
      elapsed_time
    } = this.props.activity;
    const distanceInMiles = metersToMiles(distance) + ' Miles';
    const elapsedTime = secondsToHms(elapsed_time);
    const pace = minutesPerMile(elapsed_time, distance);
    return (
      <div className="strava-activity-details">
        {start_date} <br />
        {name} <br />
        {distanceInMiles} <br />
        {elapsedTime} <br />
        {pace} <br />
      </div>
    );
  }
}

export default StravaActivityDetail;
