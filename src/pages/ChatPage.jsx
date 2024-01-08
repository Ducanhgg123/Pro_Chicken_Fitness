import { useEffect, useRef, useState } from "react";
import SendMessage from "../components/chat/SendMessage";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useSelector } from "react-redux";
import Message from "../components/chat/Message";
import CoachService from "../api/services/CoachService";
import { generateConversationId } from "../utilities/generateConversationId";
import { Button } from "react-bootstrap";
import Conversation from "../components/chat/Conversation";

function renderCorrectUsername(conversationId, username) {
  const splittedConversaion = conversationId.split("-");
  const idx = splittedConversaion.indexOf(username);
  if (idx == -1) {
    return "undefined";
  }
  return splittedConversaion[idx == 1 ? 2 : 1];
}

function ChatPage() {
  const { userRoles, username } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const bottomRef = useRef();

  const isCoach = userRoles.includes("ROLE_COACH");

  useEffect(() => {
    const getUsers = async () => {
      if (isCoach) {
        const usersRes = await CoachService.getClientsForCoach(username);
        console.log(usersRes);
        const newConversations = [];
        console.log(usersRes);
        if (usersRes?.status == 200)
          for (const user of usersRes.data) {
            newConversations.push(
              generateConversationId(username, user.username)
            );
          }
        setConversations(newConversations);
      } else {
        const coachRes = await CoachService.getUserCoach(username);
        if (coachRes?.status == 200) {
          setConversations([
            generateConversationId(coachRes.data.username, username),
          ]);
        }
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "chats", selectedConversationId || "conversation-dat-hoa"),
      (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      }
    );

    return () => {
      if (selectedConversationId) unSub();
    };
  }, [selectedConversationId]);

  const handleSelect = async (conversationId) => {
    setSelectedConversationId(conversationId);
    try {
      const res = await getDoc(doc(db, "chats", conversationId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", conversationId), { messages: [] });
      } else {
        setMessages(res.data().messages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* List of conversations */}
        <div className="col-md-3 border-end vh-100">
          <h4>Conversations</h4>
          <ul className="list-group">
            {conversations?.map((conversation, idx) => {
              return (
                <li key={idx} className="list-group-item">
                  <Button onClick={() => handleSelect(conversation)}>
                    {renderCorrectUsername(conversation, username)}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Conversation content */}

        <div className="col-md-9">
          <div className="conversation-content p-3 d-flex flex-column h-100">
            <h4>Conversation</h4>
            {selectedConversationId && (
              <Conversation
                messages={messages}
                selectedConversationId={selectedConversationId}
              />
            )}
            {/* {selectedConversationId && (
              <SendMessage
                bottomRef={bottomRef}
                conversationId={selectedConversationId}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
