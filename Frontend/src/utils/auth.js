// src/utils/auth.js
export const handleLogout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/");
};
