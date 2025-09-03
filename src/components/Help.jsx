import React from "react";

export default function Help() {
  return (
    <div className="card" style={{ maxWidth: 860, margin: "0 auto" }}>
      <h2>Help & Tips</h2>
      <ul className="small" style={{ lineHeight: 1.8 }}>
        <li>Register using your name, email, username and password (password ≥ 6 chars).</li>
        <li>Login with your username or email and password to access the dashboard.</li>
        <li>Add events via Add Event (name, date, time required). They’ll show up on Dashboard.</li>
        <li>Edit inline from the list or delete events you no longer need.</li>
        <li>Search by name/location to quickly find events.</li>
        <li>Data is saved to your browser via localStorage (demo-only).</li>
      </ul>
    </div>
  );
}
