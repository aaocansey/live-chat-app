import React, { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";
import { useNavigate } from "react-router-dom";
import "../css/forms.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signupResponse = await signup(name, email, password);
    signupResponse?navigate("/chat"):null;
  };

  return (
    <div className="form-container">
      <p style={{color:'red'}}> god Chat Sign Up</p>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-div">
          <label>Username</label>
          <input
            className="input"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-div">
          <label>Email</label>
          <input
            className="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-div">
          <label>Password</label>
          <input
            style={{ background: "none" }}
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Sign Up</button>
        {error && <div className="error-msg">{error}</div>}
      </form>

      <a href="/login" className="form-link">
        Already signed up? <span >login</span>
      </a>
    </div>
  );
};

export default SignUp;
