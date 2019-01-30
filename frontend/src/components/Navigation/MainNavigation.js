import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './MainNavigaion.css';

const MainNavigation = props => (
  <AuthContext.Consumer>
    {context => (
      <header className="main-navigation">
        <div className="main-navigation__logo">
          <h1>WAR III REPLAYS</h1>
        </div>
        <nav className="main-navigation__items">
          <ul>
            {!context.token && (
              <li>
                {' '}
                <NavLink to="/auth">Authenticate</NavLink>
              </li>
            )}
            <li>
              {' '}
              <NavLink to="/replays">Replays</NavLink>
            </li>
            {context.token && (
              <React.Fragment>
                <li>
                  {' '}
                  <NavLink to="/uploads">Uploads</NavLink>
                </li>
                <li>
                  <button type="button" onClick={context.logout}>
                    Logout
                  </button>
                </li>
              </React.Fragment>
            )}
          </ul>
        </nav>
      </header>
    )}
  </AuthContext.Consumer>
);

export default MainNavigation;
