interface Props extends React.PropsWithChildren {
  handleClick: () => void;
  className?: string;
}

const Button = ({ handleClick, children, className, ...props }: Props) => {
  return (
    <button
      className={`rounded-full border bg-white px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/80 ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
