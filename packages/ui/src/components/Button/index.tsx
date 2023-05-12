import "./styles.css";
import clsx from "clsx";

interface Props extends React.ComponentProps<"button"> {
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
