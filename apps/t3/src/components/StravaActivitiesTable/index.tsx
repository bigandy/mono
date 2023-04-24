import { useState } from "react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

import { api } from "~/utils/api";
import {
  convertMetersToKilometers,
  convertMetersToMiles,
} from "~/utils/conversion";
import { StravaActivity } from "~/server/api/routers/strava";

import Button from "~/components/Button";
import Heading from "~/components/Heading";

const StravaActivitiesTable: React.FC = () => {
  const [isMetric, setIsMetric] = useState(false);

  const { data: sessionData } = useSession();
  const [page, setPage] = useState(1);

  const { data: getActivities, isLoading } = api.strava.getActivities.useQuery(
    { page: page },
    { enabled: sessionData?.user !== undefined }
  );

  const handleNextPage = () => setPage((p) => p + 1);
  const handlePreviousPage = () => setPage((p) => p - 1);

  const speedUnit = isMetric ? "km/h" : "mph";
  const distanceUnit = isMetric ? "km" : "miles";

  return (
    <div>
      <div>
        <div>
          <label htmlFor="metric">Metric</label>
          <input
            type="radio"
            name="unitSelector"
            id="metric"
            checked={isMetric}
            onChange={() => setIsMetric(true)}
            className="ml-2"
          />
        </div>
        <div>
          <label htmlFor="imperial">Imperial</label>
          <input
            type="radio"
            name="unitSelector"
            id="imperial"
            checked={!isMetric}
            onChange={() => setIsMetric(false)}
            className="ml-2"
          />
        </div>
      </div>
      <div className="container mt-10 text-base text-black">
        <Heading as="h2">Strava Data</Heading>
        <table className="w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>
                Distance
                <br />
                <small>({distanceUnit})</small>
              </th>
              <th>Activity Type</th>
              <th>
                Average Speed
                <br />
                <small>({speedUnit})</small>
              </th>
              <th>Private?</th>
            </tr>
          </thead>
          {getActivities && getActivities.length > 0 && (
            <tbody>
              {getActivities.map((activity: StravaActivity) => {
                const distance = isMetric
                  ? convertMetersToKilometers(activity.distance)
                  : convertMetersToMiles(activity.distance);

                const averageSpeed = isMetric
                  ? activity.average_speed * 3.6
                  : activity.average_speed * 2.23694;
                return (
                  <tr key={`${activity.id}`}>
                    <td>
                      {format(
                        new Date(activity.start_date),
                        "dd-MM-yyyy 'at' h:mm aaa"
                      )}
                    </td>
                    <td>{activity.name}</td>
                    <td>
                      {distance} {distanceUnit}
                    </td>
                    <td>{activity.type}</td>
                    <td>
                      {averageSpeed.toFixed(2)} {speedUnit}
                    </td>
                    <td>{activity.private && "Private"}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>

        {isLoading && <p>Loading...</p>}

        {page > 1 && (
          <Button className="mr-4" handleClick={handlePreviousPage}>
            &larr; Get Previous Page ({page - 1})
          </Button>
        )}

        <Button className="ml-4 mt-4" handleClick={handleNextPage}>
          Get Next Page ({page + 1}) &rarr;
        </Button>
      </div>
    </div>
  );
};

export default StravaActivitiesTable;
