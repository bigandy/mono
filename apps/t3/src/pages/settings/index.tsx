import { useState } from "react";
import { type NextPage } from "next";
import { type GetServerSideProps } from "next";

import withSession from "~/utils/middleware/withSession";
import { api } from "~/utils/api";

import BasicLayout from "~/layouts/BasicLayout";
import { redirect } from "~/utils/redirect";
import Button from "~/components/Button";

const SettingsPage: NextPage = () => {
  const getActivities = api.strava.getActivitiesFromStrava.useMutation();
  const [loading, setLoading] = useState(false);
  const syncActivitiesFromStrava = async () => {
    setLoading(true);
    const act = await getActivities.mutateAsync();
    console.log(act);
    if (act.message === "success") {
      setLoading(false);
    }
  };
  return (
    <>
      <BasicLayout title="Activities">
        <Button onClick={syncActivitiesFromStrava}>
          {!loading ? "Sync Activities From Strava" : "Loading"}
        </Button>
      </BasicLayout>
    </>
  );
};

export default SettingsPage;

export const getServerSideProps: GetServerSideProps = withSession((ctx) => {
  if (!ctx.req.session) {
    return redirect(ctx, "/signin");
  }
  return {
    props: {},
  };
});
