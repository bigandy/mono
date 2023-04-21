import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { default as stravaApi } from "strava-v3";

export const stravaRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getActivities: protectedProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ ctx, input }) => {
      const account = await ctx.prisma.account.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

      // let accessToken: string | null = null;
      if (account) {
        // accessToken = getToken.access_token!;

        const { expires_at } = account;

        const secondsSinceEpoch = Math.round(Date.now() / 1000);
        let accessToken = account.access_token;

        // console.log({ secondsSinceEpoch, expires_at });
        if (secondsSinceEpoch > expires_at) {
          console.log("need a new token");
          const { access_token, refresh_token, expires_at } =
            await rotateAccessToken(account.refresh_token);

          accessToken = access_token;

          // TODO: Replace updateMany with update.
          const accountDerp = await ctx.prisma.account.updateMany({
            where: {
              userId: ctx.session.user.id,
            },
            data: {
              provider: "strava",
              access_token,
              refresh_token,
              expires_at,
            },
          });

          console.log({ accountDerp });
        } else {
          console.log("access token is still valid. Woop!");
        }

        const activities = await fetchActivities(accessToken, input.page);

        return activities;
      } else {
        return [];
      }
    }),
});

interface PolylineMap {
  id: string;
  polyline: string;
  summary_polyline: string;
}

// Mostly correct I think.
export interface StravaActivity {
  resource_state: number;
  athlete: any;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  id: number;
  start_date: Date;
  start_date_local: Date;
  timezone: string;
  utc_offset: number;
  location_city: null;
  location_state: null;
  location_country: string;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: PolylineMap;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  flagged: boolean;
  gear_id: string;
  start_latlng: Record<string, string>;
  end_latlng: Record<string, string>;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  has_heartrate: true;
  average_heartrate: number;
  max_heartrate: number;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: true;
  elev_high: number;
  elev_low: number;
  upload_id: number;
  upload_id_str: string;
  external_id: string;
  from_accepted_tag: false;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
}

const rotateAccessToken = async (refreshToken: string) => {
  const newToken = await stravaApi.oauth.refreshToken(refreshToken);

  // console.log({ newToken });
  const { access_token, refresh_token, expires_at } = newToken;
  // if (!access_token || !refresh_token) {
  //   return;
  // }

  console.log("success in generating new tokens", {
    access_token,
    refresh_token,
    expires_at,
  });

  return { access_token, refresh_token, expires_at };
};

const getStravaClient = (accessToken: string) => {
  return new (stravaApi.client as any)(accessToken);
};

const fetchActivities = async (accessToken: string, page: number = 1) => {
  try {
    const stravaAPI = getStravaClient(accessToken);

    const payload = await stravaAPI.athlete.listActivities({
      page: page,
      per_page: 25,
    });

    return payload;
  } catch (error) {
    // @ts-ignore
    if (error?.error?.errors[0]?.code === "invalid") {
      return Error("invalid access token, need another");
    }
    return Error("error in fetch activities");
  }
};
