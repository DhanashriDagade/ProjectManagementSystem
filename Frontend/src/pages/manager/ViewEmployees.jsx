import React, { useEffect, useState } from "react";
import { Table, Container, Alert, Spinner, Card } from "react-bootstrap";
import axios from "axios";
import { FaUsers } from "react-icons/fa";

export default function ViewEmployees() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8080/api/manager/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(res.data)) {
        setEmployees(res.data);
        setError("");
      } else {
        setError("Unexpected response format: expected an array.");
        setEmployees([]);
      }
    } catch (err) {
      setError("Failed to fetch employees.");
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-4" style={{ maxWidth: "1000px" }}>
      <Card className="shadow-sm p-4 bg-white rounded">
        <div className="d-flex align-items-center mb-4">
          <FaUsers size={28} className="text-primary me-2" />
          <h3 className="mb-0 text-primary">Employees List</h3>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" variant="primary" />
            <div className="mt-2 text-muted">Loading employees...</div>
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead className="table-primary">
              <tr>
                <th style={{ width: "4%" }}>#</th>
                <th style={{ width: "12%" }}>First Name</th>
                <th style={{ width: "12%" }}>Last Name</th>
                <th style={{ width: "22%" }}>Email</th>
                <th style={{ width: "12%" }}>City</th>
                <th style={{ width: "12%" }}>Phone</th>
                <th style={{ width: "12%" }}>Pincode</th>
                <th style={{ width: "12%" }}>Gender</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((emp, idx) => (
                  <tr key={emp.id}>
                    <td>{idx + 1}</td>
                    <td>{emp.firstName}</td>
                    <td>{emp.lastName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.city}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.pincode}</td>
                    <td>{emp.gender}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted py-4" style={{ fontStyle: "italic" }}>
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
}
