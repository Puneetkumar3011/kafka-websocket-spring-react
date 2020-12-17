import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import './header.css';

function Header() {
  return (
    <div className="App">
        <Navbar bg="light" expand="lg header-main">
          <div className='header-brand'>
            <Navbar.Brand>News Broadcast Demo Application</Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className='header-buttons' id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/home">Home</Link>
              <Link to="/admin">Admin</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
  );
}

export default Header;