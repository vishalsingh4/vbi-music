import React from 'react';
import { NavLink as Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <div className="header-component">
      <header>Music App</header>
      <div className="navtab-container">
        <Link to="/songs" activeClassName='selected' className="tab-buttons">
          All Songs
        </Link>
        <Link to="/playlists" activeClassName='selected' className="tab-buttons">
          Playlists
        </Link>
      </div>
    </div>
  );
};

export default HeaderComponent;
