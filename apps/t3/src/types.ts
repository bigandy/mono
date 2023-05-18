import type { RouterOutputs } from "~/utils/api";

// Mostly correct I think.
export interface IStravaActivity {
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

interface FullStravaActivity {
  resource_state: number;
  athlete: {
    id: number;
    resource_state: number;
  };
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: "VirtualRide";
  sport_type: "VirtualRide";
  id: number;
  start_date: "2023-05-12T16:53:15Z";
  start_date_local: "2023-05-12T17:53:15Z";
  timezone: "(GMT+00:00) Europe/London";
  utc_offset: number;
  location_city: null;
  location_state: null;
  location_country: "United Kingdom";
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: {
    id: string;
    polyline: string;
    resource_state: number;
    summary_polyline: string;
  };
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: "everyone";
  flagged: boolean;
  gear_id: "b147129";
  start_latlng: [-10.781950252130628, 165.83772995509207];
  end_latlng: [-10.779363177716732, 165.83227233029902];
  average_speed: 8.714;
  max_speed: 16.142;
  average_cadence: 80.6;
  average_watts: 185.7;
  max_watts: 586;
  weighted_average_watts: 196;
  kilojoules: 492.8;
  device_watts: true;
  has_heartrate: true;
  average_heartrate: 130.6;
  max_heartrate: 151;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: true;
  elev_high: 136.6;
  elev_low: 62.4;
  upload_id: 9718385016;
  upload_id_str: "9718385016";
  external_id: "zwift-activity-1342192108995362848.fit";
  from_accepted_tag: boolean;
  pr_count: 0;
  total_photo_count: 2;
  has_kudoed: boolean;
  description: "Took it eazy";
  calories: 470;
  perceived_exertion: null;
  prefer_perceived_exertion: boolean;
  segment_efforts: [
    {
      id: 3092159393019247600;
      resource_state: 2;
      name: "Castle to Castle";
      activity: {
        id: 9058892780;
        resource_state: 1;
      };
      athlete: {
        id: 115765;
        resource_state: 1;
      };
      elapsed_time: 2560;
      moving_time: 2557;
      start_date: "2023-05-12T16:53:22Z";
      start_date_local: "2023-05-12T17:53:22Z";
      distance: 22369.9;
      start_index: 7;
      end_index: 2567;
      average_cadence: 80.9;
      device_watts: true;
      average_watts: 187.8;
      average_heartrate: 130.9;
      max_heartrate: 151;
      segment: {
        id: 30629803;
        resource_state: 2;
        name: "Castle to Castle";
        activity_type: "VirtualRide";
        distance: 22369.9;
        average_grade: 0;
        maximum_grade: 11.2;
        elevation_high: 196.6;
        elevation_low: 122.4;
        start_latlng: [-10.781804, 165.837604];
        end_latlng: [-10.781798, 165.837625];
        elevation_profile: null;
        climb_category: 0;
        city: "Nemboe";
        state: "Temotu Province";
        country: "Solomon Islands";
        private: boolean;
        hazardous: boolean;
        starred: boolean;
      };
      pr_rank: null;
      achievements: [];
      hidden: boolean;
    },
    {
      id: 3092159393022331000;
      resource_state: 2;
      name: "Alley Sprint Reverse";
      activity: {
        id: 9058892780;
        resource_state: 1;
      };
      athlete: {
        id: 115765;
        resource_state: 1;
      };
      elapsed_time: 38;
      moving_time: 38;
      start_date: "2023-05-12T17:26:25Z";
      start_date_local: "2023-05-12T18:26:25Z";
      distance: 388.3;
      start_index: 1990;
      end_index: 2028;
      average_cadence: 82.3;
      device_watts: true;
      average_watts: 148.7;
      average_heartrate: 128.9;
      max_heartrate: 131;
      segment: {
        id: 30412916;
        resource_state: 2;
        name: "Alley Sprint Reverse";
        activity_type: "VirtualRide";
        distance: 388.3;
        average_grade: -1;
        maximum_grade: 0;
        elevation_high: 129.4;
        elevation_low: 125.6;
        start_latlng: [-10.798519, 165.84932];
        end_latlng: [-10.801093, 165.847356];
        elevation_profile: null;
        climb_category: 0;
        city: "Nemboe";
        state: "Temotu Province";
        country: "Solomon Islands";
        private: boolean;
        hazardous: boolean;
        starred: boolean;
      };
      pr_rank: 3;
      achievements: [
        {
          type_id: 3;
          type: "pr";
          rank: 3;
        }
      ];
      hidden: boolean;
    },
    {
      id: 3092159393021853700;
      resource_state: 2;
      name: "Tower Sprint";
      activity: {
        id: 9058892780;
        resource_state: 1;
      };
      athlete: {
        id: 115765;
        resource_state: 1;
      };
      elapsed_time: 37;
      moving_time: 37;
      start_date: "2023-05-12T17:32:55Z";
      start_date_local: "2023-05-12T18:32:55Z";
      distance: 312.8;
      start_index: 2380;
      end_index: 2417;
      average_cadence: 75.9;
      device_watts: true;
      average_watts: 153.2;
      average_heartrate: 126.8;
      max_heartrate: 132;
      segment: {
        id: 30412571;
        resource_state: 2;
        name: "Tower Sprint";
        activity_type: "VirtualRide";
        distance: 312.8;
        average_grade: -0.4;
        maximum_grade: 2.7;
        elevation_high: 127;
        elevation_low: 124.4;
        start_latlng: [-10.794754, 165.837561];
        end_latlng: [-10.792618, 165.835876];
        elevation_profile: null;
        climb_category: 0;
        city: "Nemboe";
        state: "Temotu Province";
        country: "Solomon Islands";
        private: boolean;
        hazardous: boolean;
        starred: boolean;
      };
      pr_rank: 3;
      achievements: [
        {
          type_id: 3;
          type: "pr";
          rank: 3;
        }
      ];
      hidden: boolean;
    }
  ];
  splits_metric: [
    {
      distance: 1004.4;
      elapsed_time: 146;
      elevation_difference: 1.6;
      moving_time: 146;
      split: 1;
      average_speed: 6.88;
      average_grade_adjusted_speed: null;
      average_heartrate: 109.29452054794521;
      pace_zone: 0;
    },
    {
      distance: 1002.9;
      elapsed_time: 139;
      elevation_difference: -1.8;
      moving_time: 139;
      split: 2;
      average_speed: 7.22;
      average_grade_adjusted_speed: null;
      average_heartrate: 118.6978417266187;
      pace_zone: 0;
    },
    {
      distance: 996.5;
      elapsed_time: 138;
      elevation_difference: 4.4;
      moving_time: 138;
      split: 3;
      average_speed: 7.22;
      average_grade_adjusted_speed: null;
      average_heartrate: 117.62962962962963;
      pace_zone: 0;
    },
    {
      distance: 998.8;
      elapsed_time: 166;
      elevation_difference: 31;
      moving_time: 166;
      split: 4;
      average_speed: 6.02;
      average_grade_adjusted_speed: null;
      average_heartrate: 130.36144578313252;
      pace_zone: 0;
    },
    {
      distance: 998.4;
      elapsed_time: 181;
      elevation_difference: 33.2;
      moving_time: 181;
      split: 5;
      average_speed: 5.52;
      average_grade_adjusted_speed: null;
      average_heartrate: 134.8342541436464;
      pace_zone: 0;
    },
    {
      distance: 1000.2;
      elapsed_time: 131;
      elevation_difference: 0.2;
      moving_time: 131;
      split: 6;
      average_speed: 7.64;
      average_grade_adjusted_speed: null;
      average_heartrate: 124.83206106870229;
      pace_zone: 0;
    },
    {
      distance: 1008.1;
      elapsed_time: 92;
      elevation_difference: -12.2;
      moving_time: 92;
      split: 7;
      average_speed: 10.96;
      average_grade_adjusted_speed: null;
      average_heartrate: 121.8695652173913;
      pace_zone: 0;
    },
    {
      distance: 997.7;
      elapsed_time: 73;
      elevation_difference: -27.6;
      moving_time: 73;
      split: 8;
      average_speed: 13.67;
      average_grade_adjusted_speed: null;
      average_heartrate: 124.8082191780822;
      pace_zone: 0;
    },
    {
      distance: 1004.7;
      elapsed_time: 77;
      elevation_difference: -26.4;
      moving_time: 77;
      split: 9;
      average_speed: 13.05;
      average_grade_adjusted_speed: null;
      average_heartrate: 129.12987012987014;
      pace_zone: 0;
    },
    {
      distance: 997.8;
      elapsed_time: 92;
      elevation_difference: 0.2;
      moving_time: 92;
      split: 10;
      average_speed: 10.85;
      average_grade_adjusted_speed: null;
      average_heartrate: 143.31521739130434;
      pace_zone: 0;
    },
    {
      distance: 997.4;
      elapsed_time: 97;
      elevation_difference: -0.6;
      moving_time: 97;
      split: 11;
      average_speed: 10.28;
      average_grade_adjusted_speed: null;
      average_heartrate: 142.2680412371134;
      pace_zone: 0;
    },
    {
      distance: 996.9;
      elapsed_time: 99;
      elevation_difference: 1.2;
      moving_time: 99;
      split: 12;
      average_speed: 10.07;
      average_grade_adjusted_speed: null;
      average_heartrate: 146;
      pace_zone: 0;
    },
    {
      distance: 1002.4;
      elapsed_time: 117;
      elevation_difference: -3.2;
      moving_time: 117;
      split: 13;
      average_speed: 8.57;
      average_grade_adjusted_speed: null;
      average_heartrate: 146.03418803418805;
      pace_zone: 0;
    },
    {
      distance: 994.1;
      elapsed_time: 104;
      elevation_difference: 0.2;
      moving_time: 104;
      split: 14;
      average_speed: 9.56;
      average_grade_adjusted_speed: null;
      average_heartrate: 143.15384615384616;
      pace_zone: 0;
    },
    {
      distance: 1003.2;
      elapsed_time: 95;
      elevation_difference: 0.2;
      moving_time: 95;
      split: 15;
      average_speed: 10.56;
      average_grade_adjusted_speed: null;
      average_heartrate: 143.47368421052633;
      pace_zone: 0;
    },
    {
      distance: 1004.6;
      elapsed_time: 105;
      elevation_difference: 0;
      moving_time: 105;
      split: 16;
      average_speed: 9.57;
      average_grade_adjusted_speed: null;
      average_heartrate: 140.1904761904762;
      pace_zone: 0;
    },
    {
      distance: 992.5;
      elapsed_time: 116;
      elevation_difference: 5.8;
      moving_time: 116;
      split: 17;
      average_speed: 8.56;
      average_grade_adjusted_speed: null;
      average_heartrate: 132.35344827586206;
      pace_zone: 0;
    },
    {
      distance: 1000.4;
      elapsed_time: 108;
      elevation_difference: -6.2;
      moving_time: 108;
      split: 18;
      average_speed: 9.26;
      average_grade_adjusted_speed: null;
      average_heartrate: 128.87037037037038;
      pace_zone: 0;
    },
    {
      distance: 1005.2;
      elapsed_time: 121;
      elevation_difference: 2.6;
      moving_time: 121;
      split: 19;
      average_speed: 8.31;
      average_grade_adjusted_speed: null;
      average_heartrate: 130.20661157024793;
      pace_zone: 0;
    },
    {
      distance: 995.1;
      elapsed_time: 103;
      elevation_difference: -3.2;
      moving_time: 103;
      split: 20;
      average_speed: 9.66;
      average_grade_adjusted_speed: null;
      average_heartrate: 127.88349514563107;
      pace_zone: 0;
    },
    {
      distance: 999.9;
      elapsed_time: 108;
      elevation_difference: 1.2;
      moving_time: 108;
      split: 21;
      average_speed: 9.26;
      average_grade_adjusted_speed: null;
      average_heartrate: 133.64814814814815;
      pace_zone: 0;
    },
    {
      distance: 1005.6;
      elapsed_time: 115;
      elevation_difference: -0.8;
      moving_time: 115;
      split: 22;
      average_speed: 8.74;
      average_grade_adjusted_speed: null;
      average_heartrate: 125.6;
      pace_zone: 0;
    },
    {
      distance: 999;
      elapsed_time: 114;
      elevation_difference: 0;
      moving_time: 114;
      split: 23;
      average_speed: 8.76;
      average_grade_adjusted_speed: null;
      average_heartrate: 125.44736842105263;
      pace_zone: 0;
    },
    {
      distance: 113.3;
      elapsed_time: 16;
      elevation_difference: 0.4;
      moving_time: 16;
      split: 24;
      average_speed: 7.08;
      average_grade_adjusted_speed: null;
      average_heartrate: 121.6875;
      pace_zone: 0;
    }
  ];
  splits_standard: [
    {
      distance: 1611;
      elapsed_time: 240;
      elevation_difference: 2;
      moving_time: 240;
      split: 1;
      average_speed: 6.71;
      average_grade_adjusted_speed: null;
      average_heartrate: 113.47083333333333;
      pace_zone: 0;
    },
    {
      distance: 1607.7;
      elapsed_time: 213;
      elevation_difference: 7.8;
      moving_time: 213;
      split: 2;
      average_speed: 7.55;
      average_grade_adjusted_speed: null;
      average_heartrate: 118.4;
      pace_zone: 0;
    },
    {
      distance: 1610.4;
      elapsed_time: 280;
      elevation_difference: 52.6;
      moving_time: 280;
      split: 3;
      average_speed: 5.75;
      average_grade_adjusted_speed: null;
      average_heartrate: 133.39642857142857;
      pace_zone: 0;
    },
    {
      distance: 1612.2;
      elapsed_time: 207;
      elevation_difference: -4;
      moving_time: 207;
      split: 4;
      average_speed: 7.79;
      average_grade_adjusted_speed: null;
      average_heartrate: 125.15458937198068;
      pace_zone: 0;
    },
    {
      distance: 1608.2;
      elapsed_time: 130;
      elevation_difference: -29.6;
      moving_time: 130;
      split: 5;
      average_speed: 12.37;
      average_grade_adjusted_speed: null;
      average_heartrate: 124.71538461538462;
      pace_zone: 0;
    },
    {
      distance: 1611.8;
      elapsed_time: 130;
      elevation_difference: -26.2;
      moving_time: 130;
      split: 6;
      average_speed: 12.4;
      average_grade_adjusted_speed: null;
      average_heartrate: 135.23846153846154;
      pace_zone: 0;
    },
    {
      distance: 1614.3;
      elapsed_time: 159;
      elevation_difference: 0.8;
      moving_time: 159;
      split: 7;
      average_speed: 10.15;
      average_grade_adjusted_speed: null;
      average_heartrate: 143.42767295597486;
      pace_zone: 0;
    },
    {
      distance: 1601.4;
      elapsed_time: 172;
      elevation_difference: -1.4;
      moving_time: 172;
      split: 8;
      average_speed: 9.31;
      average_grade_adjusted_speed: null;
      average_heartrate: 145.76162790697674;
      pace_zone: 0;
    },
    {
      distance: 1608.7;
      elapsed_time: 168;
      elevation_difference: -0.8;
      moving_time: 168;
      split: 9;
      average_speed: 9.58;
      average_grade_adjusted_speed: null;
      average_heartrate: 143.04761904761904;
      pace_zone: 0;
    },
    {
      distance: 1616.1;
      elapsed_time: 163;
      elevation_difference: -0.8;
      moving_time: 163;
      split: 10;
      average_speed: 9.91;
      average_grade_adjusted_speed: null;
      average_heartrate: 141.32515337423314;
      pace_zone: 0;
    },
    {
      distance: 1606;
      elapsed_time: 182;
      elevation_difference: -0.4;
      moving_time: 182;
      split: 11;
      average_speed: 8.82;
      average_grade_adjusted_speed: null;
      average_heartrate: 131.16483516483515;
      pace_zone: 0;
    },
    {
      distance: 1605.1;
      elapsed_time: 182;
      elevation_difference: 0.4;
      moving_time: 182;
      split: 12;
      average_speed: 8.82;
      average_grade_adjusted_speed: null;
      average_heartrate: 129.37912087912088;
      pace_zone: 0;
    },
    {
      distance: 1611.8;
      elapsed_time: 173;
      elevation_difference: 0.6;
      moving_time: 173;
      split: 13;
      average_speed: 9.32;
      average_grade_adjusted_speed: null;
      average_heartrate: 131.43930635838151;
      pace_zone: 0;
    },
    {
      distance: 1609.6;
      elapsed_time: 184;
      elevation_difference: -1;
      moving_time: 184;
      split: 14;
      average_speed: 8.75;
      average_grade_adjusted_speed: null;
      average_heartrate: 125.57608695652173;
      pace_zone: 0;
    },
    {
      distance: 584.8;
      elapsed_time: 70;
      elevation_difference: 0.2;
      moving_time: 70;
      split: 15;
      average_speed: 8.35;
      average_grade_adjusted_speed: null;
      average_heartrate: 124.71428571428571;
      pace_zone: 0;
    }
  ];
  laps: [
    {
      id: 30833366955;
      resource_state: 2;
      name: "Lap 1";
      activity: {
        id: 9058892780;
        resource_state: 1;
      };
      athlete: {
        id: 115765;
        resource_state: 1;
      };
      elapsed_time: 2656;
      moving_time: 2655;
      start_date: "2023-05-12T16:53:15Z";
      start_date_local: "2023-05-12T17:53:15Z";
      distance: 23119.1;
      start_index: 0;
      end_index: 2653;
      total_elevation_gain: 113.6;
      average_speed: 8.71;
      max_speed: 16.142;
      average_cadence: 80.6;
      device_watts: true;
      average_watts: 185.7;
      average_heartrate: 130.6;
      max_heartrate: 151;
      lap_index: 1;
      split: 1;
    }
  ];
  gear: {
    id: "b147129";
    primary: boolean;
    name: "Road Bike";
    nickname: "Road Bike";
    resource_state: 2;
    retired: boolean;
    distance: 2641799;
    converted_distance: 1641.5;
  };
  photos: {
    primary: {
      unique_id: "56f31731-7446-48ca-85fb-868cd8ec6ee4";
      urls: {
        "100": "https://dgtzuqphqg23d.cloudfront.net/6nqsWjuaTi_E8U4sISXH8N6x4l3oYK7nFv0B6CMrWys-128x96.jpg";
        "600": "https://dgtzuqphqg23d.cloudfront.net/6nqsWjuaTi_E8U4sISXH8N6x4l3oYK7nFv0B6CMrWys-768x576.jpg";
      };
      source: 1;
      media_type: 1;
    };
    use_primary_photo: true;
    count: 2;
  };
  stats_visibility: [
    {
      type: "heart_rate";
      visibility: "everyone";
    },
    {
      type: "pace";
      visibility: "everyone";
    },
    {
      type: "power";
      visibility: "everyone";
    },
    {
      type: "speed";
      visibility: "everyone";
    },
    {
      type: "calories";
      visibility: "everyone";
    }
  ];
  hide_from_home: boolean;
  device_name: "Zwift";
  embed_token: "7f3a600b5b4233e3699898eece4bf693d8636132";
  available_zones: [];
}

interface PolylineMap {
  id: string;
  polyline: string;
  summary_polyline: string;
}

export type ActivityKeys = keyof IStravaActivity;

export type Activity = RouterOutputs["strava"]["getActivitiesFromDB"][number];

export const activities = [
  "Run",
  "Trail Run",
  "Walk",
  "Hike",
  "Virtual Run",
  "Ride",
  "Mountain Bike Ride",
  "Gravel Bike Ride",
  "E-Bike Ride",
  "E-Mountain Bike Ride",
  "Velomobile",
  "Virtual Ride ",
  "Canoe",
  "Kayak",
  "Kitesurf Session",
  "Row",
  "Stand Up Paddle",
  "Surf",
  "Swim",
  "Windsurf Session",
  "Winter Sports",
  "Ice Skate",
  "Alpine Ski",
  "Backcountry Ski",
  "Nordic Ski",
  "Snowboard",
  "Snowshoe",
  "Other Sports",
  "Golf",
  "Handcycle",
  "Inline Skate",
  "Rock Climb",
  "Roller Ski",
  "Wheelchair",
  "Crossfit",
  "Elliptical",
  "Sailing",
  "Skateboarding",
  "Soccer",
  "Stair Stepper",
  "Weight Training",
  "Yoga",
  "Workout",
  "Tennis",
  "Pickleball",
  "Racquetball",
  "Squash",
  "Badminton",
  "Table Tennis",
  "HIIT",
  "Pilates",
  "Virtual Row",
] as const;

export type ActivityType = (typeof activities)[number];
