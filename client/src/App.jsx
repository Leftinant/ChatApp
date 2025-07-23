import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import OnlineUsers from "./components/OnlineUsers";
import ChatWindow from "./components/ChatWindow";

const socket = io("http://localhost:5000");

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
});

function App() {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleJoin = () => {
    if (username.trim()) {
      socket.emit("join", username);
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    if (socket && username) {
      socket.emit("join", username);
    }
  }, [socket, username]);

  return (
    <div className='h-screen bg-base-200'>
      {!loggedIn ? (
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-3xl font-bold mb-6'>Realtime Chat</h1>
          <input
            className='input input-bordered w-full max-w-xs'
            placeholder='Enter your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className='btn mt-4' onClick={handleJoin}>
            Join Chat
          </button>
        </div>
      ) : (
        <div className='flex h-full'>
          <OnlineUsers
            socket={socket}
            username={username}
            onSelectUser={setSelectedUser}
          />
          <ChatWindow
            socket={socket}
            username={username}
            selectedUser={selectedUser}
          />
        </div>
      )}
    </div>
  );
}

export default App;
