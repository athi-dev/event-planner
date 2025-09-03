import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const EventContext = createContext(null);
export function useEvents() { return useContext(EventContext); }

export function EventProvider({ children }) {
  const { currentUser, replaceUser } = useAuth();
  const [events, setEvents] = useState([]);

  // load when currentUser changes
  useEffect(() => {
    setEvents(currentUser?.events ? [...currentUser.events] : []);
  }, [currentUser?.id]);

  // push back to user's record when events change
  useEffect(() => {
    if (currentUser) {
      replaceUser({ ...currentUser, events });
    }
  }, [events]);

  const addEvent = (ev) => setEvents(prev => [{ id: String(Date.now()), ...ev }, ...prev]);
  const updateEvent = (id, updates) => setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  const removeEvent = (id) => setEvents(prev => prev.filter(e => e.id !== id));

  const value = useMemo(() => ({ events, addEvent, updateEvent, removeEvent }), [events]);

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}
