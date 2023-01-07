import App from "./App"
import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import './index.css';

const app = ReactDOM.createRoot(document.getElementById("app"));
app.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);