import React from "react";
import BreakingNews from "../breaking-news/breaking-news.component";
import News from "../news/news.component";

export default function Home() {
  
    return (
      <div className='row'>
        <div className='col-md-5'><BreakingNews/></div>
        <div className='col-md-5 offset-md-2'><News/></div>
    </div>
    );

  };
