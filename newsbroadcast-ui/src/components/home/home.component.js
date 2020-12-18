import React from "react";
import BreakingNews from "../breaking-news/breaking-news.component";
import News from "../news/news-alert.component";

import './home.css';

export default function Home() {

  return (
    <div className='row home-main'>
      <div className='col-md-6'><BreakingNews /></div>
      <div className='col-md-6'><News /></div>
    </div>
  );

};
