import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import stravaApi from "strava-v3";

const getAccessToken = async (account: any, ctx: any) => {
  const expires_at = account.expires_at!;

  const secondsSinceEpoch = Math.round(Date.now() / 1000);
  let accessToken = account.access_token!;

  // check if the expires_at is in the past. If it is the access_token should still be valid.
  if (secondsSinceEpoch > expires_at) {
    console.log("need a new token");
    const { access_token, refresh_token, expires_at } = await rotateAccessToken(
      account.refresh_token!
    );

    accessToken = access_token;

    // TODO: Replace updateMany with update.
    await ctx.prisma.account.updateMany({
      where: {
        userId: ctx.session.user.id,
        provider: "strava",
      },
      data: {
        access_token,
        refresh_token,
        expires_at,
      },
    });

    return accessToken;
  } else {
    // console.log("access token is still valid. Woop!");
    return accessToken;
  }
};

export const stravaRouter = createTRPCRouter({
  convertActivity: protectedProcedure
    .input(
      z.object({
        activityId: z.string(),
        activityName: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.activityId === "" && input.activityName !== "") {
        return {
          message: "no activity id",
        };
      }
      // console.log("convert this activity: ", input);

      // Get the associated tokens: access_token, refresh_token, and expires_at
      const account = await ctx.prisma.account.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

      if (account) {
        const accessToken = await getAccessToken(account, ctx);
        const res = await updateActivity(
          accessToken,
          input.activityId,
          input.activityName
        );

        return { message: "success", res };
      }

      // return { message: "success" };
    }),
  getActivities: protectedProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ ctx, input }) => {
      // Get the associated tokens: access_token, refresh_token, and expires_at
      const account = await ctx.prisma.account.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

      if (account) {
        const accessToken = await getAccessToken(account, ctx);
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
  start_date: string;
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

  const { access_token, refresh_token, expires_at } = newToken;

  console.log("success in generating new tokens", {
    // access_token,
    // refresh_token,
    // expires_at,
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

const updateActivity = async (
  accessToken: string,
  activityId: string,
  activityName: string
) => {
  try {
    const stravaAPI = getStravaClient(accessToken);

    var args = {
      id: activityId,
      name: activityName.replace(/run/gi, "walk"),
      sport_type: "Walk",
      type: "Walk",
    };

    const payload = await stravaAPI.activities.update(args);
    // console.log({ payload });

    return payload;
  } catch (error) {
    // @ts-ignore
    if (error?.error?.errors[0]?.code === "invalid") {
      return Error("invalid access token, need another");
    }
    return Error("error in fetch activities");
  }
};
