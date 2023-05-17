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
  const activityId = router.query.activityId as string;

  const { data: activity, isLoading } =
    api.strava.getOneActivityFromStrava.useQuery({
      activityId: activityId,
    });

  return (
    <>
      <BasicLayout title={activity?.name ?? ""}>
        {isLoading && <p>Loading...</p>}
        {activity && <StravaActivity activity={activity} />}
      </BasicLayout>
    </>
  );
};

export default ActivityPage;

// @ts-expect-error TODO: Need to fix typing of ctx
export const getServerSideProps: GetServerSideProps = withSession((ctx) => {
  if (!ctx.req.session) {
    return redirect(ctx, "/signin");
  }

  return {
    props: {},
  };
});
