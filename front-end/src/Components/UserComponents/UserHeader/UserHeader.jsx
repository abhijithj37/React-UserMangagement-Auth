import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../../features/userSlice";
import "./UserHeader.css";
function UserHeader({ user }) {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    if (window.confirm("Are you sure want to Logout")) {
      localStorage.removeItem("jwt");
      dispatch(logoutUser());
      window.location.href = "/login";
    }
  };
  return (
    <div className="head">
      <div className="logo">CodeSPACE</div>
      <nav>
        <NavLink>Home</NavLink>

        {user ? (
          <span>
            <NavLink>{user.name}</NavLink>
            <NavLink
              className="active"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </NavLink>
          </span>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
      
    </div>
  );
}

export default UserHeader;
