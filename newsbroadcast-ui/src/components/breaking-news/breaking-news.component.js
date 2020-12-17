import React, { useEffect } from "react";
import { connectSocket, sendMessage } from './breaking-news-websocket';

export default function BreakingNews() {
  const TOPIC_NEWS_RECEIVED = '/topic/newsReceived';

  useEffect(() => {
    connectSocket(TOPIC_NEWS_RECEIVED);
  }, []);

  const messageHandller = message => {
    sendMessage(message);
  }

  return (
    <div>
        <b>Breaking News</b>
        <br/>
      <button onClick={() => messageHandller('Puneet Singh')}>Send Message</button>
    </div>
  );
};
