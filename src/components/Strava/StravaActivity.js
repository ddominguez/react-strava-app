import React, {Component} from 'react';

class StravaActivity extends Component {

  handleOnClick = (id) => {
    this.props.selectActivity(id);
    document.querySelector(".strava-activity-list").classList.remove("open");
  }

  render() {
    const selectedClassName = this.props.isSelected ? 'selected' : '';
    const activityDate = new Date(this.props.start_date).toDateString();
    return (
      <div
        className={`strava-activity ${selectedClassName}`}
        onClick={() => this.handleOnClick(this.props.id)}
      >
        <div className="strava-activity-date">
          {activityDate}
        </div>
        <div className="strava-activity-name">
          {this.props.name}
        </div>
      </div>
    );
  }
}
  
export default StravaActivity;
