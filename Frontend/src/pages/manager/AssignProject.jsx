import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Spinner,
  Card,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import { FolderFill, PeopleFill, CheckCircleFill } from "react-bootstrap-icons";

export default function AssignProject() {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const [projectsRes, employeesRes] = await Promise.all([
        axios.get("http://localhost:8080/api/manager/projects", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/manager/employees", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setProjects(projectsRes.data);
      setEmployees(employeesRes.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!selectedProject || selectedEmployees.length === 0) {
      setError("Please select a project and at least one employee.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/api/manager/assign-project",
        {
          projectId: Number(selectedProject),
          employeeIds: selectedEmployees,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Project assigned successfully!");
      setSelectedProject("");
      setSelectedEmployees([]);
    } catch (err) {
      setError("Failed to assign project. Please try again.");
    }
  };

  const selectedProjDetails = projects.find(
    (proj) => proj.id === Number(selectedProject)
  );

  return (
    <Container className="py-4" style={{ maxWidth: "700px" }}>
      <Card className="shadow-lg p-4 rounded-4" style={{ backgroundColor: "#f8f9fa" }}>
        <h3 className="mb-3 text-center fw-bold text-primary">
          Assign Project to Employees
        </h3>
        <p className="text-center text-secondary mb-4">
          Select a project and assign it to one or more employees.
        </p>

        {message && (
          <Alert
            variant="success"
            onClose={() => setMessage("")}
            dismissible
            className="text-center"
          >
            <CheckCircleFill className="me-2" />
            {message}
          </Alert>
        )}
        {error && (
          <Alert
            variant="danger"
            onClose={() => setError("")}
            dismissible
            className="text-center"
          >
            {error}
          </Alert>
        )}
        {loading && (
          <div className="text-center mb-3">
            <Spinner animation="border" variant="primary" />
            <div className="mt-2">Loading data...</div>
          </div>
        )}

        {!loading && (
          <Form onSubmit={handleAssign}>
            {/* Select Project */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Select Project</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FolderFill />
                </InputGroup.Text>
                <Form.Select
                  required
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  aria-label="Select project"
                >
                  <option value="">-- Select Project --</option>
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.id}>
                      {proj.name}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Form.Group>

            {/* Project Details */}
            {selectedProjDetails && (
              <Card
                className="mb-4 shadow-sm"
                style={{ backgroundColor: "white" }}
              >
                <Card.Body>
                  <Card.Title className="text-primary fw-bold">
                    {selectedProjDetails.name}
                  </Card.Title>
                  <Card.Text className="mb-0" style={{ whiteSpace: "pre-line" }}>
                    <strong>Description:</strong> {selectedProjDetails.description}
                    <br />
                    <strong>Start Date:</strong>{" "}
                    {new Date(selectedProjDetails.startDate).toLocaleDateString()}
                    <br />
                    <strong>End Date:</strong>{" "}
                    {new Date(selectedProjDetails.endDate).toLocaleDateString()}
                    <br />
                    <strong>Manager:</strong>{" "}
                    {selectedProjDetails.manager.firstName}{" "}
                    {selectedProjDetails.manager.lastName} (
                    {selectedProjDetails.manager.email})
                  </Card.Text>
                </Card.Body>
              </Card>
            )}

            {/* Select Employees */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Select Employees</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <PeopleFill />
                </InputGroup.Text>
                <Form.Control
                  as="select"
                  required
                  multiple
                  value={selectedEmployees}
                  onChange={(e) =>
                    setSelectedEmployees(
                      Array.from(e.target.selectedOptions, (opt) => Number(opt.value))
                    )
                  }
                  style={{ minHeight: "150px", borderRadius: "0 0.25rem 0.25rem 0" }}
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.firstName} {emp.lastName} - {emp.email}
                    </option>
                  ))}
                </Form.Control>
              </InputGroup>
              <Form.Text muted>
                Hold Ctrl (Windows) or Command (Mac) to select multiple.
              </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="px-5 shadow-sm"
                style={{ fontWeight: "600" }}
              >
                Assign Project
              </Button>
            </div>
          </Form>
        )}
      </Card>
    </Container>
  );
}
