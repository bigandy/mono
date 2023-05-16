import { type NextPage } from "next";

import BasicLayout from "~/layouts/BasicLayout";

import { type GetServerSideProps } from "next";

import withSession from "~/utils/middleware/withSession";
import { redirect } from "~/utils/redirect";

const Home: NextPage = () => {
  return <BasicLayout title="Homepage"></BasicLayout>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = withSession((ctx) => {
  if (!ctx.req.session) {
    return redirect(ctx, "/signin");
  }
  return {
    props: {},
  };
});
