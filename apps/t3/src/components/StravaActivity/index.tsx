import { Fragment, MouseEvent, useState } from "react";

import Link from "next/link";

import { activities, type Activity, type ActivityType } from "~/types";
import { toast } from "react-hot-toast";

import { api } from "~/utils/api";
import { FEET_TO_METERS, METERS_TO_KMH, METERS_TO_MPH } from "~/utils/consts";
import {
  convertMetersToKilometers,
  convertMetersToMiles,
} from "~/utils/conversion";
import { niceActivityDate } from "~/utils/date-time";
import { isMetricAtom, useAtom } from "~/utils/store";

import Button from "~/components/Button";

type StandardViewProps = Pick<
  StravaActivityProps,
  "activity" | "linkToActivity"
>;

/**
 * Standard View for viewing an activity.
 */
const StandardView = ({ linkToActivity, activity }: StandardViewProps) => {
  const [isMetric] = useAtom(isMetricAtom);
  return (
    <Fragment>
      <h3 className="mb-4 text-xl font-bold">
        {linkToActivity ? (
          <Link href={`/activities/${activity.id}`}>{activity.name}</Link>
        ) : (
          activity.name
        )}
      </h3>

      <div className={"my-4"}>
        Date: {niceActivityDate(activity.start_date)}
      </div>

      <div>Achievements: {activity.achievement_count}</div>
      <div>Kudos: {activity.kudos_count}</div>
      <div>Average HR: {activity.average_heartrate}bpm</div>
      <br />
      <div>
        Total Climbing:{" "}
        {convertClimbing(activity.total_elevation_gain, isMetric, 1)}{" "}
        {isMetric ? "m" : "ft"}
      </div>
      <div>
        Average Speed: {convertSpeed(activity.average_speed, isMetric)}{" "}
        {isMetric ? "km/h" : "mph"}
      </div>
      <div>
        Distance: {convertDistance(activity.distance, isMetric)}{" "}
        {isMetric ? "km" : "miles"}
      </div>
      <br />
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

const convertSpeed = (meters: number, isMetric: boolean, dp: number = 2) => {
  return (meters * (isMetric ? METERS_TO_KMH : METERS_TO_MPH)).toFixed(dp);
};

const convertClimbing = (meters: number, isMetric: boolean, dp: number = 2) => {
  return (isMetric ? meters : meters * FEET_TO_METERS).toFixed(dp);
};

const convertDistance = (meters: number, isMetric: boolean) => {
  if (isMetric) {
    return convertMetersToKilometers(meters);
  } else {
    return convertMetersToMiles(meters);
  }
};

type EditableViewProps = { activity: Activity };

/**
 * Editable View for editing an activity.
 */
const EditableView = ({ activity }: EditableViewProps) => {
  const utils = api.useContext();
  const updateMutation = api.strava.updateOneActivity.useMutation({
    onSuccess: () => {
      // utils.strava.getActivitiesFromDB.invalidate(); // Don't currently need to do as this is refetched when go to /activites page.
      utils.strava.getActivityFromDB.invalidate({ activityId: activity.id });
      toast.success("Successfully updated activity");
    },
    onError: () => {
      toast.error("Error while editing activity");
    },
  });

  const [formState, setFormState] = useState<{
    name: string;
    type: ActivityType;
  }>({
    name: activity.name,
    type: activity.type as ActivityType,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    inputId: "name" | "type"
  ) => {
    setFormState((prevState) => {
      const newState = { ...prevState };
      newState[inputId] = e.target.value as ActivityType;

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

type StravaActivityProps = {
  activity: Activity;
  linkToActivity?: boolean;
  editable?: boolean;
};

/**
 * A Single Strava Activity
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
