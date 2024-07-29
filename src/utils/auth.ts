// src/utils/auth.js
export const logout = () => {
  // Clear token from local storage or any other storage
  localStorage.removeItem('tizaraAdminToken');

  // Redirect to login page
  window.location.href = '/'; // Adjust the path as needed
};
