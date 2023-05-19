import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        strava: "#fc5200",
        "strava-active": "#cc4200",
      },
    },
  },
  plugins: [],
} satisfies Config;
