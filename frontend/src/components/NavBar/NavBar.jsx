import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <svg
        id="app-logo"
        xmlns="http://www.w3.org/2000/svg"
        width="143"
        height="75"
        viewBox="0 0 143 75"
      >
        <g id="Group_1" data-name="Group 1" transform="translate(0.56)">
          <text
            id="TRUCKER_"
            data-name="TRUCKER$"
            transform="translate(72.44 34)"
            fill="#fff"
            font-size="28"
            font-family="Corbel-Bold, Corbel"
            font-weight="700"
          >
            <tspan x="-69.84" y="0">
              TRUCKER
            </tspan>
            <tspan y="0" fill="#35a376" font-size="36">
              $
            </tspan>
          </text>
          <text
            id="_TRACKER"
            data-name="$TRACKER"
            transform="translate(69.44 65)"
            fill="#35a376"
            font-size="36"
            font-family="Corbel-Bold, Corbel"
            font-weight="700"
          >
            <tspan x="-69.102" y="0">
              $
            </tspan>
            <tspan y="0" fill="#fff" font-size="28">
              TRACKER
            </tspan>
          </text>
        </g>
      </svg>
      <ul>
        <li className="navBar-buttons">
          {user ? (
            <div>
              <button onClick={logoutUser}>Logout</button>
            </div>
          ) : (
            <div>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/register")}>Sign Up</button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
