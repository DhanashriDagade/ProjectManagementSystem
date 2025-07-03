import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  Alert,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ViewManagers() {
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedManagerId, setSelectedManagerId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedManager, setEditedManager] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/managers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setManagers(res.data);
    } catch (err) {
      setError("Failed to fetch managers.");
    }
  };

  const confirmDelete = (id) => {
    setSelectedManagerId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/admin/managers/${selectedManagerId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setManagers(managers.filter((m) => m.id !== selectedManagerId));
      setShowConfirm(false);
    } catch (err) {
      setError("Failed to delete manager.");
    }
  };

  const handleEdit = (manager) => {
    setEditedManager(manager);
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    setEditedManager({ ...editedManager, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/managers/${editedManager.id}`,
        editedManager,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedList = managers.map((m) =>
        m.id === editedManager.id ? editedManager : m
      );
      setManagers(updatedList);
      setShowEditModal(false);
    } catch (err) {
      setError("Failed to update manager.");
    }
  };

  return (
    <Container className="mt-4 p-4 rounded shadow-sm bg-light">
      <h3 className="text-center mb-4 text-primary fw-bold">
        Manage Registered Managers
      </h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="table-responsive">
        <Table bordered hover responsive className="align-middle text-center">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Phone</th>
              <th>Pincode</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {managers.length > 0 ? (
              managers.map((manager, index) => (
                <tr key={manager.id}>
                  <td>{index + 1}</td>
                  <td>{manager.firstName}</td>
                  <td>{manager.lastName}</td>
                  <td>{manager.email}</td>
                  <td>{manager.city}</td>
                  <td>{manager.phone}</td>
                  <td>{manager.pincode}</td>
                  <td>{manager.gender}</td>
                  <td>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(manager)}
                    >
                      <FaEdit /> Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => confirmDelete(manager.id)}
                    >
                      <FaTrash /> Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No managers found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this manager?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Manager Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="firstName"
                    value={editedManager.firstName || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    value={editedManager.lastName || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    value={editedManager.email || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="phone"
                    value={editedManager.phone || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    value={editedManager.city || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    name="pincode"
                    value={editedManager.pincode || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-2">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={editedManager.gender || ""}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
