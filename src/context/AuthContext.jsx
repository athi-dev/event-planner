import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const KEY = "ep_auth_v1";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { users: [], currentUserId: null };
  } catch {
    return { users: [], currentUserId: null };
  }
}
function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}

const AuthContext = createContext(null);
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [store, setStore] = useState(() => load());

  useEffect(() => {
    save(store);
  }, [store]);

  const currentUser = useMemo(() => store.users.find(u => u.id === store.currentUserId) || null, [store]);

  const register = ({ name, email, username, password }) => {
    // validation
    if (!name || !email || !username || !password) throw new Error("All fields are required.");
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) throw new Error("Invalid email format.");
    if (password.length < 6) throw new Error("Password must be at least 6 characters.");

    // uniqueness
    if (store.users.some(u => u.username === username || u.email === email)) {
      throw new Error("Username or email already taken.");
    }

    const user = { id: String(Date.now()), name, email, username, password, events: [] };
    setStore(prev => ({ ...prev, users: [user, ...prev.users], currentUserId: user.id }));
    return user;
  };

  const login = ({ usernameOrEmail, password }) => {
    if (!usernameOrEmail || !password) throw new Error("Fill both fields.");
    const user = store.users.find(u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password);
    if (!user) throw new Error("Invalid credentials.");
    setStore(prev => ({ ...prev, currentUserId: user.id }));
    return user;
  };

  const logout = () => {
    setStore(prev => ({ ...prev, currentUserId: null }));
  };

  const replaceUser = (updated) => {
    setStore(prev => ({ ...prev, users: prev.users.map(u => u.id === updated.id ? updated : u), currentUserId: updated.id }));
  };

  const value = useMemo(() => ({ store, currentUser, register, login, logout, replaceUser }), [store, currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
