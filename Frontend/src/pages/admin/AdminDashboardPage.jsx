import React from "react";
import { Container, Row, Col, Card, Button, ProgressBar } from "react-bootstrap";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { BriefcaseFill, PeopleFill, ClipboardCheckFill } from "react-bootstrap-icons";

const weeklyData = [
  { name: 'Mon', tasks: 12 },
  { name: 'Tue', tasks: 18 },
  { name: 'Wed', tasks: 9 },
  { name: 'Thu', tasks: 14 },
  { name: 'Fri', tasks: 20 },
  { name: 'Sat', tasks: 5 },
];

const statusData = [
  { name: 'Completed', value: 60 },
  { name: 'In Progress', value: 30 },
  { name: 'Pending', value: 10 },
];

const COLORS = ["#6c757d", "#ffc107", "#28a745"];

export default function AdminDashboardPage() {
  return (
    <div
        style={{
        backgroundColor: "rgba(255, 255, 255, 0.15)", // transparent white
        borderRadius: "10px",
        backdropFilter: "blur(8px)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        color: "#000",
      }}
      
    >
      <div style={{ marginLeft: '0px', width: '100%' }}>
        <Container className="pt-4 pb-5">
          <h2 className="mb-4">Welcome back, Admin! 👋</h2>

          {/* Dashboard Summary */}
          <Row className="mb-4">
            <Col md={4}>
              <Card bg="light" text="dark" className="shadow-sm">
                <Card.Body>
                  <Card.Title><BriefcaseFill className="me-2 text-primary" /> Total Projects</Card.Title>
                  <h3>24</h3>
                  <ProgressBar now={80} label={`80% Active`} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card bg="light" text="dark" className="shadow-sm">
                <Card.Body>
                  <Card.Title><PeopleFill className="me-2 text-success" /> Registered Managers</Card.Title>
                  <h3>12</h3>
                  <ProgressBar variant="success" now={60} label={`60% Engaged`} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card bg="light" text="dark" className="shadow-sm">
                <Card.Body>
                  <Card.Title><ClipboardCheckFill className="me-2 text-warning" /> Tasks</Card.Title>
                  <h3>120</h3>
                  <ProgressBar variant="warning" now={45} label={`45% Completed`} />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Charts */}
          <Row className="mb-4">
            <Col md={7}>
              <Card bg="light" text="dark" className="shadow-sm">
                <Card.Body>
                  <Card.Title>📊 Weekly Task Activity</Card.Title>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="tasks" fill="#1e88e5" radius={[5, 5, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>

            <Col md={5}>
              <Card bg="light" text="dark" className="shadow-sm">
                <Card.Body>
                  <Card.Title>📈 Project Status Overview</Card.Title>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Activity */}
          <Card bg="light" text="dark" className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>🕒 Recent Activities</Card.Title>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">✅ Project <strong>Alpha</strong> assigned to <strong>John Doe</strong></li>
                <li className="mb-2">🔄 <strong>Manager Jane</strong> updated profile settings</li>
                <li className="mb-2">🛠️ New project <strong>"Beta Build"</strong> initiated</li>
              </ul>
            </Card.Body>
          </Card>

          {/* Quick Actions */}
          <Row>
            <Col md={6} className="mb-3">
              <Card bg="light" text="dark" className="shadow-sm">
                <Card.Body>
                  <Card.Title>🚀 Quick Action</Card.Title>
                  <Button variant="primary" href="/admin/add-project">➕ Add New Project</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-3">
              <Card bg="light" text="dark" className="shadow-sm">
                <Card.Body>
                  <Card.Title>👥 Quick Action</Card.Title>
                  <Button variant="success" href="/admin/register-manager">👤 Register New Manager</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
