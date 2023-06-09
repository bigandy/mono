import Heading from "~/components/Heading";
import SiteFooter from "~/components/SiteFooter";
import SiteNavBar from "~/components/SiteNavBar";

interface Props extends React.PropsWithChildren {
  title: string;
}

const BasicLayout = ({ title, children }: Props) => {
  return (
    <>
      <SiteNavBar />

      <main className="w-full p-10 flex-1">
        <div className="container  mx-auto  max-w-7xl px-2 sm:px-6 lg:px-8">
          <Heading as="h1">{title}</Heading>
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default BasicLayout;
