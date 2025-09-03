import React, { useState, useContext } from "react";
import { EventContext } from "../context/EventContext";

export default function EventForm() {
  const { addEvent } = useContext(EventContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) return;
    addEvent({ title, date });
    setTitle("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Event</h3>
      <input
        type="text"
        placeholder="Event title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
