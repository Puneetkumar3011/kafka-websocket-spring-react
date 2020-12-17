import React from 'react';
import { Route } from 'react-router-dom';

import Header from "./components/header/header.component";
import Home from "./components/home/home.component";

function App() {
  return (
    <div className='container'>
        <Header></Header>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/admin" component={Home} />
    </div>
  );
}

export default App;
