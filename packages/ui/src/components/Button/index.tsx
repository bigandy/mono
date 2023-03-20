import "./styles.css";

interface Props extends React.PropsWithChildren {
  handleClick?: () => void;
}

/**
 * Button component.
 *
 * @returns JSX.Element
 */
export const Button = ({ handleClick, children }: Props) => {
  return <button onClick={handleClick}>{children}</button>;
};
