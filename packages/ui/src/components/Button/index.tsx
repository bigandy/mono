import "./styles.css";
import clsx from "clsx";

interface Props extends React.PropsWithChildren {
  onClick?: () => void;
  primary?: boolean;
}

/**
 * Button component.
 *
 * @returns JSX.Element
 */
export const Button = ({ onClick, children, primary }: Props) => {
  return (
    <button
      onClick={onClick}
      className={clsx("btn", {
        "btn--primary": primary,
      })}
    >
      {children}
    </button>
  );
};
