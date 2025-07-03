import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell
} from "recharts";
import { Card, Row, Col, Container, ListGroup, Button } from "react-bootstrap";
import { PeopleFill, CheckCircleFill, PersonPlusFill, GearFill, ChatDotsFill, CalendarFill } from "react-bootstrap-icons";

const pieData = [
  { name: "Not Started", value: 5 },
  { name: "In Progress", value: 12 },
  { name: "Completed", value: 8 },
];

const COLORS = ["#6c757d", "#ffc107", "#28a745"];

const barData = [
  { name: "Project A", Completed: 4 },
  { name: "Project B", Completed: 6 },
  { name: "Project C", Completed: 3 },
  { name: "Project D", Completed: 7 },
];

const recentActivities = [
  "Employee John submitted report for Project B",
  "New employee registration: Alice Smith",
  "Project C deadline extended by 2 days",
  "Meeting scheduled with client for Project A",
  "Task status updated for Project D",
];

export default function ManagerDashboardPage() {
  return (
    <Container
      className="py-4"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.15)", // transparent white
        borderRadius: "10px",
        backdropFilter: "blur(8px)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        color: "#000",
      }}
    >
      <h2 className="text-center fw-bold text-black mb-4">Manager Dashboard</h2>

      <Row className="mb-4 g-4">
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body className="d-flex align-items-center">
              <PeopleFill size={40} className="me-3 text-info" />
              <div>
                <h5 className="mb-0">Total Employees</h5>
                <h3>25</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body className="d-flex align-items-center">
              <CheckCircleFill size={40} className="me-3 text-success" />
              <div>
                <h5 className="mb-0">Projects Completed</h5>
                <h3>15</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body className="d-flex align-items-center">
              <PersonPlusFill size={40} className="me-3 text-warning" />
              <div>
                <h5 className="mb-0">New Registrations</h5>
                <h3>4</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="text-center mb-4 fw-bold">Project Completion Overview</h5>
              <BarChart width={450} height={300} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Completed" fill="#007bff" />
              </BarChart>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="text-center mb-4 fw-bold">Task Status Distribution</h5>
              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" />
                <Tooltip />
              </PieChart>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activities */}
      <Row className="mb-5">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="fw-bold mb-3">Recent Activities</h5>
              <ListGroup variant="flush" className="small">
                {recentActivities.map((activity, idx) => (
                  <ListGroup.Item key={idx} className="border-0 p-2">
                    {activity}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="fw-bold mb-3">Quick Actions</h5>
              <div className="d-flex flex-column gap-3">
                <Button variant="primary" className="d-flex align-items-center">
                  <GearFill className="me-2" /> Manage Projects
                </Button>
                <Button variant="success" className="d-flex align-items-center">
                  <PersonPlusFill className="me-2" /> Register Employee
                </Button>
                <Button variant="warning" className="d-flex align-items-center">
                  <CalendarFill className="me-2" /> View Calendar
                </Button>
                <Button variant="info" className="d-flex align-items-center">
                  <ChatDotsFill className="me-2" /> Team Messages
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Motivational Quote */}
      <Card className="shadow-sm border-0 text-center py-4" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
        <blockquote className="blockquote mb-0">
          <p className="fs-5 fst-italic">
            "Leadership is not about being in charge. It is about taking care of those in your charge." 
          </p>
        </blockquote>
      </Card>
    </Container>
  );
}
