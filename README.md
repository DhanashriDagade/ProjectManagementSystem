# 📋 Project Management System

A full-stack web application built using **Spring Boot**, **MySQL**, and **React (Vite)** to efficiently manage projects in a corporate environment. This system supports Admin, Manager, and Employee roles — each with custom dashboards and APIs.

---

## 🎯 Roles & Functionalities

### 🔐 Public User
- **Register as Admin** → `POST /api/auth/register`
- **Login** (Admin/Manager/Employee) → `POST /api/auth/login`

Once logged in, users receive a **JWT Token**.

---

### 🧑‍💼 Admin Dashboard
- 🔹 Register/View/Update/Delete Managers  
  - `POST /api/admin/managers`  
  - `GET /api/admin/managers`  
  - `PUT/DELETE /api/admin/managers/{id}`  
- 🔹 Create/View/Update/Delete Projects  
  - `POST /api/admin/projects`  
  - `GET /api/admin/projects`  
  - `PUT/DELETE /api/admin/projects/{id}`  
- 🔹 Assign Project to Manager → `PUT /api/admin/projects/assign`
- 🔹 View Task Status → `GET /api/admin/employee-project-status`

---

### 👨‍💼 Manager Dashboard
- 🔹 View Assigned Projects → `GET /api/manager/projects`
- 🔹 Register/View Employees  
  - `POST /api/manager/employees`  
  - `GET /api/manager/employees`  
- 🔹 Assign Project to Employees → `POST /api/manager/assign-project`
- 🔹 View Task Status → `GET /api/manager/assignments`
- 🔹 Update Project Status → `PUT /api/manager/assignment-status/{employeeProjectId}`

---

### 👩‍💻 Employee Dashboard
- 🔹 View Assigned Projects → `GET /api/employee/projects`
- 🔹 Update Project Status → `PUT /api/employee/project-status/{projectId}`  
  (Task Status: `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`)

---

## 🖼️ API Flow Diagram

Here’s a visual overview of the API structure across roles:

![API Flow Diagram](assets/api-flow.png)

> 📌 Place this image in a folder like `/assets/api-flow.png` or `/frontend/public/assets/`

---

## 🚀 How to Run the Project

### ✅ Start Spring Boot Backend
```bash
cd backend
mvn spring-boot:run
