import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { setCurrentUser } from "../../redux/slice/users.slice";

import { ALL_CATEGORIES } from "../../shared/constants/app.constants";
import authService from "../../shared/services/auth.service";
import Button from "../../ui/button/Button";

export default function Header() {
  const curretUser = authService.getLoggedInUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = (): void => {
    authService.logout();
    dispatch(setCurrentUser(null));
    navigate("/");
  };

  return (
    <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            to="/"
            tabIndex={1}
          >
            Medium
          </Link>
        </div>
        <div className="lg:flex flex-grow items-center bg-white lg:shadow-none hidden">
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            {ALL_CATEGORIES.map((cateogry) => (
              <li className="flex items-center" key={cateogry}>
                <Link
                  className="lg:text-black lg:hover:text-blue-500 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  to={`/cat/${cateogry}`}
                  tabIndex={3}
                >
                  <i className="lg:text-slate-200 text-slate-400 fab fa-twitter text-lg leading-lg "></i>
                  <span className="ml-2">{cateogry}</span>
                </Link>
              </li>
            ))}
            <li className="flex items-center">
              {curretUser ? (
                <Button
                  classes="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                  type="button"
                  text="Logout"
                  onClick={logout}
                  tabIndex={4}
                />
              ) : (
                <Link
                  className="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                  to="/auth"
                  style={{ transition: "all .15s ease" }}
                  tabIndex={4}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
