import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "../HomePage.css";
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", formData);
      const { token, role, name, lname } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      localStorage.setItem("lname", lname);

      if (role === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "ROLE_MANAGER") {
        navigate("/manager/dashboard");
      } else if (role === "ROLE_EMPLOYEE") {
        navigate("/employee/dashboard");
      } else {
        setError("Unknown user role.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="login-page-bg py-5 d-flex align-items-center justify-content-center min-vh-100 login-section">
      <Container data-aos="fade-up" style={{ maxWidth: "500px" }}>
        <Card className="shadow-lg p-4 rounded-4">
          <h3 className="mb-4 text-center fw-bold text-primary">Welcome Back!</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label><FaLock className="me-2" />Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-grid mb-3">
              <Button
                variant="primary"
                type="submit"
                className="rounded-pill"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </div>

            <p className="text-center text-muted">
              Don't have an account? <Link to="/register-admin" className="fw-semibold text-decoration-none">Register here</Link>
            </p>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
