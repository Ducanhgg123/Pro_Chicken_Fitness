import { useSelector } from "react-redux";

function Message({ message }) {
  const { username } = useSelector((state) => state.user);

  const isCurrentUser = message.username === username;

  return (
    <div
      className={`d-flex justify-content-${isCurrentUser ? "end" : "start"}`}
    >
      <div
        className={`rounded ${isCurrentUser ? "text-end" : "text-start"}`}
        style={{
          width: "auto",
        }}
      >
        <p className="text-bold fs-3">{message.username}</p>
        <div
          style={{
            borderRadius: "30px",
            color: `${isCurrentUser ? "#fff" : "#333"}`,
            backgroundColor: `${
              isCurrentUser ? "rgb(10, 124, 255)" : "rgb(243, 243, 243)"
            }`,
          }}
        >
          <p
            style={{
              padding: "10px 10px",
            }}
          >
            {message.text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Message;
