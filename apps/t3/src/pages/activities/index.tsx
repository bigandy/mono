import { type NextPage } from "next";
import { type GetServerSideProps } from "next";

import withSession from "~/utils/middleware/withSession";

import StravaActivitiesTable from "~/components/StravaActivities";
import BasicLayout from "~/layouts/BasicLayout";
import { redirect } from "~/utils/redirect";

const ActivitiesPage: NextPage = () => {
  return (
    <>
      <BasicLayout title="Activities">
        <StravaActivitiesTable />
      </BasicLayout>
    </>
  );
};

export default ActivitiesPage;

export const getServerSideProps: GetServerSideProps = withSession((ctx) => {
  if (!ctx.req.session) {
    return redirect(ctx, "/signin");
  }
  return {
    props: {},
  };
});
