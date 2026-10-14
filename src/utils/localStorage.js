// user 

export const saveUserId = (userId) => {
  localStorage.setItem("eloriaUserId", String(userId));
};

export const getUserId = () => {
  return localStorage.getItem("eloriaUserId");
};

export const removeUserId = () => {
  localStorage.removeItem("eloriaUserId");
};


// admin

export const saveAdminId = (adminId) => {
  localStorage.setItem("eloriaAdminId", String(adminId));
};

export const getAdminId = () => {
  return localStorage.getItem("eloriaAdminId");
};

export const removeAdminId = () => {
  localStorage.removeItem("eloriaAdminId");
};