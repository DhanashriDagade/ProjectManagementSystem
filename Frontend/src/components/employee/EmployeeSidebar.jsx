import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  Speedometer2,
  Kanban,
  CheckCircle,
  ChatDots,
} from "react-bootstrap-icons";

export default function EmployeeSidebar() {
  const location = useLocation();

  const navItems = [
    { to: "/employee/dashboard", label: "Dashboard", icon: <Speedometer2 className="me-2 sidebar-icon" /> },
    { to: "/employee/projects", label: "Assigned Projects", icon: <Kanban className="me-2 sidebar-icon" /> },
    { to: "/employee/update-status", label: "Completed Project", icon: <CheckCircle className="me-2 sidebar-icon" /> },
    { to: "/employee/messages", label: "Messages", icon: <ChatDots className="me-2 sidebar-icon" /> },
  ];

  return (
    <Nav
      className="flex-column p-3"
 
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
