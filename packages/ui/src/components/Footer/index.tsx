import "./styles.css";

/**
 * Footer for the blog.
 *
 * @returns JSX.Element
 */
export default function Footer() {
  return (
    <footer>
      <details>
        <summary>Menu</summary>

        <ul>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">CV</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Now</a>
          </li>
        </ul>
      </details>
      <p>
        <small>&copy; 2023 Created by bigandy</small>
      </p>
    </footer>
  );
}
