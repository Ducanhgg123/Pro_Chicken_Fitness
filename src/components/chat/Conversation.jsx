import { useRef } from "react";
import SendMessage from "./SendMessage";
import Message from "./Message";

function Conversation({ messages, selectedConversationId }) {
  const bottomRef = useRef();

  return (
    <>
      <div
        className="border p-3 flex-grow-1 mb-3 overflow-auto"
        style={{
          maxHeight: "80vh",
        }}
      >
        {messages?.length === 0 && <div>You two have not chat yet</div>}
        {messages?.map((message, idx) => (
          <Message key={idx} message={message} />
        ))}
        <div ref={bottomRef}></div>
      </div>
      <SendMessage
        bottomRef={bottomRef}
        conversationId={selectedConversationId}
      />
    </>
  );
}

export default Conversation;
