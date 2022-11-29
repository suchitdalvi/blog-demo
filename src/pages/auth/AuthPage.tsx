import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";

export default function AuthPage() {
  const { currentUser } = useAppSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/myblog");
    }
  }, [currentUser, navigate]);

  return (
    <div className="flex content-center items-center justify-center h-full">
      <div className="w-full lg:w-6/12 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
