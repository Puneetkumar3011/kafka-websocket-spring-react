import React from 'react';
import { Route } from 'react-router-dom';

import Header from "./components/header/header.component";
import Home from "./components/home/home.component";
import Admin from "./components/admin/admin.component";

function App() {
  return (
    <div>
      <Header></Header>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/admin" component={Admin} />
    </div>
  );
}

export default App;
