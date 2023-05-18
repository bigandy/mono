import { useState } from "react";
import { type NextPage } from "next";
import Link from "next/link";
import { type GetServerSideProps } from "next";
import { useRouter } from "next/router";

import withSession from "~/utils/middleware/withSession";

import BasicLayout from "~/layouts/BasicLayout";
import { redirect } from "~/utils/redirect";
import { api } from "~/utils/api";
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
          <label htmlFor="editable">Edit?</label>
          <input
            type="checkbox"
            checked={editable}
            onChange={() => setEditable((e) => !e)}
            id="editable"
          />
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
