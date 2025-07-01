export const saveToken = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const removeToken = () => {
  localStorage.removeItem("access_token");
};

// Lưu thông tin người dùng vào localStorage
export const saveUserInfo = (user: any) => {
  localStorage.setItem("user_info", JSON.stringify(user));
};

export const getUserInfo = () => {
  const data = localStorage.getItem("user_info");
  return data ? JSON.parse(data) : null;
};

export const removeUserInfo = () => {
  localStorage.removeItem("user_info");
};

export const getUserId = () => {
  const user = getUserInfo();
  return user?._id;
};
