import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Spinner,
  Alert,
  Form,
  Button,
  Placeholder,
  Badge,
} from "react-bootstrap";
import axios from "axios";

export default function ManagerAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [statusUpdateMap, setStatusUpdateMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/manager/assignments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignments(res.data);

      const initialStatusMap = {};
      res.data.forEach((assignment) => {
        initialStatusMap[assignment.employeeProjectId] = assignment.taskStatus;
      });
      setStatusUpdateMap(initialStatusMap);
    } catch (err) {
      setError("Failed to fetch assignments.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (assignmentId, newStatus) => {
    setStatusUpdateMap((prev) => ({
      ...prev,
      [assignmentId]: newStatus,
    }));
    setSuccessMsg("");
  };

  const handleUpdateStatus = async (assignmentId) => {
    setUpdatingId(assignmentId);
    setError("");
    setSuccessMsg("");
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/manager/assignment-status/${assignmentId}`,
        { status: statusUpdateMap[assignmentId] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAssignments((prev) =>
        prev.map((assignment) =>
          assignment.employeeProjectId === assignmentId
            ? { ...assignment, taskStatus: statusUpdateMap[assignmentId] }
            : assignment
        )
      );

      setSuccessMsg("Task status updated successfully.");
    } catch (err) {
      setError("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusVariantMap = {
    PENDING: "secondary",
    IN_PROGRESS: "info",
    COMPLETED: "success",
    BLOCKED: "danger",
  };

  const renderSkeleton = () => {
    const skeletons = Array.from({ length: 6 }).map((_, idx) => (
      <Col key={idx}>
        <Card className="shadow-sm" aria-hidden="true" style={{ minHeight: "280px" }}>
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Subtitle} animation="glow" className="mb-2">
              <Placeholder xs={4} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <br />
              <Placeholder xs={4} /> <br />
              <Placeholder xs={5} /> <br />
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder.Button variant="primary" xs={4} />
          </Card.Body>
        </Card>
      </Col>
    ));
    return <Row xs={1} md={2} lg={3} className="g-4">{skeletons}</Row>;
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-dark">Employee Project Assignments</h3>

      {error && <Alert variant="danger">{error}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}

      {loading ? (
        renderSkeleton()
      ) : assignments.length === 0 ? (
        <Alert variant="info">No assignments found.</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {assignments.map((assignment) => {
            const currentStatus = assignment.taskStatus || "UNKNOWN";
            const badgeVariant = statusVariantMap[currentStatus] || "secondary";
            return (
              <Col key={assignment.employeeProjectId}>
                <Card className="shadow-sm h-100 border-primary">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="mb-2 d-flex justify-content-between align-items-center">
                      <span>{assignment.projectName}</span>
                      <Badge bg={badgeVariant} pill>
                        {currentStatus.replace("_", " ")}
                      </Badge>
                    </Card.Title>

                    <Card.Subtitle className="mb-3 text-muted small">
                      Assignment ID: {assignment.employeeProjectId}
                    </Card.Subtitle>

                    <Card.Text className="flex-grow-1 mb-3" style={{ fontSize: "0.9rem" }}>
                      <strong>Employee:</strong> {assignment.employeeName} <br />
                      <strong>Email:</strong> {assignment.employeeEmail} <br />
                      <strong>Project Description:</strong>{" "}
                      {assignment.projectDescription?.length > 100
                        ? assignment.projectDescription.substring(0, 100) + "..."
                        : assignment.projectDescription}
                    </Card.Text>

                    <Form.Group controlId={`statusSelect-${assignment.employeeProjectId}`}>
                      <Form.Label>Update Task Status</Form.Label>
                      <Form.Select
                        value={
                          statusUpdateMap[assignment.employeeProjectId] || currentStatus
                        }
                        onChange={(e) =>
                          handleStatusChange(assignment.employeeProjectId, e.target.value)
                        }
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="BLOCKED">BLOCKED</option>
                      </Form.Select>
                    </Form.Group>

                    <Button
                      variant="primary"
                      className="mt-3 align-self-start"
                      disabled={
                        updatingId === assignment.employeeProjectId ||
                        statusUpdateMap[assignment.employeeProjectId] === assignment.taskStatus
                      }
                      onClick={() => handleUpdateStatus(assignment.employeeProjectId)}
                    >
                      {updatingId === assignment.employeeProjectId ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          Updating...
                        </>
                      ) : (
                        "Update Status"
                      )}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}
