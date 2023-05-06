import * as React from "react";
import { Link } from "react-router-dom";

const logedHeader = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Home {process.env.REACT_APP_TEST}
        </Link>
        <Link to="/decks" className="navbar-brand">
          Decks
        </Link>
        <Link to="/duels" className="navbar-brand">
          Duels
        </Link>
        <Link to="/decks" className="navbar-brand">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default logedHeader;
