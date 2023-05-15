import { useState } from "react";
import { type NextPage } from "next";

import BasicLayout from "~/layouts/BasicLayout";

import { type GetServerSideProps } from "next";

import withSession from "~/utils/middleware/withSession";
import Button from "~/components/Button";

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    // show loading
    setLoading(true);
    // TODO: get some data please!
    await timeout(3000);

    // remove loading
    setLoading(false);

    // TODO: show success toast
  };

  return (
    <BasicLayout title="Homepage">
      <Button primary big onClick={onClick} disabled={loading}>
        Get Latest Strava Activities
      </Button>

      {loading && <p>Loading...</p>}
    </BasicLayout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = withSession(() => {
  return {
    props: {},
  };
});
