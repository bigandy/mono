// Whoah, just learned about React.ComponentProps from https://www.youtube.com/shorts/Rf_k8kSAFU0 nice!
interface Props extends React.ComponentProps<"button"> {
  primary?: boolean;
  secondary?: boolean;
  big?: boolean;
  loading?: boolean;
  unstyled?: boolean;
}

const Button = ({
  primary,
  secondary,
  big,
  onClick,
  children,
  className,
  loading = false,
  unstyled = false,
  ...props
}: Props) => {
  let classes = `bg-white hover:bg-white/80 text-black px-5 py-1 rounded-full border font-semibold  no-underline transition  ${className}`;
  if (primary) {
    classes = `bg-black text-white hover:bg-black/60 active:bg-black/80 px-5 py-1 rounded-full border border font-semibold  no-underline transition   ${className}`;
  }
  if (big) {
    classes += " px-10 py-4";
  }
  if (unstyled) {
    classes = "";
  }
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? "loading" : children}
    </button>
  );
};

export default Button;
