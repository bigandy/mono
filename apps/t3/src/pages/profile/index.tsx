import { type NextPage } from "next";
import { type GetServerSideProps } from "next";

import withSession from "~/utils/middleware/withSession";

import BasicLayout from "~/layouts/BasicLayout";
import { redirect } from "~/utils/redirect";

const ProfilePage: NextPage = () => {
  return (
    <>
      <BasicLayout title="Profile">
        <p>
          Here will appear statistics based on all the Strava Data in the DB.
          Woop!
        </p>
      </BasicLayout>
    </>
  );
};

export default ProfilePage;

// @ts-expect-error TODO: Need to fix typing of ctx
export const getServerSideProps: GetServerSideProps = withSession((ctx) => {
  if (!ctx.req.session) {
    return redirect(ctx, "/signin");
  }
  return {
    props: {},
  };
});
