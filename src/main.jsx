// starting point of the app
// here we render the App component inside the root div

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
      // React.StrictMode to make it safe

  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EventProvider>
          <App />
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
