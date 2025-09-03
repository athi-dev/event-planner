// this is the top bar (nav bar)
// we use Link so we can move around pages

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <div className="brand">Event Planner</div>

        <nav className="nav" aria-label="Main navigation">
          <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Dashboard</NavLink>
          <NavLink to="/add" className={({isActive}) => isActive ? "active" : ""}>Add Event</NavLink>
          <NavLink to="/help" className={({isActive}) => isActive ? "active" : ""}>Help</NavLink>
        </nav>

        <div className="nav">
          {currentUser ? (
            <>
              <span className="small">Hi, <strong>{currentUser.name}</strong></span>
              <button
                className="btn ghost"
                style={{ marginLeft: 8 }}
                onClick={() => { logout(); navigate("/login"); }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
