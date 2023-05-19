import { Fragment, useEffect, useState } from "react";

import { type GetServerSideProps, type NextPage } from "next";
import { useSession } from "next-auth/react";

import BasicLayout from "~/layouts/BasicLayout";
import { type Activity } from "~/types";

import { api } from "~/utils/api";
import withSession from "~/utils/middleware/withSession";
import { redirect } from "~/utils/redirect";

import Button from "~/components/Button";
import StravaActivity from "~/components/StravaActivity";

const Home: NextPage = () => {
  const utils = api.useContext();
  const [stravaActivities, setStravaActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: sessionData } = useSession();

  const { data: dbActivities, isLoading } =
    api.strava.getActivitiesFromDB.useQuery(
      { page: 1, activities_count: 10 },
      { enabled: sessionData?.user !== undefined }
    );

  const getActivitiesMutation = api.strava.getActivitiesFromStrava.useMutation({
    onSuccess: () => {
      utils.strava.getActivitiesFromDB.invalidate();
      setLoading(false);
    },
  });

  useEffect(() => {
    if (dbActivities && dbActivities.length > 0) {
      setStravaActivities(dbActivities);
    } else {
      setStravaActivities([]);
    }
  }, [dbActivities?.length]);

  const handleGetStravaActivities = async () => {
    setLoading(true);
    const mutation = await getActivitiesMutation.mutateAsync();

    if (mutation.message === "success") {
    }

    // console.log("handleGetStravaActivities", mutation);
  };
  return (
    <BasicLayout title="Homepage">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Fragment>
          {stravaActivities.map((activity) => {
            return (
              <div key={activity.id} className="mb-4 rounded border p-4">
                <StravaActivity activity={activity} linkToActivity />
              </div>
            );
          })}
        </Fragment>
      )}
      {stravaActivities.length === 0 && (
        <div className="mt-4">
          <Button
            primary
            big
            onClick={handleGetStravaActivities}
            disabled={isLoading || loading}
          >
            {isLoading || loading ? "Loading" : "Get Strava Activities"}
          </Button>
        </div>
      )}
    </BasicLayout>
  );
};

export default Home;

// @ts-expect-error TODO: Need to fix typing of ctx
export const getServerSideProps: GetServerSideProps = withSession((ctx) => {
  if (!ctx.req.session) {
    return redirect(ctx, "/signin");
  }
  return {
    props: {},
  };
});
