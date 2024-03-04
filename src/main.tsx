import "virtual:svg-icons-register";

import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app/App";
import { stores, StoresProvider } from "./store/app.store";

globalThis.Buffer = Buffer;
window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoresProvider value={stores}>
      <App />
    </StoresProvider>
  </React.StrictMode>
);
