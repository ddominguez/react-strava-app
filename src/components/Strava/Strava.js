import React from "react";

import StravaActivity from "./StravaActivity";
import StravaActivityDetail from "./StravaActivityDetail";
import StravaUser from "../StravaUser/StravaUser";

import { fetchUserStravaActivities } from "../../api/strava";
import { StravaStateContext } from "../../contexts/StravaContext";

import "./Strava.css";

const Strava = () => {
  const [activities, setActivities] = React.useState([]);
  const [selectedActivityIndex, setSelectedActivityIndex] = React.useState(0);
  const stravaState = React.useContext(StravaStateContext);

  React.useEffect(() => {
    let isMounted = true;

    const fetchActivities = async () => {
      const response = await fetchUserStravaActivities(stravaState.token);
      if (isMounted && response) {
        setActivities(response);
      }
    };

    if (stravaState.token) {
      fetchActivities();
    }

    // useEffect cleanup
    return () => (isMounted = false)
  }, [stravaState.token]);

  const handleSelectActivity = (id) => {
    const selectedActivityIndex = activities.findIndex(activity => activity.id === id);
    setSelectedActivityIndex(selectedActivityIndex);
  };

  const handleActivityMenuClick = () => {
    document.querySelector(".strava-activity-list").classList.add("open");
  };

  return (
    <div className="strava-app">
      <button className="activity-menu" onClick={handleActivityMenuClick}>Activities</button>
      <StravaUser />
      <div className="strava-activity-list">
      {activities.map((item, index) => {
        const isSelected = selectedActivityIndex === index;
        return <StravaActivity
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  start_date={item.start_date}
                  selectActivity={handleSelectActivity}
                  isSelected={isSelected}
                />
      })}
      </div>
      { activities[selectedActivityIndex]
        ? <StravaActivityDetail activity={activities[selectedActivityIndex]} />
        : null }
    </div>
  );
};

export default Strava;
