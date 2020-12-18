import React, { useEffect, useState } from "react";
import { connectSocket } from './news-alert-websocket';

import '../common/news-alert.css';

export default function News() {
  const [newsAlerts, setNewsAlert] = useState([]);

  useEffect(() => {
    connectSocket(onMessageReceived);
  }, []);

  const onMessageReceived = message => {
    if (message && message.body) {
      const news = JSON.parse(message.body);
      const newsList = [...newsAlerts, news];
      setNewsAlert(newsList);
    }
  };

  return (
    <div className='news-alert-main'>
      <div className='news-alert-header'>News Alert</div>
      {newsAlerts && newsAlerts.length > 0 ?
        <ul className='news-ui'>
          {newsAlerts.map(el => (
            <li className='news-li' key={el.id}>
              <div className='news-title'>
                {el.title}
              </div>
              <div className='news-desc' title={el.description}>
                {el.description}
              </div>
            </li>
          ))}
        </ul> : <div>No News Alert</div>
      }
    </div>
  );
};
