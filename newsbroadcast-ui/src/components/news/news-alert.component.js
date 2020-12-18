import React, { useEffect, useState } from "react";
import { connectSocket } from './news-alert-websocket';

import '../common/news-alert.css';

export default function News() {
  const defaultNews = JSON.parse('{"id":"76076c7f-7b7a-4f9a-bdc5-ad28daaea21b","title":"Test Title","newsType":"NewsAlert","description":"skjfsdfh ka dfkja dfa skdf aksd bfkad ssdf"}');
  const [newsAlerts, setNewsAlert] = useState([defaultNews]);

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
      </ul>
    </div>
  );
};
