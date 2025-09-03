import React, { useState } from "react";
import { useEvents } from "../context/EventContext";

export default function AddEvent() {
  const { addEvent } = useEvents();
  const [form, setForm] = useState({ name: "", date: "", time: "", location: "", description: "" });
  const [error, setError] = useState("");

  function onChange(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.date || !form.time) {
      setError("Event name, date and time are required.");
      return;
    }
    addEvent(form);
    setForm({ name: "", date: "", time: "", location: "", description: "" });
  }

  return (
    <div className="card" style={{ maxWidth: 760, margin: "0 auto" }}>
      <h2>Add Event</h2>
      {error && <div className="error mt-2" style={{ color: "#fecaca" }}>{error}</div>}
      <form onSubmit={onSubmit} className="mt-2">
        <div className="label">Event name</div>
        <input name="name" className="input" value={form.name} onChange={onChange} placeholder="Team meeting" />
        <div className="row mt-1">
          <div className="col">
            <div className="label">Date</div>
            <input name="date" className="input" type="date" value={form.date} onChange={onChange} />
          </div>
          <div className="col">
            <div className="label">Time</div>
            <input name="time" className="input" type="time" value={form.time} onChange={onChange} />
          </div>
        </div>
        <div className="row mt-1">
          <div className="col">
            <div className="label">Location</div>
            <input name="location" className="input" value={form.location} onChange={onChange} placeholder="Zoom / Boardroom" />
          </div>
          <div className="col">
            <div className="label">Short description</div>
            <input name="description" className="input" value={form.description} onChange={onChange} placeholder="Sprint planning" />
          </div>
        </div>

        <div className="mt-2">
          <button className="btn" type="submit">Add event</button>
        </div>
      </form>
    </div>
  );
}
