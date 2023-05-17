import type { Activity } from "~/server/api/routers/utils/strava";
import { METERS_TO_KMH } from "~/utils/consts";

/**
 * A single Strava Activity
 * @param activity IStravaActivity
 * @returns
 */
const StravaActivity = ({
  activity,
  linkToActivity = false,
}: {
  activity: Activity;
  linkToActivity?: boolean;
}) => {
  if (!activity) {
    return null;
  }

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold">
        {linkToActivity ? (
          <a href={`/activities/${activity.id}`}>{activity.name}</a>
        ) : (
          activity.name
        )}
      </h3>
      <div>Achievements: {activity.achievement_count}</div>
      <div>Kudos: {activity.kudos_count}</div>
      <div>Average HR: {activity.average_heartrate}bpm</div>
      <div>Start Date: {activity.start_date}</div>
      <div>Total Climbing: {activity.total_elevation_gain}m</div>
      <div>
        Average Speed: {(activity.average_speed * METERS_TO_KMH).toFixed(2)}kmh
      </div>

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
