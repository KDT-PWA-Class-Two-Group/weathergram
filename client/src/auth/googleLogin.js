const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const googleLogin = () => {
  window.location.assign(`${API_BASE}/api/auth/google`);
};
