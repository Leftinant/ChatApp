import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatWindow from "./components/ChatWindow";
import OnlineUsers from "./components/OnlineUsers";

const socket = io("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on("online-users", (users) => {
      setOnlineUsers(users.filter((u) => u !== username));
    });

    socket.on("connect", () => {
      if (username) {
        socket.emit("join", username);
      }
    });

    return () => socket.disconnect();
  }, [username]);

  const handleLogin = () => {
    if (username.trim()) {
      socket.emit("join", username);
    }
  };

  if (!username) {
    return (
      <div className='h-screen flex items-center justify-center bg-base-200'>
        <div className='card p-8 bg-base-100 shadow-xl'>
          <h2 className='text-xl font-bold mb-4'>Enter your username</h2>
          <input
            type='text'
            placeholder='Username'
            className='input input-bordered w-full mb-4'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className='btn btn-primary w-full' onClick={handleLogin}>
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='h-screen flex bg-base-100'>
      <OnlineUsers
        users={onlineUsers}
        onSelect={setSelectedUser}
        selected={selectedUser}
      />
      <ChatWindow
        socket={socket}
        username={username}
        selectedUser={selectedUser}
      />
    </div>
  );
}

export default App;
