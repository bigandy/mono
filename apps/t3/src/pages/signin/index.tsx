import { type GetServerSideProps, type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

import SignInLayout from "~/layouts/SignInLayout";

import withSession from "~/utils/middleware/withSession";
import { redirect } from "~/utils/redirect";

import Button from "~/components/Button";
import Heading from "~/components/Heading";

import ConnectWithStravaIcon from "../../../public/images/strava/connect-with-strava.svg";

const SignInPage: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <SignInLayout title="Sign In">
      <div className="container mx-auto">
        <Heading as="h1">Welcome to Strava Viewer App</Heading>

        <div className="mb-8">
          <p>Please sign in using the strava button below:</p>
        </div>

        {!sessionData && (
          <Button unstyled onClick={() => signIn("strava")} className="group">
            <ConnectWithStravaIcon
              height="100"
              className="group-hover:text-strava-active text-strava transition"
            />
          </Button>
        )}

        <p className="mt-8">
          <small>
            Note: If you don't have a Strava account, then you will need to
            create one to be able to use this app.
          </small>
        </p>
      </div>
    </SignInLayout>
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
