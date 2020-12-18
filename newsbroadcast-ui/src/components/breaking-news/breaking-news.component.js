import React, { useEffect, useState } from "react";
import { connectSocket } from './breaking-news-websocket';

import '../common/news-alert.css';

export default function BreakingNews() {
  const [breakingNews, setBreakingNews] = useState([]);

  useEffect(() => {
    connectSocket(onMessageReceived);
  });

  const onMessageReceived = message => {
    if (message && message.body) {
      const news = JSON.parse(message.body);
      const newsList = [...breakingNews, news];
      setBreakingNews(newsList);
    }
  };

  return (
    <div className='news-alert-main'>
      <div className='news-alert-header' style={{ backgroundColor: 'red' }}>Breaking News</div>
      {breakingNews && breakingNews.length > 0 ?
        <ul className='news-ui'>
          {breakingNews.map(el => (
            <li className='news-li' key={el.id}>
              <div className='news-title'>
                {el.title}
              </div>
              <div className='news-desc' title={el.description}>
                {el.description}
              </div>
            </li>
          ))}
        </ul> : <div>No Breaking News</div>
      }
    </div>
  );
};
