// import "./styles.css";

export type AllowedTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface Props extends React.PropsWithChildren {
  Tag?: AllowedTag;
}

/**
 * Heading component.
 *
 * @property Tag - this is one of h1, h2, h3, h4, h5, h6
 *
 * @returns JSX.Element
 */
export const Heading = ({ children, Tag = "h1" }: Props) => {
  return <Tag>{children}</Tag>;
};
