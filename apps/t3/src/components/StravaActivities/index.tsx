import { useState } from "react";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

import Button from "~/components/Button";
import Heading from "~/components/Heading";
import StravaTable from "~/components/StravaTable";

const StravaActivities: React.FC = () => {
  const [isMetric, setIsMetric] = useState(false);

  const { data: sessionData } = useSession();
  const [page, setPage] = useState(1);

  const { data: getActivities, isLoading } = api.strava.getActivities.useQuery(
    { page: page, activities_count: 10 },
    { enabled: sessionData?.user !== undefined }
  );

  const handleNextPage = () => setPage((p) => p + 1);
  const handlePreviousPage = () => setPage((p) => p - 1);

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

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <StravaTable data={getActivities} isMetric={isMetric} />
        )}

        {page > 1 && (
          <Button className="mr-4 mt-4 " handleClick={handlePreviousPage}>
            &larr; Get Previous Page ({page - 1})
          </Button>
        )}

        <Button className="mt-4" handleClick={handleNextPage}>
          Get Next Page ({page + 1}) &rarr;
        </Button>
      </div>
    </div>
  );
};

export default StravaActivities;
