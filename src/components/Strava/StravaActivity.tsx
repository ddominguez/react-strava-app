interface StravaActivityProps {
  id: number;
  isSelected: boolean;
  name: string;
  selectActivity: (id: number) => void;
  start_date: string;
}


const StravaActivity = (props: StravaActivityProps) => {
  const { id, name, selectActivity, isSelected, start_date } = props;

  const handleOnClick = () => {
    selectActivity(id);
    document.querySelector(".strava-activity-list")?.classList.remove("open");
  }

  const selectedClassName = isSelected ? 'selected' : '';
  const activityDate = new Date(start_date).toDateString();

  return (
    <div
        className={`strava-activity ${selectedClassName}`}
        onClick={handleOnClick}
      >
        <div className="strava-activity-date">
          {activityDate}
        </div>
        <div className="strava-activity-name">
          {name}
        </div>
      </div>
  );
};

export default StravaActivity;
