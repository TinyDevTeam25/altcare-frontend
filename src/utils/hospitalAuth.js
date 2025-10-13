/**
 * Simple helper functions for hospital authentication data
 */

// Save hospital auth data to localStorage
export function saveHospitalAuth(data) {
  localStorage.setItem("hospitalData", JSON.stringify(data));
}

// Get hospital auth data from localStorage
export function getHospitalAuth() {
  const data = localStorage.getItem("hospitalData");
  return data ? JSON.parse(data) : null;
}

// Clear hospital auth data
export function clearHospitalAuth() {
  localStorage.removeItem("hospitalData");
}
