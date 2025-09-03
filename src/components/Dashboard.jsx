import React from "react";
import EventList from "./EventList";

export default function Dashboard() {
  return (
    <div className="grid cols-2">
      <div className="card">
        <h2>Upcoming events</h2>
        <EventList />
      </div>
      <aside className="card">
        <h3>Quick tips</h3>
        <p className="small">Use Add Event to create items. Edit and delete directly from the list.</p>
      </aside>
    </div>
  );
}
