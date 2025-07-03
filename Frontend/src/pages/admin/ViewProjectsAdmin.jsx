import React, { useEffect, useState } from "react";
import {
  Table,
  Container,
  Badge,
  Form,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import { FaTasks, FaProjectDiagram } from "react-icons/fa";

export default function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [employeeStatuses, setEmployeeStatuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, statusesRes] = await Promise.all([
          axios.get("http://localhost:8080/api/admin/projects", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8080/api/admin/employee-project-status", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setProjects(projectsRes.data);
        setEmployeeStatuses(statusesRes.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, [token]);

  const getStatusVariant = (status) => {
    switch (status) {
      case "NOT_STARTED":
        return "secondary";
      case "IN_PROGRESS":
        return "warning";
      case "COMPLETED":
        return "success";
      default:
        return "light";
    }
  };

  const filteredProjects = projects.filter((project) => {
    const managerName = project.manager
      ? `${project.manager.firstName} ${project.manager.lastName}`
      : "";
    return (
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      managerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Container className="mt-4 p-4 rounded shadow-sm bg-light">
      <h3 className="text-center mb-4 text-primary fw-bold">
        <FaProjectDiagram className="me-2" />
        Project Assignment & Status Overview
      </h3>

      <InputGroup className="mb-3 shadow-sm rounded-5">
        <Form.Control
          className="border-0 rounded-5 py-2 px-3"
          style={{
            backgroundColor: "#fef9e7",
            color: "#333",
            border: "1px solid #b6dffd",
          }}
          placeholder="Search by project name, description or manager"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <div className="table-responsive">
        <Table bordered hover responsive className="align-middle text-center">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Project Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Assigned Manager</th>
              <th>Employee Name(s)</th>
              <th>
                <FaTasks className="me-1" />
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project, idx) => {
              const employees = employeeStatuses.filter(
                (e) => e.projectId === project.id
              );

              return (
                <tr key={project.id}>
                  <td>{idx + 1}</td>
                  <td className="fw-semibold">{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.startDate || <i>N/A</i>}</td>
                  <td>{project.endDate || <i>N/A</i>}</td>
                  <td>
                    {project.manager
                      ? `${project.manager.firstName} ${project.manager.lastName}`
                      : <span className="text-muted">Not Assigned</span>}
                  </td>
                  <td>
                    {employees.length === 0
                      ? "No employees"
                      : employees.map((emp) => (
                          <div key={emp.employeeId}>{emp.employeeName}</div>
                        ))}
                  </td>
                  <td>
                    {employees.length === 0
                      ? "-"
                      : employees.map((emp) => (
                          <div key={emp.employeeId + "-status"}>
                            <Badge bg={getStatusVariant(emp.taskStatus)}>
                              {emp.taskStatus
                                ? emp.taskStatus.replace("_", " ")
                                : "Unknown"}
                            </Badge>
                          </div>
                        ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
