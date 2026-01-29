import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }
    setError("");
    // Demo: accept any username/password
    if (onLogin) onLogin({ username });
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__header">
          <div className="login-card__logo" />
          <div>
            <div className="login-card__title">Wildohms Pvt Ltd</div>
            <div className="login-card__subtitle">Sign in to continue</div>
          </div>
        </div>

        <form className="login-card__form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span className="login-field__label">Username</span>
            <input
              className="login-field__input"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="login-field">
            <span className="login-field__label">Password</span>
            <input
              className="login-field__input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <div className="login-card__error">{error}</div>}

          <button type="submit" className="login-card__button">
            <span className="login-card__button-icon">↪</span>
            <span>Login</span>
          </button>
        </form>

        <div className="login-card__hint">
          Demo: enter any username/password.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;