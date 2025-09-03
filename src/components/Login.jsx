import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
  const [error, setError] = useState("");

  function onChange(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      login(form);
      nav(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
      <h2>Login</h2>
      {error && <div className="error mt-2" style={{ color: "#fecaca" }}>{error}</div>}
      <form onSubmit={onSubmit} className="mt-2">
        <div className="label">Username or Email</div>
        <input name="usernameOrEmail" className="input" value={form.usernameOrEmail} onChange={onChange} placeholder="username or email" />
        <div className="label mt-1">Password</div>
        <input name="password" type="password" className="input" value={form.password} onChange={onChange} placeholder="password" />

        <div className="mt-2" style={{ display: "flex", gap: 8 }}>
          <button className="btn" type="submit">Login</button>
          <button className="btn ghost" type="button" onClick={() => nav("/register")}>Create account</button>
        </div>
      </form>
    </div>
  );
}
