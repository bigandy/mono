import { type NextPage } from "next";
import { type GetServerSideProps } from "next";

import withSession from "~/utils/middleware/withSession";
import { api } from "~/utils/api";

import BasicLayout from "~/layouts/BasicLayout";
import { redirect } from "~/utils/redirect";
import Button from "~/components/Button";
import { toast } from "react-hot-toast";

const SettingsPage: NextPage = () => {
  const { isLoading, mutate } = api.strava.getActivitiesFromStrava.useMutation({
    onSuccess: () => {
      toast.success("Successfully synced activities from Strava");
    },
  });

  const syncActivitiesFromStrava = () => {
    mutate();
  };

  return (
    <>
      <BasicLayout title="Settings">
        <Button
          onClick={syncActivitiesFromStrava}
          big
          primary
          loading={isLoading}
        >
          Sync Activities From Strava
        </Button>
      </BasicLayout>
    </>
  );
};

export default SettingsPage;

// @ts-expect-error TODO: Need to fix typing of ctx
export const getServerSideProps: GetServerSideProps = withSession((ctx) => {
  if (!ctx.req.session) {
    return redirect(ctx, "/signin");
  }
  return {
    props: {},
  };
});
