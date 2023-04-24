import { type NextPage } from "next";
import Heading from "~/components/Heading";

import BasicLayout from "~/layouts/BasicLayout";

const Home: NextPage = () => {
  return (
    <BasicLayout title="Homepage">
      <Heading as="h1">Welcome</Heading>
    </BasicLayout>
  );
};

export default Home;
