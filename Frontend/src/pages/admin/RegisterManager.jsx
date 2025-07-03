import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Alert,
  Row,
  Col,
  Card,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCity,
  FaPhone,
  FaMapPin,
  FaVenusMars,
} from "react-icons/fa";

export default function RegisterManager() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    phone: "",
    pincode: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    const alphaRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const pinRegex = /^[0-9]{6}$/;

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    else if (!alphaRegex.test(formData.firstName))
      newErrors.firstName = "First name must contain only letters";

    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required";
    else if (!alphaRegex.test(formData.lastName))
      newErrors.lastName = "Last name must contain only letters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters required";

    if (!formData.city.trim()) newErrors.city = "City is required";

    if (!formData.phone.trim())
      newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";

    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!pinRegex.test(formData.pincode))
      newErrors.pincode = "Pincode must be 6 digits";

    if (!formData.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/api/admin/managers", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMsg("Manager registered successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        city: "",
        phone: "",
        pincode: "",
        gender: "",
      });
      setErrors({});
      setErrorMsg("");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="mt-3 mb-5 d-flex justify-content-center">
      <Card
        className="shadow-lg p-4 rounded-4 border-0 bg-light w-100"
        style={{ maxWidth: "700px" }}
      >
        <h3 className="mb-3 text-center">Register Manager</h3>
        <p className="text-muted text-center mb-4">
          Please fill in the form below to register a new manager.
        </p>

        {successMsg && <Alert variant="success">{successMsg}</Alert>}
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* Form Rows Start */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    isInvalid={!!errors.firstName}
                    placeholder="Enter first name"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    isInvalid={!!errors.lastName}
                    placeholder="Enter last name"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaLock /></InputGroup.Text>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaCity /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    isInvalid={!!errors.city}
                    placeholder="Enter city"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaPhone /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                    placeholder="Enter phone number"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaMapPin /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    isInvalid={!!errors.pincode}
                    placeholder="Enter pincode"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pincode}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaVenusMars className="me-2" />Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  isInvalid={!!errors.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.gender}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button type="submit" variant="success" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    className="me-2"
                  />
                  Registering...
                </>
              ) : (
                "Register Manager"
              )}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
