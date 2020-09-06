import React, {Component} from 'react';
import './Strava.css';
import StravaActivity from './StravaActivity';
import StravaActivityDetail from './StravaActivityDetail';
import StravaUser from '../StravaUser'

class Strava extends Component {
  state = {
    activities: [],
    selectedActivityIndex: null
  }

  componentDidMount() {
    const url = 'https://www.strava.com/api/v3/activities?per_page=10';
    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + this.props.token
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        activities: res,
        selectedActivityIndex: 0
      });
    })
    .catch(error => console.log(error));
  }

  handleSelectActivity = (id) => {
    const selectedActivityIndex = this.state.activities.findIndex(activity => activity.id === id);
    this.setState({
      selectedActivityIndex: selectedActivityIndex
    })
  }

  handleActivityMenuClick = () => {
    document.querySelector(".strava-activity-list").classList.add("open");
  }

  render() {
    const {
      activities,
      selectedActivityIndex
    } = this.state;

    const selectedActivity = activities[selectedActivityIndex] || null;
    return (
      <div className="strava-app">
        <button className="activity-menu" onClick={this.handleActivityMenuClick}>Activities</button>
        <StravaUser />
        <div className="strava-activity-list">
        {activities.map((item, index) => {
          const isSelected = selectedActivityIndex === index;
          return <StravaActivity
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    start_date={item.start_date}
                    selectActivity={this.handleSelectActivity}
                    isSelected={isSelected}
                  />
        })}
        </div>
        {selectedActivity &&
        <StravaActivityDetail activity={selectedActivity} />
        }
      </div>
    );
  }
}

export default Strava;
