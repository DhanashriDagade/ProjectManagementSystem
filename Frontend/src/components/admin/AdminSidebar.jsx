

import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  Speedometer2,
  PersonPlus,
  People,
  Folder2Open,
} from "react-bootstrap-icons";

export default function AdminSidebar() {
  const location = useLocation();

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <Speedometer2 className="me-2 sidebar-icon " /> },
    { to: "/admin/register-manager", label: "Register Manager", icon: <PersonPlus className="me-2 sidebar-icon" /> },
    { to: "/admin/view-managers", label: "View Managers", icon: <People className="me-2 sidebar-icon" /> },
    { to: "/admin/add-project", label: "Manage Projects", icon: <Folder2Open className="me-2 sidebar-icon" /> },
    { to: "/admin/view-projects", label: "Assign Projects to Manager", icon: <Folder2Open className="me-2 sidebar-icon" /> },
    { to: "/admin/view-projectsadmin", label: "View Projects", icon: <Folder2Open className="me-2 sidebar-icon" /> },
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
