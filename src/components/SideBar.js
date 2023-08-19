import React from "react";
import { Link } from "react-router-dom";
import "../static/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link className="sidebar-link" to="/lab/dashboard/users">
            Users
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="sidebar-link" to="/lab/dashboard/patients">
            Patients
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="sidebar-link" to="/lab/dashboard/bill">
            Bills
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="sidebar-link" to="/lab/dashboard/test">
            Tests
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="sidebar-link" to="/lab/dashboard/report">
            Reports
          </Link>
        </li>
      </ul>
    </div>
  );
}
