import React, {Component} from 'react';
import './StravaUser.css';

class StravaUser extends Component {
  render() {
    const {firstname, lastname, profile} = this.props.user;
    const fullname = `${firstname} ${lastname}`;
    return (
      <div className="strava-user">
        <div className="image">
          <img src={profile} alt={fullname} />
        </div>
        <div className="strava-user-info">
          <div className="name">
            {fullname} 
          </div>
        </div>
      </div>
    );
  }
}

export default StravaUser;