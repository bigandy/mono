import "./styles.css";

/**
 * Site Header for the blog.
 *
 * @returns JSX.Element
 */
export default function SiteHeader({
  title = "personal site of bigandy",
}: {
  title: string;
}) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}
