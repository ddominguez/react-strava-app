import React, {Component} from 'react';
import './Strava.css';
import StravaActivity from './StravaActivity';
import StravaActivityDetail from './StravaActivityDetail';

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

  render() {
    const {
      activities,
      selectedActivityIndex
    } = this.state;

    const selectedActivity = activities[selectedActivityIndex] || null;
    return (
      <div className="strava-app">
        <div className="strava-activity-list">
        {activities.map(item => {
          return <StravaActivity
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    start_date={item.start_date}
                    selectActivity={this.handleSelectActivity}
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
