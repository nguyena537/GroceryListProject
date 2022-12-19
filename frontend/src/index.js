import App from "./components/App"
import React, { Component } from "react";
import ReactDOM from "react-dom/client";

const app = ReactDOM.createRoot(document.getElementById("app"));
app.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);