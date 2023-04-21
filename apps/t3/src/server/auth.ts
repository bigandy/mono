import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import StravaProvider from "next-auth/providers/strava";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
      /** Oauth access token */
      accessToken?: string;
    } & DefaultSession["user"];
  }

  interface User {
    //   // ...other properties
    //   // role: UserRole;
    accessToken: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      // console.log({ user, session });
      session.user.id = user.id;
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    // Strava. See https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/providers/strava.ts
    StravaProvider({
      clientId: env.STRAVA_CLIENT_ID,
      clientSecret: env.STRAVA_CLIENT_SECRET,
      authorization: {
        url: "https://www.strava.com/api/v3/oauth/authorize",
        params: {
          scope: "profile:read_all,activity:read_all,activity:write",
          approval_prompt: "auto",
          response_type: "code",
        },
      },
      // This removes athlete from the return
      // See: https://github.com/nextauthjs/next-auth/discussions/5279
      token: {
        async request({ client, params, checks, provider }) {
          const { token_type, expires_at, refresh_token, access_token } =
            await client.oauthCallback(provider.callbackUrl, params, checks);
          return {
            tokens: { token_type, expires_at, refresh_token, access_token },
          };
        },
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Strava provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
