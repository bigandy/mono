import SiteFooter from "~/components/SiteFooter";
import NavBar from "~/components/SiteNavBar";

interface Props extends React.PropsWithChildren {
  title: string;
}

const SignInLayout = ({ children }: Props) => {
  return (
    <>
      <NavBar signedIn={false} />

      <main className="w-full p-10 flex-1">
        <div className="container  mx-auto  max-w-7xl px-2 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default SignInLayout;
