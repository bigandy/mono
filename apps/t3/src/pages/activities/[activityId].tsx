import { type NextPage } from "next";
import { type GetServerSideProps } from "next";
import { useRouter } from "next/router";

import withSession from "~/utils/middleware/withSession";

import BasicLayout from "~/layouts/BasicLayout";
import { redirect } from "~/utils/redirect";
import { api } from "~/utils/api";
import StravaActivity from "~/components/StravaActivity";

const ActivityPage: NextPage = () => {
  const router = useRouter();
  const { activityId } = router.query;
  const { data: activity, loading } = api.strava.getActivityFromDB.useQuery({
    activityId,
  });

  console.log({ activity });
  return (
    <>
      <BasicLayout title={activity?.name ?? ""}>
        {loading && <p>Loading...</p>}
        {activity && <StravaActivity activity={activity} />}
      </BasicLayout>
    </>
  );
};

export default ActivityPage;

export const getServerSideProps: GetServerSideProps = withSession((ctx) => {
  if (!ctx.req.session) {
    return redirect(ctx, "/signin");
  }

  return {
    props: {},
  };
});
