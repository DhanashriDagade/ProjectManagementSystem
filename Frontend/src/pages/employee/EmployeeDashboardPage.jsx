import React from "react";

export default function EmployeeDashboardPage() {
  return (
    <div style={styles.container}>
      {/* Welcome Banner */}
      <div style={styles.welcomeCard}>
        <h2 style={styles.heading}>Welcome, Employee!</h2>
        <p style={styles.subtext}>
          This is your dashboard. Stay updated with manager messages and team activities.
        </p>
      </div>

      {/* Manager Announcements */}
      <div style={styles.sectionCard}>
        <h3 style={styles.sectionHeading}>📢 Manager Announcements</h3>
        <ul style={styles.list}>
          <li>📌 Team meeting scheduled for Friday at 3 PM.</li>
          <li>📌 Submit your weekly reports by end of day Thursday.</li>
          <li>📌 New training modules available on the portal.</li>
        </ul>
      </div>

      {/* Stats Section */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Upcoming Meetings</p>
          <p style={styles.statValue}>3</p>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>Team Members</p>
          <p style={styles.statValue}>12</p>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>Tasks Due</p>
          <p style={{ ...styles.statValue, color: "red" }}>5</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
  },
  welcomeCard: {
    backgroundColor: "#4a90e2",
    color: "#fff",
    padding: "25px",
    borderRadius: "10px",
    marginBottom: "25px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  subtext: {
    fontSize: "16px",
  },
  sectionCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "25px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },
  sectionHeading: {
    fontSize: "20px",
    marginBottom: "15px",
    color: "#333",
  },
  list: {
    paddingLeft: "20px",
    fontSize: "15px",
    color: "#444",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
  },
  statCard: {
    flex: "1 1 30%",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  statLabel: {
    fontSize: "14px",
    color: "#666",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
};
