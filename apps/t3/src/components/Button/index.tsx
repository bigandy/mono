// Whoah, just learned about React.ComponentProps from https://www.youtube.com/shorts/Rf_k8kSAFU0 nice!
interface Props extends React.ComponentProps<"button"> {
  primary?: boolean;
  secondary?: boolean;
  big?: boolean;
}

const Button = ({
  primary,
  secondary,
  big,
  onClick,
  children,
  className,
  ...props
}: Props) => {
  let classes = "bg-white hover:bg-white/80 text-black px-5 py-1";
  if (primary) {
    classes = "bg-black text-white hover:bg-black/60 active:bg-black/80";
  }
  if (big) {
    classes += " px-10 py-4";
  }
  return (
    <button
      className={`rounded-full border    ${classes} font-semibold  no-underline transition  ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
