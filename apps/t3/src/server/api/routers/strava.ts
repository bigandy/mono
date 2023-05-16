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

const stravaActivityZod = z.object({
  activityId: z.string(),
  name: z.string(),
  start_date: z.string(),
  distance: z.number(),
  type: z.string(),
  average_speed: z.number(),
  private: z.boolean(),
});

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
  // saveOneActivity: protectedProcedure
  //   .input(stravaActivityZod)
  //   .mutation(async ({ ctx, input }) => {
  //     if (!input.activityId) {
  //       return {
  //         message: "no activity id",
  //       };
  //     }

  //     const { user } = ctx.session;

  //     await ctx.prisma.activity.create({
  //       data: {
  //         id: input.activityId.toString(),
  //         name: input.name,
  //         distance: input.distance,
  //         type: input.type,
  //         average_speed: input.average_speed,
  //         start_date: input.start_date,
  //         private: input.private,
  //         user: { connect: { id: user.id } },
  //       },
  //     });

  //     console.log("save one Activity please", user);

  //     return { message: "success" };
  //   }),
  // saveManyActivities: protectedProcedure
  //   .input(z.object({ activities: z.array(stravaActivityZod) }))
  //   .mutation(async ({ input }) => {
  //     if (input.activities.length === 0) {
  //       return {
  //         message: "no activity ids",
  //       };
  //     }

  //     console.log("save many Activities please", input.activities);

  //     return { message: "success" };
  //   }),
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
  deleteAllDBActivities: protectedProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx.session;

    const activities = await ctx.prisma.activity.deleteMany({
      where: {
        user: {
          id: user.id,
        },
      },
    });
    return { message: "success", activities };
  }),
  getActivitiesFromStrava: protectedProcedureWithAccount
    .input(z.object({}))
    .mutation(async ({ ctx }) => {
      const { account, user } = ctx.session;

      if (account) {
        const accessToken = await getAccessToken(account, ctx);
        const fetchedActivities: StravaActivity[] = await fetchActivities(
          accessToken,
          1,
          100
        );
        // console.log({ fetchedActivities });
        // return fetchedActivities;

        // loop through the activities;
        await fetchedActivities.reduce((promiseChain, activity) => {
          return promiseChain.then(async () => {
            await ctx.prisma.activity.create({
              data: {
                id: activity.id.toString(),
                name: activity.name,
                distance: activity.distance,
                type: activity.type,
                average_speed: activity.average_speed,
                start_date: activity.start_date,
                private: activity.private,
                user: { connect: { id: user.id } },
              },
            });
          });
        }, Promise.resolve());

        return {
          message: "success",
        };
      } else {
        return [];
      }
    }),
});
