import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Alert, Container } from "react-bootstrap";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";

export default function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [managers, setManagers] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
    fetchManagers();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const fetchManagers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/managers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setManagers(res.data);
    } catch (error) {
      console.error("Failed to fetch managers:", error);
    }
  };

  const handleAssignClick = (projectId) => {
    setSelectedProjectId(projectId);
    setShowModal(true);
  };

  const handleAssignSubmit = async () => {
    if (!selectedManagerId) {
      setMessage("Please select a manager before assigning.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/admin/projects/${selectedProjectId}/assign/${selectedManagerId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Project assigned successfully!");
      setShowModal(false);
      setSelectedManagerId("");
      fetchProjects();
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to assign project.";
      setMessage(errMsg);
      console.error("Error assigning project:", error);
    }
  };

  return (
<Container className="p-4 rounded shadow-lg bg-light">
  <h3 className="text-center mb-4 text-primary fw-bold">
    📋 View & Assign Projects
  </h3>

  {message && <Alert variant="info" className="text-center">{message}</Alert>}

  <div className="table-responsive border rounded shadow-sm">
    <Table hover className="table-bordered text-center">
      <thead className="table-info">
        <tr>
          <th>#</th>
          <th>Project Name</th>
          <th>Description</th>
          <th>Assigned Manager</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {projects.length > 0 ? (
          projects.map((project, idx) => (
            <tr key={project.id}>
              <td>{idx + 1}</td>
              <td>{project.name || "No Name"}</td>
              <td>{project.description}</td>
              <td>
                {project.manager
                  ? `${project.manager.firstName} ${project.manager.lastName}`
                  : <span className="text-muted">Not Assigned</span>}
              </td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => handleAssignClick(project.id)}
                >
                  <FaUserPlus className="me-1" />
                  Assign
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-muted">No projects available.</td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>

  {/* Assign Modal */}
  <Modal show={showModal} onHide={() => setShowModal(false)} centered>
    <Modal.Header closeButton>
      <Modal.Title className="fw-semibold">Assign Manager</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group>
          <Form.Label>Select Manager</Form.Label>
          <Form.Select
            value={selectedManagerId}
            onChange={(e) => setSelectedManagerId(e.target.value)}
          >
            <option value="">Select...</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.firstName} {manager.lastName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleAssignSubmit}>
        Assign
      </Button>
    </Modal.Footer>
  </Modal>
</Container>
  );
}
