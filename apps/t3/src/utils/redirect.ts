import { NextPageContext } from "next";

export const redirect = (context: NextPageContext, location: string) => {
  return {
    redirect: {
      destination: location,
      permanent: false,
    },
  };
};
