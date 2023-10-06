import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import { useNavigate } from "react-router-dom";


const Chat = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [room, setRoom] = useState("");
  const joinRoom = () => {
    if (user.data !== "" && room !== "") {
      navigate("/message", { state: { username: user.data, room } });
    }
  };
  return (
    <div className="form" id="chat">
      <div style={{textAlign:'left', width:'22rem'}}>
      <h1 style={{color:'red'}}>god Chat</h1>
      {user && <p>Welcome {user.data}</p>}
      </div>
      <input className="input" type="text" name="username" value={user.data} onChange={()=>{}}/>
      <input
      className="input"
        type="text"
        name="chatRoomId"
        placeholder="Room ID"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};

export default Chat;
