import stravaApi from "strava-v3";

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

// Mostly correct I think.
export interface StravaActivity {
  id: number;
  resource_state: number;
  athlete: any;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
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

interface PolylineMap {
  id: string;
  polyline: string;
  summary_polyline: string;
}

export type ActivityKeys = keyof StravaActivity;
