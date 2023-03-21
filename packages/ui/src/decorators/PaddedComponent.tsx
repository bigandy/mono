/**
 * A PaddedComponent Storybook decorator to help give some padding around a component within a component Story
 * @param param0
 */
export const PaddedComponent = (Story: React.FC) => {
  return (
    <div className="storybook__paddedComponent">
      <Story />
    </div>
  );
};
