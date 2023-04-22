export const convertMetersToKilometers = (meters: number): number => {
  return Number((meters / 1000).toFixed(2));
};

export const convertMetersToMiles = (meters: number): number => {
  return Number((meters * 0.000621371).toFixed(2));
};
