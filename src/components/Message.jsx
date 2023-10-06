import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import "../css/styles.css";
const Message = () => {
  const [message, setMessage] = useState("");
  const location = useLocation();
  let [socket, setSocket] = useState({});
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    socket = io.connect("http://localhost:5000");
    setSocket(socket);
    socket.emit("join_room", location.state.room);
  }, []);

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: location.state.room,
        author: location.state.username,
        message,
        time: new Date().toLocaleTimeString(),
      };
      try {
        await socket.emit("send_message", messageData);
        setMsgList((list) => [...list, messageData]);
        setMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const receiveHandler = (data) => {
      console.log("Received message:", data);
      setMsgList((list) => [...list, data]);
    };

    socket.on("receive", receiveHandler);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      socket.off("receive", receiveHandler);
    };
  }, [socket]);
  return (
    <div className="main">
      <div className="header"><span style={{color:'white'}}>Welcome to god Chat</span> <span style={{fontWeight:'bold',textTransform:'capitalize', color:''}}>{location.state.username}</span></div>
      <div className="body">
        {msgList.map((item, index) => (
          item.author === location.state.username ? (
            <p key={index} className="sent">
              {item.message}
            </p>
          ) : (
            <p key={index} className="received">
              {item.message}
            </p>
          )
        ))}
      </div>
      <div className="footer">
        <input
          type="text"
          placeholder="input message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
