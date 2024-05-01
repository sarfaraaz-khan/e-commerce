import React, { useState, createContext } from "react";

import "./login.css";
import sideImage from "../components/user/assets/images/sideImage.jpg";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const loginContext = createContext(null);

  const [validatUser, setValidateUser] = useState({
    username: "user",
    password: "user@123",
  });

  const [userInput, setUserInput] = useState({ username: "", password: "" });
  const [login, setLogin] = useState("");
  const handleChange = (e) => {
    let { name, value } = e.target;

    setUserInput((user) => ({ ...user, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      validatUser.username === userInput.username &&
      validatUser.password === userInput.password
    ) {
      setLogin("user");
    } else if (
      userInput.username === "admin" &&
      userInput.password === "admin@123"
    ) {
      setLogin("admin");
    }
    if (login === "user") {
      navigate("/home");
      localStorage.setItem("status", true);
    } else if (login === "admin") {
      navigate("/admin");
      localStorage.setItem("status", true);
    } else {
      localStorage.setItem("status", false);
    }
  };
  let status = localStorage.getItem("status", "sssss");

  return (
    <div className="loginContainer">
      <div className="formContainer">
        <h1>Sign in here</h1>
        <form onSubmit={handleSubmit}>
          <label for="email">Enter username</label>
          <input
            type="text"
            placeholder="username"
            onChange={handleChange}
            name="username"
          />
          <label for="password">Enter password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
      <div className="imageContainer">
        <img src={sideImage} />
      </div>
    </div>
  );
}

export default Login;
