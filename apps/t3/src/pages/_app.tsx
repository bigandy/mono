import { Fragment } from "react";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Head from "next/head";

import { Toaster } from "react-hot-toast";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Fragment>
      <Head>
        <title>Strava App</title>
        <meta
          name="description"
          content="A Strava Powered app created by Andrew JD Hudson"
        />
        <link rel="icon" href="/images/strava/strava-favicon.svg" />
      </Head>
      <SessionProvider session={session}>
        <Toaster />
        <Component {...pageProps} />
      </SessionProvider>
    </Fragment>
  );
};

export default api.withTRPC(MyApp);
