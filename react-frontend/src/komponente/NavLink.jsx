import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ to, text }) => {
  return (
    <Link to={to} className="nav-link">
      {text}
    </Link>
  );
};

export default NavLink;
