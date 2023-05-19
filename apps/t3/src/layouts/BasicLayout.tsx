import Heading from "~/components/Heading";
import NavBar from "~/components/NavBar";

import PoweredByStravaIcon from "../../public/images/strava/powered-by-strava.svg";

interface Props extends React.PropsWithChildren {
  title: string;
}

const BasicLayout = ({ title, children }: Props) => {
  return (
    <>
      <NavBar />

      <main className="w-full p-10 flex-1">
        <div className="container  mx-auto  max-w-7xl px-2 sm:px-6 lg:px-8">
          <Heading as="h1">{title}</Heading>
          {children}
        </div>
      </main>
      <footer>
        <div className="container  mx-auto  max-w-7xl px-2 sm:px-6 lg:px-8">
          <p>Created by Andrew JD Hudson.</p>
          <p>
            Tech Stack: the T3 stack: Typescript, TRPC, Next.js, Prisma,
            PlanetScale, the Strava API, and (currently) Tailwind.
          </p>
          <PoweredByStravaIcon height="30" className="mt-4 mb-4" />
        </div>
      </footer>
    </>
  );
};

export default BasicLayout;
