import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Form,
  Button,
  Badge,
  Modal,
  Placeholder,
} from "react-bootstrap";
import axios from "axios";

export default function ViewAssignedProjectsEmp() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [statusUpdateMap, setStatusUpdateMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/employee/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const projectsWithStatus = res.data.map((proj) => ({
        ...proj,
        status: (proj.status || "NOT_ASSIGNED").toUpperCase(),
      }));

      setProjects(projectsWithStatus);
    } catch {
      setError("Failed to load assigned projects.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status) => ({
    NOT_ASSIGNED: "dark",
    NOT_STARTED: "secondary",
    IN_PROGRESS: "info",
    COMPLETED: "success",
    PENDING: "warning",
    BLOCKED: "danger",
  }[status] || "dark");

  const openModal = (proj) => {
    setSelectedProject(proj);
    setStatusUpdateMap((prev) => ({
      ...prev,
      [proj.id]: proj.status || "NOT_STARTED",
    }));
    setMessage("");
    setError("");
    setShowModal(true);
  };

  const handleStatusChange = (e) => {
    if (!selectedProject) return;
    setStatusUpdateMap((prev) => ({
      ...prev,
      [selectedProject.id]: e.target.value,
    }));
  };

  const handleStatusUpdate = async () => {
    if (!selectedProject) return;
    setUpdatingId(selectedProject.id);
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/employee/project-status/${selectedProject.id}`,
        { status: statusUpdateMap[selectedProject.id] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProject.id
            ? { ...p, status: statusUpdateMap[selectedProject.id] }
            : p
        )
      );

      setMessage("✅ Project status updated successfully.");
      setShowModal(false);
    } catch {
      setError("❌ Failed to update project status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const renderSkeletons = () =>
    Array.from({ length: 6 }).map((_, idx) => (
      <Col key={idx} md={6} lg={4}>
        <Card className="shadow-sm" aria-hidden="true">
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Subtitle} animation="glow">
              <Placeholder xs={4} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <br />
              <Placeholder xs={4} /> <br />
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder.Button variant="primary" xs={5} />
          </Card.Body>
        </Card>
      </Col>
    ));

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-dark">Your Assigned Projects</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      <Row className="g-4">
        {loading
          ? renderSkeletons()
          : projects.length === 0
          ? <Col><Alert variant="info">No projects assigned yet.</Alert></Col>
          : projects.map((proj) => (
              <Col key={proj.id} md={6} lg={4}>
                <Card className="shadow-sm border-primary">
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                      <span>{proj.name}</span>
                      <Badge bg={getStatusVariant(proj.status)} pill>
                        {proj.status.replace("_", " ")}
                      </Badge>
                    </Card.Title>
                  
                    <Card.Text style={{ fontSize: "0.9rem" }}>
                      <strong>Description:</strong>{" "}
                      {proj.description.length > 100
                        ? proj.description.slice(0, 100) + "..."
                        : proj.description}
                      <br />
                      <strong>Start:</strong>{" "}
                      {new Date(proj.startDate).toLocaleDateString()} <br />
                      <strong>End:</strong>{" "}
                      {new Date(proj.endDate).toLocaleDateString()}
                    </Card.Text>
                    <Button variant="outline-primary" onClick={() => openModal(proj)}>
                      Update Status
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Project Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            value={statusUpdateMap[selectedProject?.id] || "NOT_STARTED"}
            onChange={handleStatusChange}
          >
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="PENDING">Pending</option>
            <option value="BLOCKED">Blocked</option>
          </Form.Select>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {message && <Alert variant="success" className="mt-3">{message}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleStatusUpdate}
            disabled={updatingId === selectedProject?.id}
          >
            {updatingId === selectedProject?.id ? (
              <>
                <Spinner animation="border" size="sm" /> Updating...
              </>
            ) : (
              "Update"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
