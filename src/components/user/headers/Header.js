import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import Logo from "../assets/images/logo.png";
function Header() {
  const [status, setStatus] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = () => {
    if (window.location.href === "http://localhost:3007/") {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    getStatus();
  }, [status]);
  return (
    <nav>
      <div className="logoContainer">
        <img src={Logo} alt="logo" />
        <h1>
          Green <span>Tiger</span>
        </h1>
      </div>
      <div className="headBtnContainer">
        {status ? null : (
          <button id="signIn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Header;
