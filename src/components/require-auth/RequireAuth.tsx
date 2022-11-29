import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../redux/hook";
import authService from "../../shared/services/auth.service";

export default function RequireAuth() {
  const { currentUser } = useAppSelector((state) => state.users);
  const loggedUser = authService.getLoggedInUser();

  return currentUser || loggedUser ? <Outlet /> : <Navigate to="/auth/" replace />;
}
