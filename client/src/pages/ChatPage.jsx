import React, { useEffect, useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState("You");
  const [users, setUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("online-users", (list) => {
      setUsers(list);
    });

    socket.on("typing", (user) => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(null), 2000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (msg) => {
    socket.emit("message", {
      sender: currentUser,
      text: msg,
      time: new Date().toLocaleTimeString(),
    });
  };

  const emitTyping = () => {
    socket.emit("typing", currentUser);
  };

  return (
    <div className='flex h-full'>
      <ChatSidebar users={users} currentUser={currentUser} />
      <ChatWindow
        messages={messages}
        onSend={sendMessage}
        onTyping={emitTyping}
        typingUser={typingUser}
      />
    </div>
  );
};

export default ChatPage;
