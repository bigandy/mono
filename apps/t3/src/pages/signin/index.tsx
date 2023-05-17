import { type NextPage } from "next";

import BasicLayout from "~/layouts/BasicLayout";

import { type GetServerSideProps } from "next";

import withSession from "~/utils/middleware/withSession";
import { redirect } from "~/utils/redirect";

import { signIn, useSession } from "next-auth/react";
import Button from "~/components/Button";

const SignInPage: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <BasicLayout title="Sign In">
      <div className="container mx-auto">
        {!sessionData && (
          <Button onClick={() => void signIn("strava")}>{"Sign in"}</Button>
        )}
      </div>
    </BasicLayout>
  );
};

export default SignInPage;

// @ts-expect-error TODO: Need to fix typing of ctx
export const getServerSideProps: GetServerSideProps = withSession((ctx) => {
  if (ctx.req.session) {
    return redirect(ctx, "/");
  }
  return {
    props: {},
  };
});
