import React, { useMemo, useState } from "react";
import { useEvents } from "../context/EventContext";

export default function EventList() {
  const { events, updateEvent, removeEvent } = useEvents();
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return [...events].sort((a,b) => (a.date + a.time).localeCompare(b.date + b.time)).filter(e => !q || e.name.toLowerCase().includes(q) || (e.location||"").toLowerCase().includes(q));
  }, [events, query]);

  return (
    <div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input className="input" placeholder="Search name or location" value={query} onChange={e => setQuery(e.target.value)} style={{ flex: 1 }} />
      </div>

      {filtered.length === 0 ? <div className="mt-2 small">No events yet. Add one from Add Event.</div> : null}

      <div className="mt-2" style={{ display: "grid", gap: 10 }}>
        {filtered.map(ev => (
          <EventRow key={ev.id} ev={ev} editing={editingId === ev.id} onEdit={() => setEditingId(ev.id)} onCancel={() => setEditingId(null)} onSave={(upd) => { updateEvent(ev.id, upd); setEditingId(null); }} onDelete={() => removeEvent(ev.id)} />
        ))}
      </div>
    </div>
  );
}

function EventRow({ ev, editing, onEdit, onCancel, onSave, onDelete }) {
  const [form, setForm] = useState({ name: ev.name, date: ev.date, time: ev.time, location: ev.location, description: ev.description });

  function handleChange(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); }

  if (editing) {
    return (
      <div className="event-row">
        <input className="input" name="name" value={form.name} onChange={handleChange} />
        <input className="input" name="date" type="date" value={form.date} onChange={handleChange} />
        <input className="input" name="time" type="time" value={form.time} onChange={handleChange} />
        <input className="input" name="location" value={form.location} onChange={handleChange} />
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button className="btn" onClick={() => onSave(form)}>Save</button>
          <button className="btn ghost" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="event-row">
      <div>
        <strong>{ev.name}</strong>
        <div className="small">{ev.description}</div>
      </div>
      <div className="small">{ev.date}</div>
      <div className="small">{ev.time}</div>
      <div className="small">{ev.location || "—"}</div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button className="btn ghost" onClick={onEdit}>Edit</button>
        <button className="btn danger" onClick={() => { if (confirm("Delete event?")) onDelete(); }}>Delete</button>
      </div>
    </div>
  );
}
