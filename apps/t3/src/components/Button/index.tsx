interface Props extends React.PropsWithChildren {
  handleClick: () => void;
  className?: string;
  primary?: boolean;
  secondary?: boolean;
}

const Button = ({
  primary,
  secondary,
  handleClick,
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
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
