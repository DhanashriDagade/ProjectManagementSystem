import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/HomePage";
import Contactus from "./pages/Contactus";
import RegisterAdmin from "./pages/auth/RegisterAdmin";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ManagerDashboardPage from "./pages/manager/ManagerDashboardPage";
import EmployeeDashboardPage from "./pages/employee/EmployeeDashboardPage";

import ProtectedRoute from "./components/common/ProtectedRoute";
import ViewManagers from "./pages/admin/ViewManagers";
import RegisterManager from "./pages/admin/RegisterManager";
import ViewProjects from "./pages/admin/ViewProjects";
import RegisterEmployee from "./pages/manager/RegisterEmployee";
import ViewEmployees from "./pages/manager/ViewEmployees";
import AssignProject from "./pages/manager/AssignProject";
import ViewAssignedProjects from "./pages/manager/ViewAssignedProjects";
import ViewAssignedProjectsEmp from "./pages/employee/ViewAssignedProjectsEmp";
import Messages from "./pages/employee/Messages";
import CompletedTasksPage from "./pages/employee/CompletedTasksPage";
import ViewProjectsAdmin from "./pages/admin/ViewProjectsAdmin";
import AdminNavbar from "./components/admin/AdminNavbar";
import AdminSidebar from "./components/admin/AdminSidebar";
import BaseLayout from "./components/admin/BaseLayout";
import AddProjects from "./pages/admin/AddProject";
import EmployeeNavbar from "./components/employee/EmployeeNavbar";
import EmployeeSidebar from "./components/employee/EmployeeSidebar";
import ManagerNavbar from "./components/manager/ManagerNavbar";
import ManagerSidebar from "./components/manager/ManagerSidebar";


import AboutUs from "./pages/AboutUs";



function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Admin Protected Route */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <BaseLayout Navbar={AdminNavbar} Sidebar={AdminSidebar}>

                <AdminDashboardPage />
              </BaseLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/register-manager"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <BaseLayout Navbar={AdminNavbar} Sidebar={AdminSidebar}>
                <RegisterManager />
              </BaseLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/admin/view-managers" element={
          <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
            <BaseLayout Navbar={AdminNavbar} Sidebar={AdminSidebar}>
              <ViewManagers />
            </BaseLayout>
          </ProtectedRoute>
        } />
        <Route
          path="/admin/add-project"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <BaseLayout Navbar={AdminNavbar} Sidebar={AdminSidebar}>
                <AddProjects />
              </BaseLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/view-projects"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <BaseLayout Navbar={AdminNavbar} Sidebar={AdminSidebar}>
                <ViewProjects />
              </BaseLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/view-projectsadmin"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <BaseLayout Navbar={AdminNavbar} Sidebar={AdminSidebar}>
                <ViewProjectsAdmin />
              </BaseLayout>
            </ProtectedRoute>
          }
        />

        {/* Manager Protected Route */}
        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ROLE_MANAGER"]}>
              <BaseLayout Navbar={ManagerNavbar} Sidebar={ManagerSidebar}>
                <ManagerDashboardPage />
              </BaseLayout>
            </ProtectedRoute>
          }
        />

        <Route path="/manager/register-employee" element={
          <ProtectedRoute allowedRoles={['ROLE_MANAGER']}>
            <BaseLayout Navbar={ManagerNavbar} Sidebar={ManagerSidebar}>
              <RegisterEmployee />
            </BaseLayout>
          </ProtectedRoute>
        } />

        <Route
          path="/manager/employees"
          element={
            <ProtectedRoute allowedRoles={["ROLE_MANAGER"]}>
              <BaseLayout Navbar={ManagerNavbar} Sidebar={ManagerSidebar}>
                <ViewEmployees />
              </BaseLayout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/assign-project"
          element={
            <ProtectedRoute allowedRoles={["ROLE_MANAGER"]}>
              <BaseLayout Navbar={ManagerNavbar} Sidebar={ManagerSidebar}>
                <AssignProject />
              </BaseLayout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/view-assigned"
          element={
            <ProtectedRoute allowedRoles={["ROLE_MANAGER"]}>
              <BaseLayout Navbar={ManagerNavbar} Sidebar={ManagerSidebar}>
                <ViewAssignedProjects />
              </BaseLayout>
            </ProtectedRoute>
          }
        />


        {/* Employee Protected Route */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ROLE_EMPLOYEE"]}>
              <BaseLayout Navbar={EmployeeNavbar} Sidebar={EmployeeSidebar}>
                <EmployeeDashboardPage />
              </BaseLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/update-status"
          element={
            <ProtectedRoute allowedRoles={["ROLE_EMPLOYEE"]}>
              <BaseLayout Navbar={EmployeeNavbar} Sidebar={EmployeeSidebar}>
                <CompletedTasksPage />
              </BaseLayout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/messages"
          element={
            <ProtectedRoute allowedRoles={["ROLE_EMPLOYEE"]}>
              <BaseLayout Navbar={EmployeeNavbar} Sidebar={EmployeeSidebar}>
                <Messages />
              </BaseLayout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/projects"
          element={
            <ProtectedRoute allowedRoles={["ROLE_EMPLOYEE"]}>
              <BaseLayout Navbar={EmployeeNavbar} Sidebar={EmployeeSidebar}>
                <ViewAssignedProjectsEmp />
              </BaseLayout>

            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
