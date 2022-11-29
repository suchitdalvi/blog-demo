import { User } from "../models/user.interface";

const setLoggedInUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const logout = () => {
  localStorage.removeItem("user");
};

const getLoggedInUser = (): User | null => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};

const authService = {
  setLoggedInUser,
  logout,
  getLoggedInUser,
};
export default authService;
