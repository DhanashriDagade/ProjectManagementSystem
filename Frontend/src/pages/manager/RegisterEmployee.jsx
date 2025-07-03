import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Card,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCity,
  FaPhone,
  FaMapPin,
  FaVenusMars,
} from "react-icons/fa";
import axios from "axios";

export default function RegisterEmployee() {
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
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const pinRegex = /^\d{6}$/;

    if (!formData.firstName || !nameRegex.test(formData.firstName))
      newErrors.firstName = "First name must contain only letters";

    if (!formData.lastName || !nameRegex.test(formData.lastName))
      newErrors.lastName = "Last name must contain only letters";

    if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email address";

    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.city || !nameRegex.test(formData.city))
      newErrors.city = "City must contain only letters";

    if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!pinRegex.test(formData.pincode))
      newErrors.pincode = "Pincode must be 6 digits";

    if (!formData.gender) newErrors.gender = "Please select gender";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/api/manager/employees",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Employee registered successfully!");
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
    } catch (error) {
      setSuccess("");
      setErrors({
        api: error.response?.data?.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-3 mb-5 d-flex justify-content-center">
      <Card className="shadow-sm p-4 rounded-4 border-0 bg-light w-100"
       style={{ maxWidth: "700px" }}>

        <h3 className="mb-4 text-center"> Register New Employee</h3>
       
        <p className="text-muted text-center mb-4">
          Please fill in the form below to register a new Employee.
        </p>

        {success && <Alert variant="success">{success}</Alert>}
        {errors.api && <Alert variant="danger">{errors.api}</Alert>}

        <Form onSubmit={handleSubmit}>
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
          <Button
            type="submit"
            variant="success"
            
            style={{ fontSize: "1.1rem" }}
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
                Registering...
              </>
            ) : (
              "Register Employee"
            )}
          </Button>
</div>

        </Form>
      </Card>
    </Container>
  );
}
