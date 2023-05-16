import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

import Button from "~/components/Button";
import Heading from "~/components/Heading";
import StravaTable from "~/components/StravaTable";

const StravaActivities: React.FC = () => {
  const [isMetric, setIsMetric] = useState(false);
  const [stravaActivities, setStravaActivities] = useState([]);

  const { data: sessionData } = useSession();
  const [page, setPage] = useState(1);

  const {
    data: dbActivities,
    isLoading,
    refetch,
  } = api.strava.getActivitiesFromDB.useQuery(
    { page: page, activities_count: 10 },
    { enabled: sessionData?.user !== undefined }
  );

  const getActivitiesMutation =
    api.strava.getActivitiesFromStrava.useMutation();

  const handleNextPage = () => setPage((p) => p + 1);
  const handlePreviousPage = () => setPage((p) => p - 1);

  useEffect(() => {
    if (dbActivities && dbActivities.length > 0) {
      setStravaActivities(dbActivities);
    }
  }, [dbActivities, page]);

  const handleGetStravaActivities = async () => {
    getActivitiesMutation;

    const mutation = await getActivitiesMutation.mutateAsync({});

    console.log(mutation);
  };

  return (
    <div>
      <div className="flex">
        <div className="mr-4 cursor-pointer ">
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
        <div className="cursor-pointer ">
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
      <div className="container  mt-4 text-base text-black">
        <Heading as="h2">Strava Data</Heading>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <StravaTable
            data={stravaActivities}
            isMetric={isMetric}
            reloadData={refetch}
          />
        )}

        {stravaActivities.length === 0 && (
          <div className="mt-4">
            <Button primary big onClick={handleGetStravaActivities}>
              Get Strava Activities
            </Button>
          </div>
        )}

        <Button
          disabled={page < 2}
          className="mr-4 mt-4 "
          onClick={handlePreviousPage}
        >
          &larr; Get Previous Page ({page - 1})
        </Button>

        <Button className="mt-4" onClick={handleNextPage}>
          Get Next Page ({page + 1}) &rarr;
        </Button>
      </div>
    </div>
  );
};

export default StravaActivities;
