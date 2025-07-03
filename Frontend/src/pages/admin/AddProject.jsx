import React, { useEffect, useState } from "react";
import { Table, Form, Button, Container, Alert, Modal } from "react-bootstrap";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
export default function AddProjects() {
  const [projects, setProjects] = useState([]);
  const [name, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch {
      setError("Failed to fetch projects.");
    }
  };

  const resetForm = () => {
    setProjectName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setEditId(null);
    setError("");
    setSuccess("");
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (project) => {
    setEditId(project.id);
    setProjectName(project.name || "");
    setDescription(project.description || "");
    setStartDate(project.startDate || "");
    setEndDate(project.endDate || "");
    setError("");
    setSuccess("");
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim() || !startDate || !endDate) {
      setError("All fields are required");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be after end date");
      return;
    }

    try {
      if (editId) {
        await axios.put(
          `http://localhost:8080/api/admin/projects/${editId}`,
          { name, description, startDate, endDate },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess("Project updated successfully!");
      } else {
        await axios.post(
          "http://localhost:8080/api/admin/projects",
          { name, description, startDate, endDate },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess("Project added successfully!");
      }

      setError("");
      setShowModal(false);
      fetchProjects();
      resetForm();
    } catch (err) {
      setSuccess("");
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/projects/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((p) => p.id !== deleteId));
      setShowDeleteConfirm(false);
      setDeleteId(null);
      setSuccess("Project deleted successfully!");
      setError("");
    } catch {
      setError("Failed to delete project.");
      setSuccess("");
    }
  };

return (
  <Container className="p-4 rounded shadow-lg bg-light">
    <h3 className="text-center mb-4 text-primary fw-bold"> Manage Projects</h3>

    {success && <Alert variant="success">{success}</Alert>}
    {error && <Alert variant="danger">{error}</Alert>}

    <div className="d-flex justify-content-end mb-3">
      <Button variant="success" onClick={openAddModal}>
        <FaPlus className="me-2" />
        Add New Project
      </Button>
    </div>

    <div className="table-responsive shadow-sm rounded border">
      <Table hover className="table-bordered text-center">
        <thead className="table-primary text-dark">
          <tr>
            <th>#</th>
            <th>Project Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((proj, idx) => (
              <tr key={proj.id}>
                <td>{idx + 1}</td>
                <td>{proj.name}</td>
                <td>{proj.description}</td>
                <td>{proj.startDate}</td>
                <td>{proj.endDate}</td>
                <td>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2"
                    onClick={() => openEditModal(proj)}
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => confirmDelete(proj.id)}
                  >
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-muted">
                No projects available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>


      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Project" : "Add New Project"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              {editId ? "Update Project" : "Add Project"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}












