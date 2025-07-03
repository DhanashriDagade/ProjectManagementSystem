import React from "react";
import { Container, Card, Badge, Alert } from "react-bootstrap";

export default function CompletedTasksPage() {
  const completedProjects = [
    {
      id: 1,
      name: "Website Redesign",
      description: "Revamp the entire corporate website.",
      startDate: "2024-01-01",
      endDate: "2024-03-01",
      status: "COMPLETED",
      manager: { name: "Mr. A. Sharma" },
      tasks: [
        { id: 101, title: "Create wireframes", status: "COMPLETED" },
        { id: 102, title: "Develop landing page", status: "COMPLETED" },
      ],
    },
    {
      id: 2,
      name: "Mobile App Launch",
      description: "Launch the Android version of our e-commerce app.",
      startDate: "2024-02-10",
      endDate: "2024-04-15",
      status: "COMPLETED",
      manager: { name: "Ms. R. Mehta" },
      tasks: [
        { id: 201, title: "Design UI", status: "COMPLETED" },
        { id: 202, title: "Integrate payment gateway", status: "COMPLETED" },
      ],
    },
    {
      id: 3,
      name: "Cloud Migration",
      description: "Move on-premise infrastructure to AWS cloud services.",
      startDate: "2024-05-01",
      endDate: "2024-07-10",
      status: "COMPLETED",
      manager: { name: "Mr. S. Iyer" },
      tasks: [
        { id: 301, title: "Set up VPC and EC2", status: "COMPLETED" },
        { id: 302, title: "Database migration", status: "COMPLETED" },
      ],
    },
    {
      id: 4,
      name: "Customer Feedback System",
      description: "Develop a feedback collection platform for users.",
      startDate: "2024-06-15",
      endDate: "2024-08-01",
      status: "COMPLETED",
      manager: { name: "Ms. D. Kapoor" },
      tasks: [
        { id: 401, title: "Build feedback form", status: "COMPLETED" },
        { id: 402, title: "Create analytics dashboard", status: "COMPLETED" },
      ],
    },
    {
      id: 5,
      name: "Internal HR Portal",
      description: "Create a portal for HR team to manage employee records.",
      startDate: "2024-03-01",
      endDate: "2024-05-30",
      status: "COMPLETED",
      manager: { name: "Mr. V. Deshmukh" },
      tasks: [
        { id: 501, title: "User authentication", status: "COMPLETED" },
        { id: 502, title: "Leave management module", status: "COMPLETED" },
      ],
    },
  ];

  const getStatusBadge = (status) => {
    const statusColors = {
      COMPLETED: "success",
      IN_PROGRESS: "warning",
      NOT_STARTED: "secondary",
      BLOCKED: "danger",
      PENDING: "info",
    };

    return (
      <Badge
        bg={statusColors[status] || "dark"}
        style={{
          fontWeight: "600",
          fontSize: "0.85rem",
          padding: "0.35em 0.75em",
          textTransform: "uppercase",
          borderRadius: "12px",
          minWidth: "90px",
          textAlign: "center",
        }}
      >
        {status}
      </Badge>
    );
  };

  return (
    <Container className="mt-5 mb-5" style={{ maxWidth: "900px" }}>
      <h3
        className="mb-4 text-black" >
         Completed Projects & Tasks
      </h3>

      {completedProjects.length === 0 ? (
        <Alert
          variant="info"
          className="fs-5"
          style={{ borderRadius: "10px", padding: "1.2rem 1.5rem" }}
        >
          No completed projects available.
        </Alert>
      ) : (
        completedProjects.map((proj, idx) => (
          <Card
            key={proj.id}
            className="mb-4 shadow"
            style={{
              borderRadius: "16px",
              border: "1.5px solidrgb(129, 239, 175)",
              transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 8px 20px #63e298")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)")
            }
          >
            <Card.Header
              style={{
                backgroundColor: "#38a169",
                color: "white",
                fontWeight: "700",
                fontSize: "1.25rem",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.9rem 1.5rem",
                letterSpacing: "0.05em",
              }}
            >
              <span>
                {idx + 1}. {proj.name}
              </span>
              {getStatusBadge(proj.status)}
            </Card.Header>

            <Card.Body style={{ padding: "1.5rem 2rem" }}>
              <p
                style={{
                  marginBottom: "0.6rem",
                  fontWeight: "600",
                  color: "#276749",
                }}
              >
                Manager: <span style={{ fontWeight: "400" }}>{proj.manager.name}</span>
              </p>
              <p style={{ marginBottom: "1rem", color: "#4a5568" }}>
                Description: {proj.description}
              </p>
              <p style={{ marginBottom: "1.5rem", color: "#2f855a" }}>
                <strong>Start Date:</strong>{" "}
                {new Date(proj.startDate).toLocaleDateString()} <br />
                <strong>End Date:</strong>{" "}
                {new Date(proj.endDate).toLocaleDateString()}
              </p>

              {proj.tasks?.length > 0 ? (
                <>
                  <h6
                    style={{
                      marginBottom: "1rem",
                      fontWeight: "700",
                      color: "#2f855a",
                      letterSpacing: "0.05em",
                    }}
                  >
                    📝 Completed Tasks:
                  </h6>
                  <ul
                    style={{
                      paddingLeft: "1.25rem",
                      marginBottom: 0,
                      color: "#2d3748",
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {proj.tasks.map((task) => (
                      <li
                        key={task.id}
                        style={{
                          marginBottom: "0.4rem",
                          display: "flex",
                          justifyContent: "space-between",
                          maxWidth: "500px",
                        }}
                      >
                        <span>{task.title}</span>
                        <span>{getStatusBadge(task.status)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p
                  style={{
                    fontStyle: "italic",
                    color: "#718096",
                    marginBottom: 0,
                  }}
                >
                  No completed tasks for this project.
                </p>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}
