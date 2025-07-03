import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  HouseDoor,
  InfoCircle,
  Envelope,
  BoxArrowInRight,
  PersonPlus,
} from "react-bootstrap-icons";

export default function AppNavbar() {
  return (
    <Navbar expand="lg" className="custom-navbar py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white fs-4">
          <i className="bi bi-layers-half me-2"></i>Teamsphere
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" className="bg-white" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              <HouseDoor className="me-2" /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link-custom">
              <InfoCircle className="me-2" /> About
            </Nav.Link>
            <Nav.Link as={Link} to="/contactus" className="nav-link-custom">
              <Envelope className="me-2" /> Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="nav-link-custom">
              <BoxArrowInRight className="me-2" /> Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register-admin" className="nav-link-custom">
              <PersonPlus className="me-2" /> Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
