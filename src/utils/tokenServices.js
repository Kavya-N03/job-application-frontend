export const saveTokens = (access) => {
  localStorage.setItem("token", access);
};

export const getAccessToken = () => {
  return localStorage.getItem("token");
};

export const removeTokens = () => {
  localStorage.removeItem("token");

};