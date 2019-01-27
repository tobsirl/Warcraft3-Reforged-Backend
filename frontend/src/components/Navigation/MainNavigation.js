import React from 'react';
import { NavLink } from 'react-router-dom';

const MainNavigation = props => (
  <header>
    <div className="main-navigation__logo">
      <h1>EasyEvent</h1>
    </div>
    <nav className="main-navigation__item">
      <ul>
        <li>
          {' '}
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
        <li>
          {' '}
          <NavLink to="/replays">Replays</NavLink>
        </li>
        <li>
          {' '}
          <NavLink to="/uploads">Uploads</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default MainNavigation;
