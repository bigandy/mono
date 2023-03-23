export type ObjectValues<T> = T[keyof T];

export const FILL_DIRECTIONS = {
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal",
} as const;

export type DirectionTypes = ObjectValues<typeof FILL_DIRECTIONS>;

// Snowflakes

export const FILL_TYPES = {
  ALL: "all",
  BOTTOM: "bottom",
  TOP: "top",
} as const;

export type FillType = ObjectValues<typeof FILL_TYPES>;
