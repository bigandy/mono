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
      const getToken = await ctx.prisma.account.findFirst({
        // where: {
        //   userId: user.id,
        // },
      });

      let accessToken: string | null = null;
      if (getToken) {
        accessToken = getToken.access_token!;

        const activities = await fetchActivities(accessToken, input.page);

        return activities;
      } else {
        return "no activities";
      }

      // return accessToken;

      // return ctx.prisma.example.findMany();

      // const session = await getServerSession(authOptions);

      // console.log({ session });
      // const getToken = await ctx.prisma.account.findFirst({
      //   where: {
      //     userId: user.id,
      //   },
      // });

      // let accessToken: string | null = null;
      // if (getToken) {
      //   accessToken = getToken.access_token!;
      // }

      // return "getActivities - a WIP";
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

const fetchActivities = async (accessToken: string, page: number = 1) => {
  try {
    const stravaAPI = new (stravaApi.client as any)(accessToken);

    const payload = await stravaAPI.athlete.listActivities({
      page: page,
      per_page: 10,
    });

    // const payload = await stravaAPI.athlete.listActivities({
    //   page: 3,
    //   per_page: 100,
    // });

    // const token = await stravaAPI.oauth.getToken(accessToken);

    // console.log({ token });

    console.log({ payload });
    return payload;

    // return [];
  } catch (error) {
    console.error("error in fetchActivities", error);
    console.error("error in fetchActivities", error?.error?.errors);
    return Error("error in fetch activities");
  }
};
