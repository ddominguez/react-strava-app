// import React from "react";

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

// class StravaActivity extends React.Component {

//   handleOnClick = (id: number) => {
//     this.props.selectActivity(id);
//     document.querySelector(".strava-activity-list")?.classList.remove("open");
//   }

//   render() {
//     const selectedClassName = this.props.isSelected ? 'selected' : '';
//     const activityDate = new Date(this.props.start_date).toDateString();
//     return (
//       <div
//         className={`strava-activity ${selectedClassName}`}
//         onClick={() => this.handleOnClick(this.props.id)}
//       >
//         <div className="strava-activity-date">
//           {activityDate}
//         </div>
//         <div className="strava-activity-name">
//           {this.props.name}
//         </div>
//       </div>
//     );
//   }
// }
  
export default StravaActivity;
