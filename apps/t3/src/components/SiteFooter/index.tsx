import PoweredByStravaIcon from "../../../public/images/strava/powered-by-strava.svg";

const SiteFooter = () => {
  return (
    <footer>
      <div className="container  mx-auto  max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <PoweredByStravaIcon height="30" className="mt-4 mb-4" />
          <p>Created by Andrew JD Hudson.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
