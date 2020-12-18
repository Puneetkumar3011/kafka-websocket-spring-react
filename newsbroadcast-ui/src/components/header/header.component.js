import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

function Header() {
  return (
    <div className="header">
      <div className='header-brand'>
        <div>News Broadcast Demo Application</div>
      </div>
      <div className='header-buttons'>
        <Link className='link-button' to="/home">Home</Link>
        <Link className='link-button' to="/admin">Admin</Link>
      </div>

    </div>
  );
}

export default Header;