import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import {
  convertMetersToKilometers,
  convertMetersToMiles,
} from "~/utils/conversion";
import { StravaActivity } from "~/server/api/routers/strava";
import { useState, useEffect } from "react";

import Button from "~/components/Button";

const AuthShowcase: React.FC = () => {
  const [isMetric, setIsMetric] = useState(false);
  const [activity, setActivity] = useState<{ id: string; name: string } | null>(
    null
  );
  const { data: sessionData } = useSession();
  const [page, setPage] = useState(1);

  const {
    data: getActivities,
    refetch,
    isLoading,
  } = api.strava.getActivities.useQuery(
    { page: page },
    { enabled: sessionData?.user !== undefined }
  );

  const { data: convertActivity } = api.strava.convertActivity.useQuery(
    {
      activityId: activity?.id,
      activityName: activity?.name,
    },
    { enabled: sessionData?.user !== undefined && activity !== null }
  );

  const handleRowClick = (id: string) => {
    setActivity({
      name: getActivities.find(
        (a: StravaActivity) => String(a.id) === String(id)
      ).name,
      id: String(id),
    });
  };

  const handleNextPage = () => setPage((p) => p + 1);

  useEffect(() => {
    if (convertActivity && convertActivity.message === "success") {
      refetch();
    }
  }, [convertActivity]);

  return (
    <div className="text-white">
      <Button
        handleClick={
          sessionData ? () => void signOut() : () => void signIn("strava")
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
      {sessionData && (
        <>
          <p className="text-2xl text-white">
            <span>
              Logged in as {sessionData.user?.name}{" "}
              <img src={sessionData?.user?.image ?? ""} className="my-4" />
            </span>
          </p>

          <Button handleClick={() => setIsMetric((m) => !m)}>
            {isMetric ? "use imperial" : "use metric"}
          </Button>
        </>
      )}
      <div className="container mt-4 bg-white p-4 text-base text-black">
        <h2 className={"mb-4 text-3xl font-bold"}>Strava Data</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Distance {isMetric ? "km" : "miles"}</th>
              <th>Activity Type</th>
              <th>Average Speed</th>
              <th>Private?</th>
            </tr>
          </thead>
          {getActivities && getActivities.length > 0 && (
            <tbody>
              {getActivities
                .filter(
                  (activity: StravaActivity) =>
                    activity.average_speed <= 3 &&
                    activity.sport_type === "Run" &&
                    activity.private
                )
                .map((activity: StravaActivity) => {
                  return (
                    <tr
                      key={`${activity.id}`}
                      onClick={() => handleRowClick(String(activity.id))}
                    >
                      <td>{activity.start_date}</td>
                      <td>{activity.name}</td>
                      <td>
                        {isMetric
                          ? convertMetersToKilometers(activity.distance)
                          : convertMetersToMiles(activity.distance)}
                      </td>
                      <td>{activity.type}</td>
                      <td>{activity.average_speed}</td>
                      <td>{activity.private && "Private"}</td>
                    </tr>
                  );
                })}
            </tbody>
          )}
        </table>

        {isLoading && <p>Loading...</p>}

        <Button handleClick={handleNextPage}>Get Page {page + 1}</Button>
      </div>
    </div>
  );
};

export default AuthShowcase;
