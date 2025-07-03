// ManagerSidebar.jsx
import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  Speedometer2,
  PersonPlus,
  People,
  CheckSquare,
  Folder2Open,
} from "react-bootstrap-icons";

export default function ManagerSidebar() {
  const location = useLocation();

const navItems = [
  { to: "/manager/dashboard", label: "Dashboard", icon: <Speedometer2 className="me-2" /> },
  { to: "/manager/register-employee", label: "Register Employee", icon: <PersonPlus className="me-2" /> },
  { to: "/manager/employees", label: "View Employees", icon: <People className="me-2" /> },
  { to: "/manager/assign-project", label: "Assign Project", icon: <CheckSquare className="me-2" /> },
  { to: "/manager/view-assigned", label: "View Projects", icon: <Folder2Open className="me-2" /> },
];

  return (
    <Nav
      className="flex-column p-3 "
    >
      {navItems.map((item, idx) => (
        <Nav.Link
          key={idx}
          as={Link}
          to={item.to}
          className={`d-flex align-items-center py-2 px-3 rounded sidebar-link ${
            location.pathname === item.to ? "active-link" : ""
          }`}
        >
          {item.icon}
          <span className="sidebar-label">{item.label}</span>
        </Nav.Link>
      ))}
    </Nav>
  );
}
