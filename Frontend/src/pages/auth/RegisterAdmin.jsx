
import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Card,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaCity,
  FaMapPin,
  FaVenusMars,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function RegisterAdmin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    pincode: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const validateForm = () => {
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const pincodeRegex = /^[0-9]{6}$/;
    const passwordMinLength = 6;

    if (!nameRegex.test(formData.firstName)) {
      return "First name must contain only alphabets.";
    }
    if (!nameRegex.test(formData.lastName)) {
      return "Last name must contain only alphabets.";
    }
    if (!emailRegex.test(formData.email)) {
      return "Invalid email format.";
    }
    if (formData.password.length < passwordMinLength) {
      return "Password must be at least 6 characters.";
    }
    if (!phoneRegex.test(formData.phone)) {
      return "Phone number must be exactly 10 digits.";
    }
    if (!pincodeRegex.test(formData.pincode)) {
      return "Pincode must be exactly 6 digits.";
    }
    if (!formData.gender) {
      return "Please select gender.";
    }
    return null;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          ...formData,
          role: "ROLE_ADMIN",
        }
      );

      setSuccess("Admin registered successfully! Redirecting to login...");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        city: "",
        pincode: "",
        gender: "",
      });

      setTimeout(() => {
        setIsLoading(false);
        navigate("/login");
      }, 2500);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="login-section">
      <Container className="mt-3" style={{ maxWidth: "700px" }}>
        <Card className="p-4 shadow-lg rounded-4 border-0" data-aos="fade-up">
          <h3 className="mb-4 text-center">Register Admin</h3>

          {error && (
            <Alert variant="danger" data-aos="fade">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" data-aos="zoom-in">
              {success}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUser className="me-2" />
                    First Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUser className="me-2" />
                    Last Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaEnvelope className="me-2" />
                Email
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaLock className="me-2" />
                Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaPhone className="me-2" />
                    Phone
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaCity className="me-2" />
                    City
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaMapPin className="me-2" />
                    Pincode
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaVenusMars className="me-2" />
                    Gender
                  </Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid mt-3">
              <Button
                type="submit"
                variant="success"
                className="rounded-pill"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
