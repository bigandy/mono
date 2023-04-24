interface Props extends React.PropsWithChildren {
  as?: HeadingTag;
}

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const Heading = ({ as = "h1", children }: Props) => {
  const Tag = as;

  let textFontSize = "";
  switch (as) {
    case "h1":
      textFontSize = "text-4xl";
      break;
    case "h2":
      textFontSize = "text-3xl";
      break;
    case "h3":
      textFontSize = "text-2xl";
      break;
    default:
      textFontSize = "";
      break;
  }

  return <Tag className={`mb-4 ${textFontSize} font-bold`}>{children}</Tag>;
};

export default Heading;
