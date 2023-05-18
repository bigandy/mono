import { Fragment, useState, MouseEvent } from "react";
import { METERS_TO_KMH } from "~/utils/consts";
import Button from "../Button";
import { api } from "~/utils/api";
import { activities, type ActivityType, type Activity } from "~/types";

type StravaActivityProps = {
  activity: Activity;
  linkToActivity?: boolean;
  editable?: boolean;
};

type StandardViewProps = Pick<
  StravaActivityProps,
  "activity" | "linkToActivity"
>;

const StandardView = ({ linkToActivity, activity }: StandardViewProps) => {
  return (
    <Fragment>
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
      <div>Activity Type: {activity.type}</div>

      <a
        target="_blank"
        href={`https://www.strava.com/activities/${activity.id}`}
      >
        Link To Activity on Strava
      </a>
    </Fragment>
  );
};

type EditableViewProps = { activity: Activity };

const EditableView = ({ activity }: EditableViewProps) => {
  const utils = api.useContext();
  const updateMutation = api.strava.updateOneActivityinDB.useMutation({
    onSuccess: () => {
      // utils.strava.getActivitiesFromDB.invalidate(); // Don't currently need to do as this is refetched when go to /activites page.
      utils.strava.getActivityFromDB.invalidate({ activityId: activity.id });
    },
  });

  const [formState, setFormState] = useState({
    name: activity.name,
    type: activity.type,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    inputId: "name" | "type"
  ) => {
    setFormState((prevState) => {
      const newState = { ...prevState };
      newState[inputId] = e.target.value;

      return newState;
    });
  };

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    // do the mutation.
    updateMutation.mutate({
      id: activity.id,
      name: formState.name,
      type: formState.type,
    });
  };

  return (
    <form action="" className="mt-4">
      <input
        type="text"
        value={formState.name}
        onChange={(e) => handleChange(e, "name")}
        className="w-full rounded border p-4"
      />

      <select
        onChange={(e) => handleChange(e, "type")}
        className="mt-4 w-full rounded border p-4"
        value={formState.type}
      >
        {activities.map((type: ActivityType) => {
          return (
            <option value={type} key={`option-${type}`}>
              {type}
            </option>
          );
        })}
      </select>

      <Button
        primary
        big
        onClick={handleSubmit}
        className="mt-4"
        loading={updateMutation.isLoading}
      >
        Submit
      </Button>
    </form>
  );
};

/**
 * A single Strava Activity
 * @param activity IStravaActivity
 * @returns
 */
const StravaActivity = ({
  activity,
  linkToActivity = false,
  editable = false,
}: StravaActivityProps) => {
  if (!activity) {
    return null;
  }

  return (
    <div>
      {editable ? (
        <EditableView activity={activity} />
      ) : (
        <StandardView linkToActivity={linkToActivity} activity={activity} />
      )}
    </div>
  );
};

export default StravaActivity;
