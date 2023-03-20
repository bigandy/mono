import "./styles.module.css";

/**
 * ArticleCard for the blog.
 *
 * @returns JSX.Element
 */
export default function ArticleCard({
  title = "Weeknote 2023 #1 - Re-imagining my site",
  href = "#",
}: {
  title: string;
  href: string;
}) {
  return (
    <article>
      <header>
        <a href={href}>
          <h2>{title}</h2>
        </a>
      </header>
    </article>
  );
}
