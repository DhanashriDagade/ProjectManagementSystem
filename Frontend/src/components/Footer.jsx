import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="custom-footer text-white py-3 mt-5">
      <Container className="text-center">
        <p className="mb-0">
          © {new Date().getFullYear()} <strong>Teamsphere</strong>. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
