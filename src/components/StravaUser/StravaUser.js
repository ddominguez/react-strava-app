import React from 'react';
import './StravaUser.css';

const StravaUser = (props) => {
  const { user } = props;
  const fullname = `${user.firstname} ${user.lastname}`;
  return (
    <div className="strava-user">
      <div className="image">
        <img src={user.profile} alt={fullname} />
      </div>
      <div className="strava-user-info">
        <div className="name">
          {fullname}
        </div>
      </div>
    </div>
  );
};

export default StravaUser;