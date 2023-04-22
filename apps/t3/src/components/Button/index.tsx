interface Props extends React.PropsWithChildren {
  handleClick: () => void;
}

const Button = ({ handleClick, children }: Props) => {
  return (
    <button
      className="rounded-full bg-white px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/80"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
