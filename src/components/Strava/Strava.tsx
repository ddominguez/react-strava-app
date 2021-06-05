import React from "react";

import StravaActivity from "./StravaActivity";
import StravaActivityDetail from "./StravaActivityDetail";
import StravaUser from "../StravaUser/StravaUser";

import { fetchUserStravaActivities } from "../../api/strava";
import { StravaStateContext } from "../../contexts/StravaContext";

import "./Strava.css";

const Strava = () => {
  const [activities, setActivities] = React.useState<{[key: string]: any}[]>([]);
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
      return () => {};
    }

    // useEffect cleanup
    return () => (isMounted = false)
  }, [stravaState.token]);

  const handleSelectActivity = (id: number) => {
    const selectedActivityIndex = activities.findIndex(activity => activity.id === id);
    setSelectedActivityIndex(selectedActivityIndex);
  };

  const handleActivityMenuClick = () => {
    document.querySelector(".strava-activity-list")?.classList.add("open");
  };

  const activeActivity = activities[selectedActivityIndex];
  const activityDetailProps = {
    name: activeActivity?.name,
    start_date: activeActivity?.start_date,
    distance: activeActivity?.distance,
    elapsed_time: activeActivity?.elapsed_time,
    map: activeActivity?.map
  }

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
      { activeActivity
        ? <StravaActivityDetail {...activityDetailProps} />
        : null }
    </div>
  );
};

export default Strava;
