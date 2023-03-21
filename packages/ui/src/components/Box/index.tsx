interface Props extends React.PropsWithChildren {}

/**
 * Box component.
 *
 * @returns JSX.Element
 */
export const Box = ({ children }: Props) => {
  return <div>{children}</div>;
};
