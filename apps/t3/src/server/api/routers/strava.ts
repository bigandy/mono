import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  protectedProcedureWithAccount,
} from "~/server/api/trpc";

import {
  type IStravaActivity,
  getAccessToken,
  // updateActivitytoWalk,
  fetchActivities,
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
  getActivitiesFromStrava: protectedProcedureWithAccount.mutation(
    async ({ ctx }) => {
      const { account, user } = ctx.session;

      if (account) {
        const accessToken = await getAccessToken(account, ctx);
        const fetchedActivities: IStravaActivity[] = await fetchActivities(
          accessToken,
          1,
          50
        );

        // loop through the activities;
        await fetchedActivities.reduce((promiseChain, activity) => {
          return promiseChain.then(async () => {
            const data = {
              id: activity.id.toString(),
              name: activity.name,
              distance: activity.distance,
              type: activity.type,
              average_speed: activity.average_speed,
              start_date: activity.start_date,
              private: activity.private,
              average_heartrate: activity.has_heartrate
                ? activity.average_heartrate
                : 0,
              kudos_count: activity.kudos_count,
              achievement_count: activity.achievement_count,
              total_elevation_gain: activity.total_elevation_gain,
              user: { connect: { id: user.id } },
            };

            await ctx.prisma.activity.upsert({
              where: {
                id: data.id,
              },
              create: data,
              update: data,
            });
          });
        }, Promise.resolve());

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
