/**
 * @file main.tsx
 * @desc Main entry point for the frontend.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import MantineApp from "./Components/App/App.tsx";
import '@mantine/core/styles.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineApp />
  </React.StrictMode>
);
