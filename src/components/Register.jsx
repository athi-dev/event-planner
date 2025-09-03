// register page
// user makes new account here

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", username: "", password: "" });
  const [error, setError] = useState("");

  function onChange(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      register(form);
      nav("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  }

  return (
    <div className="card" style={{ maxWidth: 720, margin: "0 auto" }}>
      <h2>Create account</h2>
      {error && <div className="error mt-2" style={{ color: "#fecaca" }}>{error}</div>}
      <form onSubmit={onSubmit} className="mt-2">
        <div className="label">Full name</div>
        <input name="name" className="input" value={form.name} onChange={onChange} placeholder="Jane Doe" />
        <div className="label mt-1">Email</div>
        <input name="email" className="input" value={form.email} onChange={onChange} placeholder="jane@domain.com" />
        <div className="row mt-1">
          <div className="col">
            <div className="label">Username</div>
            <input name="username" className="input" value={form.username} onChange={onChange} placeholder="janedoe" />
          </div>
          <div className="col">
            <div className="label">Password</div>
            <input name="password" className="input" type="password" value={form.password} onChange={onChange} placeholder="• • • • • • •" />
          </div>
        </div>

        <div className="mt-2" style={{ display: "flex", gap: 8 }}>
          <button className="btn" type="submit">Create account</button>
          <button type="button" className="btn ghost" onClick={() => nav("/login")}>Already have an account?</button>
        </div>
      </form>
    </div>
  );
}
