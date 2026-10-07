import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/home.css";
import "./styles/jobs.css";
import "./styles/login.css";
import "./styles/register.css";
import "./styles/JobSeekerDashboard.css";
import "./styles/RecruiterDashboard.css";


ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
<App />
</React.StrictMode>
);