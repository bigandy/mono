import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  protectedProcedureWithAccount,
} from "~/server/api/trpc";

import {
  type StravaActivity,
  getAccessToken,
  updateActivitytoWalk,
  fetchActivities,
} from "./utils/strava";

export const stravaRouter = createTRPCRouter({
  convertOneActivity: protectedProcedureWithAccount
    .input(
      z.object({
        activityId: z.string(),
        activityName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.activityId && input.activityName === "") {
        return {
          message: "no activity id",
        };
      }
      // console.log("convert this activity: ", input);

      // Get the associated tokens: access_token, refresh_token, and expires_at
      const { account } = ctx.session;

      if (account) {
        const accessToken = await getAccessToken(
          {
            access_token: account.access_token!,
            expires_at: account.expires_at!,
            refresh_token: account.refresh_token!,
          },
          ctx
        );
        const res = await updateActivitytoWalk(
          accessToken,
          input.activityId,
          input.activityName
        );

        return { message: "success", res };
      }
    }),
  saveOneActivity: protectedProcedure
    .input(
      z.object({
        activityId: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.activityId) {
        return {
          message: "no activity id",
        };
      }

      const { user } = ctx.session;

      // await ctx.prisma.activity.create({
      //   data: {
      //     id: input.activityId,
      //     name: "derp",
      //     distance: 10.3,
      //     type: "Run",
      //     startDate: "15.05.2023",
      //     user: { connect: { id: user.id } },
      //   },
      // });

      console.log("save one Activity please", user);

      return { message: "success" };
    }),
  saveManyActivities: protectedProcedure
    .input(
      z.object({
        activityIds: z.array(z.number()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.activityIds?.length === 0) {
        return {
          message: "no activity ids",
        };
      }

      console.log("save many Activities please", input.activityIds);

      return { message: "success" };
    }),
  getActivities: protectedProcedureWithAccount
    .input(z.object({ page: z.number(), activities_count: z.number() }))
    .query(async ({ ctx, input }) => {
      const { account } = ctx.session;

      // Get the associated tokens: access_token, refresh_token, and expires_at

      if (account) {
        const accessToken = await getAccessToken(account, ctx);
        const fetchedActivities: StravaActivity[] = await fetchActivities(
          accessToken,
          input.page,
          // input.activities_count
          1
        );

        return fetchedActivities;
      } else {
        return [];
      }
    }),
});
