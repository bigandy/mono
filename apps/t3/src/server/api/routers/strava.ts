import {
  createTRPCRouter,
  protectedProcedure,
  protectedProcedureWithAccount,
} from "~/server/api/trpc";
import { activities, ActivityType, type IStravaActivity } from "~/types";
import { z } from "zod";

import {
  // updateActivitytoWalk,
  fetchActivities,
  fetchOneActivity,
  getAccessToken,
  saveAllActivitiesToDB,
  updateOneActivity,
} from "./utils/strava";

// const stravaActivityZod = z.object({
//   activityId: z.string(),
//   name: z.string(),
//   start_date: z.string(),
//   distance: z.number(),
//   type: z.string(),
//   average_speed: z.number(),
//   private: z.boolean(),
// });

export const stravaRouter = createTRPCRouter({
  getActivitiesFromDB: protectedProcedure
    .input(z.object({ page: z.number(), activities_count: z.number() }))
    .query(async ({ ctx }) => {
      const { user } = ctx.session;

      const activities = await ctx.prisma.activity.findMany({
        where: {
          user: {
            id: user.id,
          },
        },
        orderBy: {
          start_date: "desc",
        },
      });
      return activities;
    }),
  updateOneActivity: protectedProcedureWithAccount
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        type: z.enum(activities),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { account } = ctx.session;

      if (account) {
        const accessToken = await getAccessToken(account, ctx);
        await Promise.all([
          updateOneActivity(accessToken, input.id, {
            name: input.name,
            type: input.type,
          }),
          ctx.prisma.activity.update({
            where: {
              id: input.id,
            },
            data: {
              name: input.name,
              type: input.type,
            },
          }),
        ]);
      }
    }),
  deleteDBActivities: protectedProcedure
    .input(z.object({ rowIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;
      const { rowIds } = input;

      await ctx.prisma.activity.deleteMany({
        where: {
          user: {
            id: user.id,
          },
          id: {
            in: rowIds,
          },
        },
      });
      return { message: "success" };
    }),
  getActivityFromDB: protectedProcedure
    .input(z.object({ activityId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { user } = ctx.session;
      const { activityId } = input;

      if (activityId === "") {
        // return TRPCClientError
        return;
      }

      const activities = await ctx.prisma.activity.findMany({
        where: {
          user: {
            id: user.id,
          },
          id: activityId,
        },
      });
      return activities[0];
    }),
  getOneActivityFromStrava: protectedProcedureWithAccount
    .input(z.object({ activityId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { account } = ctx.session;
      if (account) {
        const accessToken = await getAccessToken(account, ctx);

        const fetchedActivity: IStravaActivity = await fetchOneActivity(
          accessToken,
          input.activityId
        );

        return fetchedActivity;
      } else {
        return null;
      }
    }),
  getAllActivitiesFromStrava: protectedProcedureWithAccount.mutation(
    async ({ ctx }) => {
      const { account, user } = ctx.session;

      let page = 1;

      // get 1000 activities
      if (account) {
        let fetchedActivities: IStravaActivity[] = [];
        do {
          const accessToken = await getAccessToken(account, ctx);

          fetchedActivities = await fetchActivities(accessToken, page, 100);
          console.log(fetchedActivities.length, page);

          await saveAllActivitiesToDB(ctx, fetchedActivities, user);
          page++;
        } while (fetchedActivities.length !== 0 && page <= 10);

        return {
          message: "success",
        };
      } else {
        return {
          message: "failure",
        };
      }
    }
  ),
  getRecentActivitiesFromStrava: protectedProcedureWithAccount.mutation(
    async ({ ctx }) => {
      const { account, user } = ctx.session;

      if (account) {
        const accessToken = await getAccessToken(account, ctx);
        const fetchedActivities: IStravaActivity[] = await fetchActivities(
          accessToken,
          1,
          50
        );

        await saveAllActivitiesToDB(ctx, fetchedActivities, user);

        return {
          message: "success",
        };
      } else {
        return {
          message: "failure",
        };
      }
    }
  ),
});
