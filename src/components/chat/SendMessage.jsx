import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase/firebase";

function SendMessage({ bottomRef, conversationId }) {
  const [message, setMessage] = useState("");
  const { username } = useSelector((state) => state.user);
  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    try {
      console.log(conversationId);
      console.log(message, username);
      await updateDoc(doc(db, "chats", conversationId), {
        messages: arrayUnion({
          username,
          text: message,
          createdAt: Timestamp.now(),
        }),
      });
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="input-group" onSubmit={sendMessage}>
      <input
        type="text"
        className="form-control"
        placeholder="Type your message..."
        aria-label="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Send
      </button>
    </form>
  );
}

export default SendMessage;
