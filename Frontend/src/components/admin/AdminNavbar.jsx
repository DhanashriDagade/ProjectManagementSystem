

import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { PersonCircle, List } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/auth";

export default function AdminNavbar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "";
  const lname = localStorage.getItem("lname") || "";

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      className="px-4 shadow-sm custom-navbar"
      style={{ zIndex: 1060,
        background: 'linear-gradient(-45deg, #1e3c72, #4b75be,rgb(57, 126, 155))',
      }} // Ensure navbar appears above the sidebar
    >
      <Container fluid className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center ">
          <Button
            variant="outline-light"
            className="me-3 naa "
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <List size={24} />
          </Button>
          <Navbar.Brand className="d-flex align-items-center mb-0 ">
            <PersonCircle size={26} className="me-2" />
            {name} {lname} 
          </Navbar.Brand>
        </div>

        <Button variant="outline-light" className="naa"  onClick={() => handleLogout(navigate)}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}
