import "./styles.css";

/** Primary UI Component for testing */
export const Avatar = ({
  url = "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  size = 100,
}: {
  url?: string;
  size?: number;
}) => {
  return (
    <div className="avatar">
      <img src={url} alt="" height={size} width={size} />
    </div>
  );
};
