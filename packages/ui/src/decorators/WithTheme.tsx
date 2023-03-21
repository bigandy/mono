export const WithTheme = (Story: React.FC, context: any) => {
  const { scheme } = context.globals;

  const LightTheme = () => (
    <div className="color-scheme--light">
      <Story />
    </div>
  );

  const DarkTheme = () => (
    <div className="color-scheme--dark">
      <Story />
    </div>
  );

  if (scheme === "dark") {
    return <DarkTheme />;
  }

  if (scheme === "light") {
    return <LightTheme />;
  }

  return (
    <div>
      <LightTheme />
      <DarkTheme />
    </div>
  );
};
