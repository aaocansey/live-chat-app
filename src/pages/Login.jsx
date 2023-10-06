import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");


  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(name, password);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-div">
          <label>Username</label>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-div">
          <label>Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Login</button>
        {error && <div>{error}</div>}
      </form>
      <a href="/" className="form-link">
        New? <span >SignUp</span>
      </a>
    </div>
  );
};

export default Login;
