import { useSelector } from "react-redux";

function Message({ message }) {
  const { username } = useSelector((state) => state.user);

  const isCurrentUser = message.username === username;

  return (
    <div
      className={`d-flex justify-content-${
        isCurrentUser ? "end" : "start"
      } mb-2`}
    >
      <div
        className={`rounded ${isCurrentUser ? "text-end" : "text-start"}`}
        style={{
          width: "10%",
        }}
      >
        <p className="text-bold fs-3">{message.username}</p>
        <div className={`${isCurrentUser ? "bg-white" : "bt-primary"}`}>
          <p className="p-2">{message.text}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
