// Whoah, just learned about React.ComponentProps from https://www.youtube.com/shorts/Rf_k8kSAFU0 nice!
interface Props extends React.ComponentProps<"button"> {
  primary?: boolean;
  secondary?: boolean;
}

const Button = ({
  primary,
  secondary,
  onClick,
  children,
  className,
  ...props
}: Props) => {
  let paddingClass = "px-5 py-1";
  if (primary) {
    paddingClass = "px-10 py-3";
  }
  if (secondary) {
    paddingClass = "px-5 py-1";
  }
  return (
    <button
      className={`rounded-full border bg-white ${paddingClass} font-semibold text-black no-underline transition hover:bg-white/80 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
