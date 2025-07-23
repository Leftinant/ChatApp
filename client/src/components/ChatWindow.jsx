import React, { useState, useEffect } from "react";
import axios from "axios";
import TypingIndicator from "./TypingIndicator";

function ChatWindow({ socket, username, selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!selectedUser) return;

    const room = [username, selectedUser].sort().join("-");
    socket.emit("join-room", { user1: username, user2: selectedUser });

    axios
      .get(`http://localhost:5000/messages/${username}/${selectedUser}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  }, [selectedUser]);

  useEffect(() => {
    socket.on("private-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("typing", (user) => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(null), 2000);
    });

    return () => {
      socket.off("private-message");
      socket.off("typing");
    };
  }, []);

  const handleSend = () => {
    if (!text.trim() || !selectedUser) return;

    socket.emit("message", {
      from: username,
      to: selectedUser,
      content: text,
    });
    setText("");
  };

  const handleTyping = () => {
    const room = [username, selectedUser].sort().join("-");
    socket.emit("typing", { room, user: username });
  };

  return (
    <div className='flex-1 p-4 flex flex-col'>
      {selectedUser ? (
        <>
          <div className='flex-1 overflow-y-auto mb-2'>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat ${
                  msg.sender === username ? "chat-end" : "chat-start"
                }`}
              >
                <div className='chat-header'>{msg.sender}</div>
                <div className='chat-bubble'>{msg.content}</div>
                <div className='text-xs opacity-50'>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
            {typingUser && <TypingIndicator user={typingUser} />}
          </div>
          <div className='flex gap-2'>
            <input
              className='input input-bordered flex-1'
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleTyping}
              placeholder='Type a message...'
            />
            <button className='btn btn-primary' onClick={handleSend}>
              Send
            </button>
          </div>
        </>
      ) : (
        <div className='flex-1 flex items-center justify-center text-gray-500'>
          Select a user to start chatting
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
