import { useState } from "react";

import { type GetServerSideProps, type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import BasicLayout from "~/layouts/BasicLayout";

import { api } from "~/utils/api";
import withSession from "~/utils/middleware/withSession";
import { redirect } from "~/utils/redirect";

import StravaActivity from "~/components/StravaActivity";

const ActivityPage: NextPage = () => {
  const [editable, setEditable] = useState(false);
  const router = useRouter();
  const activityId = router.query.activityId as string;

  const { data: activity, isLoading } = api.strava.getActivityFromDB.useQuery({
    activityId,
  });

  return (
    <>
      <BasicLayout title={""}>
        <div>
          <Link href="/activities">&larr; back to Activities</Link>
        </div>
        <div>
          <div
            className="my-4 text-orange-400 font-bold underline cursor-pointer"
            onClick={() => setEditable((e) => !e)}
          >
            {!editable ? "Edit?" : "Cancel"}
          </div>
        </div>

        {isLoading && <p>Loading...</p>}
        {activity && <StravaActivity activity={activity} editable={editable} />}
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

// IDEAS:
// - get DB stuff, then async get more info from the Strava API for this activity.
// - editable name, type
