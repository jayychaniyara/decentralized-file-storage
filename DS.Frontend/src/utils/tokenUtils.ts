export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  const loginTime = localStorage.getItem('lastLogin');

  if (!token || !loginTime) return false;

  const diffInMs = Date.now() - parseInt(loginTime, 10);
  const diffInMinutes = diffInMs / (1000 * 60);

  return diffInMinutes <= 20;
};
