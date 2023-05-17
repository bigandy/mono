import type { IStravaActivity } from "~/server/api/routers/utils/strava";

/**
 * A single Strava Activity
 * @param activity IStravaActivity
 * @returns
 */
const StravaActivity = ({ activity }: { activity: IStravaActivity }) => {
  if (!activity) {
    return null;
  }

  console.log(activity);

  return (
    <div>
      <a href="/activities">&larr; back to Activities</a>
      <h3 className="mb-4 text-xl font-bold">{activity.name}</h3>
      <div>Achievements: {activity.achievement_count}</div>
      <div>Kudos: {activity.kudos_count}</div>
      <div>Average HR: {activity.average_heartrate}bpm</div>
      <div>Start Date: {activity.start_date}</div>
      <div>Total Climbing: {activity.total_elevation_gain}</div>
      {/* <div>Description: {activity.description}</div>
      <img src={activity.photos.primary.urls[600]} alt="" /> */}

      <a
        target="_blank"
        href={`https://www.strava.com/activities/${activity.id}`}
      >
        Link To Activity on Strava
      </a>
    </div>
  );
};

export default StravaActivity;
