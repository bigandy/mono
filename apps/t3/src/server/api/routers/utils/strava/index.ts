import stravaApi from "strava-v3";

import { ActivityType } from "~/types";

/**
 * A method to get a Strava Access Token
 * @param account
 * @param ctx
 * @returns accessToken string
 */
export const getAccessToken = async (
  account: { access_token: string; expires_at: number; refresh_token: string },
  ctx: any
) => {
  const expires_at = account.expires_at;

  const secondsSinceEpoch = Math.round(Date.now() / 1000);
  let accessToken = account.access_token;

  // check if the expires_at is in the past. If it is the access_token should still be valid.
  if (secondsSinceEpoch > expires_at) {
    console.log("need a new token");
    const { access_token, refresh_token, expires_at } = await rotateAccessToken(
      account.refresh_token
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

/**
 * A method to get new access token from the Strava API
 * @param refreshToken string
 * @returns {access_token, refresh_token, expires_at}
 */
export const rotateAccessToken = async (
  refreshToken: string
): Promise<{
  access_token: string;
  refresh_token: string;
  expires_at: number;
}> => {
  const newToken = await stravaApi.oauth.refreshToken(refreshToken);

  const { access_token, refresh_token, expires_at } = newToken;

  return { access_token, refresh_token, expires_at };
};

const getStravaClient = (accessToken: string) => {
  return new (stravaApi.client as any)(accessToken);
};

/**
 * A method that calls the Strava API to get a specified number of activities on a specified page.
 * @param accessToken
 * @param page
 * @param activities_count
 * @returns activities from Strava API
 */
export const fetchActivities = async (
  accessToken: string,
  page: number = 1,
  activities_count: number = 10
) => {
  try {
    const stravaAPI = getStravaClient(accessToken);

    const payload = await stravaAPI.athlete.listActivities({
      page: page,
      per_page: activities_count,
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

/**
 * A method that calls the Strava API to get a specified activity
 * @param accessToken
 * @param activity_id
 * @returns activities from Strava API
 */
export const fetchOneActivity = async (
  accessToken: string,
  activity_id: string
) => {
  try {
    const stravaAPI = getStravaClient(accessToken);

    const payload = await stravaAPI.activities.get({
      id: activity_id,
      // includeAllEfforts: true, // {Boolean} To include all segments efforts
    });

    return payload;
  } catch (error) {
    // @ts-ignore
    if (error?.error?.errors[0]?.code === "invalid") {
      return Error("invalid access token, need another");
    }
    return Error("error in fetch one activity");
  }
};

/**
 * Update one activity in Strava. Currently only name and type are allowed.
 * @param accessToken
 * @param activityId
 * @param data
 * @returns
 */
export const updateOneActivity = async (
  accessToken: string,
  activityId: string,
  data: {
    name: string;
    type: ActivityType;
  }
) => {
  try {
    const stravaAPI = getStravaClient(accessToken);

    var args = {
      id: activityId,
      name: data.name,
      sport_type: data.type,
      type: data.type,
    };

    await stravaAPI.activities.update(args);

    return { message: "success" };
  } catch (error) {
    console.log(error);
    // @ts-ignore
    if (error?.error?.errors[0]?.code === "invalid") {
      return Error("invalid access token, need another");
    }
    return Error("error in fetch activities");
  }
};

/**
 * A method for updating an activity to a walk
 * @param accessToken
 * @param activityId
 * @param activityName
 * @returns
 */
export const updateActivitytoWalk = async (
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

    await stravaAPI.activities.update(args);
    // console.log({ payload });

    return { message: "success" };
  } catch (error) {
    // @ts-ignore
    if (error?.error?.errors[0]?.code === "invalid") {
      return Error("invalid access token, need another");
    }
    return Error("error in fetch activities");
  }
};
