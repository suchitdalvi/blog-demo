import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import RequireAuth from "./components/require-auth/RequireAuth";
import HomePage from "./pages/home/HomePage";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { loadUsers, setCurrentUser } from "./redux/slice/users.slice";
import { USERS_END_POINT } from "./shared/constants/app.constants";
import { useFetch } from "./shared/hooks/useFetch";
import { Api } from "./shared/models/api.interface";
import authService from "./shared/services/auth.service";
import Loader from "./ui/loader/Loader";

const Auth = React.lazy(() => import("./pages/auth/AuthPage"));
const Login = React.lazy(() => import("./pages/auth/login/LoginPage"));
const Sigup = React.lazy(() => import("./pages/auth/signup/SignUpPage"));
const MyBlog = React.lazy(() => import("./pages/my-blog/MyBlogPage"));
const NewBlog = React.lazy(() => import("./pages/new-blog/NewBlogPage"));
const EditBlog = React.lazy(() => import("./pages/edit-blog/EditBlogPage"));
const BlogDetails = React.lazy(
  () => import("./pages/blog-details/BlogDetailsPage")
);
const EditProfile = React.lazy(
  () => import("./pages/edit-profile/EditProfilePage")
);

function App() {
  const { currentUser } = useAppSelector((state) => state.users);
  const user = authService.getLoggedInUser();
  const dispatch = useAppDispatch();
  const [apiObject, setApiObject] = useState<Api | null>(null);
  const { data } = useFetch(apiObject);

  useEffect(() => {
    setApiObject({ url: USERS_END_POINT, method: "GET" });
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(loadUsers(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!currentUser && user) {
      dispatch(setCurrentUser(user));
    }
  }, [user, currentUser, dispatch]);

  return (
    <div>
      <Header />
      {currentUser && <Sidebar />}
      <main>
        <div className="relative pt-16">
          <section className="mt-6 w-full h-full">
            <div className="container mx-auto px-4 h-full w-3/5">
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="/cat/:category" element={<HomePage />} />
                <Route
                  path="blog/:id"
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <BlogDetails />
                    </React.Suspense>
                  }
                />
                <Route
                  path="auth"
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <Auth />
                    </React.Suspense>
                  }
                >
                  <Route
                    index
                    element={
                      <React.Suspense fallback={<Loader />}>
                        <Login />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="signup"
                    element={
                      <React.Suspense fallback={<Loader />}>
                        <Sigup />
                      </React.Suspense>
                    }
                  />
                </Route>

                <Route element={<RequireAuth />}>
                  <Route
                    path="myblog"
                    element={
                      <React.Suspense fallback={<Loader />}>
                        <MyBlog />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="newblog"
                    element={
                      <React.Suspense fallback={<Loader />}>
                        <NewBlog />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="editblog/:id"
                    element={
                      <React.Suspense fallback={<Loader />}>
                        <EditBlog />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="editprofile"
                    element={
                      <React.Suspense fallback={<Loader />}>
                        <EditProfile />
                      </React.Suspense>
                    }
                  />
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </section>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
