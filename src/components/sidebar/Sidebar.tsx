import React from "react";
import { Link, NavLink } from "react-router-dom";

import Profile from "../../assests/profile.jpeg";
import Image from "../../ui/image/Image";

const newBlogSvg = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-label="Write"
  >
    <path
      d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
      fill="currentColor"
    ></path>
    <path
      d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
      stroke="currentColor"
    ></path>
  </svg>
);
const myBlogSvg = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-label="Stories"
  >
    <path
      d="M4.75 21.5h14.5c.14 0 .25-.11.25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .14.11.25.25.25z"
      stroke="currentColor"
    ></path>
    <path
      d="M8 8.5h8M8 15.5h5M8 12h8"
      stroke="currentColor"
      strokeLinecap="round"
    ></path>
  </svg>
);

export default function Sidebar(): JSX.Element {
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-50 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-bloxck whitespace-nowrap text-sm uppercase font-bold p-4 px-0 text-center"
            to="/"
            tabIndex={1}
          >
            Medium
          </Link>
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded "
            }
          >
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <NavLink
                  className={(navData) => (`text-blueGray-700 hover:text-pink-600 text-xs uppercase py-3 font-bold block flex items-center ${navData.isActive ? 'text-pink-600' : ''}`)}
                  to="/myblog"
                  tabIndex={2}
                >
                  {myBlogSvg} <span className="ml-2">My Blogs</span>
                </NavLink>
              </li>

              <li className="items-center">
                <NavLink
                  className={(navData) => (`text-blueGray-700 hover:text-pink-600 text-xs uppercase py-3 font-bold block flex items-center ${navData.isActive ? 'text-pink-600' : ''}`)}
                  to="/newblog"
                  tabIndex={2}
                >
                  {newBlogSvg} <span className="ml-2">New Blog</span>
                </NavLink>
              </li>

              <li className="items-center">
                <NavLink
                  className={(navData) => (`text-blueGray-700 hover:text-pink-600 text-xs uppercase py-3 font-bold block flex items-center ${navData.isActive ? 'text-pink-600' : ''}`)}
                  to="/editprofile"
                  tabIndex={2}
                >
                  <Image
                    src={Profile}
                    alt="profile"
                    classes="shadow rounded-full w-6 align-middle border-none"
                  />{" "}
                  <span className="ml-2">Profile</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
