import { type NextPage } from "next";

import StravaActivitiesTable from "~/components/StravaActivities";
import BasicLayout from "~/layouts/BasicLayout";

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
