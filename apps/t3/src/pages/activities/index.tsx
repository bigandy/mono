import { type NextPage } from "next";
import { type GetServerSideProps } from "next";

import withSession from "~/utils/middleware/withSession";

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

export const getServerSideProps: GetServerSideProps = withSession(() => {
  return {
    props: {},
  };
});