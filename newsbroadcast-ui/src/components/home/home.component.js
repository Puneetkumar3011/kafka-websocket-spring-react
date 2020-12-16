import React, { useState, useEffect } from "react";
import { connectSocket, disconnectSocket, sendMessage } from "../core/web-socket.api";

export default function Home() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      connectSocket();
    }, []);

    const messageHandller = message => {
        sendMessage(message);
    }
  
    return (
      <div>
        <button onClick={() => messageHandller('Puneet Singh')}>Send Message</button> 
      </div>
    );
  };
