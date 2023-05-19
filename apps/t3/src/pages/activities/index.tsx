import { type GetServerSideProps, type NextPage } from "next";

import BasicLayout from "~/layouts/BasicLayout";

import { api } from "~/utils/api";
import withSession from "~/utils/middleware/withSession";
import { redirect } from "~/utils/redirect";

import StravaActivitiesTable from "~/components/StravaActivities";

const ActivitiesPage: NextPage = () => {
  api.strava.getActivitiesFromDB.useQuery({ page: 1, activities_count: 10 });
  return (
    <>
      <BasicLayout title="Activities">
        <StravaActivitiesTable />
      </BasicLayout>
    </>
  );
};

export default ActivitiesPage;

// @ts-expect-error TODO: Need to fix typing of ctx
export const getServerSideProps: GetServerSideProps = withSession((ctx) => {
  if (!ctx.req.session) {
    return redirect(ctx, "/signin");
  }
  return {
    props: {},
  };
});
