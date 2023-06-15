import { type GetServerSideProps, type NextPage } from "next";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { toast } from "react-hot-toast";

import BasicLayout from "~/layouts/BasicLayout";

import { api } from "~/utils/api";
import withSession from "~/utils/middleware/withSession";
import { redirect } from "~/utils/redirect";

import Button from "~/components/Button";
import UnitSelector from "~/components/UnitSelector";

const isMetricAtom = atomWithStorage("isMetric", true);

const SettingsPage: NextPage = () => {
  const [isMetric, setIsMetric] = useAtom(isMetricAtom);
  const { isLoading, mutate } =
    api.strava.getAllActivitiesFromStrava.useMutation({
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

        <div className="mt-4 text-xl font-bold">Metric / Imperial</div>
        <UnitSelector isMetric={isMetric} setIsMetric={setIsMetric} />
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
