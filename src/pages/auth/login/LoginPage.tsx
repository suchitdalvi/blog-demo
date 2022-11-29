import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../../ui/button/Button";
import InputText from "../../../ui/input-text/InputText";
import { useAppDispatch } from "../../../redux/hook";
import { USERS_END_POINT } from "../../../shared/constants/app.constants";
import { setCurrentUser } from "../../../redux/slice/users.slice";
import { Api } from "../../../shared/models/api.interface";
import { useFetch } from "../../../shared/hooks/useFetch";
import authService from "../../../shared/services/auth.service";
import { toast } from "react-toastify";

export default function LoginPage(): JSX.Element {
  const [apiObject, setApiObject] = useState<Api | null>(null);
  const { data, loading } = useFetch(apiObject);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navigateToBlog = useCallback((): void => {
    navigate("/myblog");
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setApiObject({
        url: `${USERS_END_POINT}?email=${values.email}&password=${values.password}`,
        method: "GET",
      });
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Please enter a email"),
      password: Yup.string().required("Please enter a password"),
    }),
  });

  useEffect(() => {
    if (data) {
      if(Array.isArray(data) && [...data].length > 0) {
        dispatch(setCurrentUser(data[0]));
        authService.setLoggedInUser(data[0]);
        navigateToBlog();
      } else{
        toast.error("Invalid email or password.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      
    }
  }, [data, dispatch, navigateToBlog]);

  return (
    <>
      <div className="text-gray-800 text-center mb-3 font-bold">
        <small>Sign in with credentials</small>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative w-full mb-3">
          <InputText
            type="email"
            placeholder="Email"
            id="emailInput"
            label="Email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>

        <div className="relative w-full mb-3">
          <InputText
            type="password"
            placeholder="Password"
            id="passwordInput"
            label="Password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>

        <div className="mt-6">
          <Button text="Sign In" type="submit" loading={loading} />
        </div>
      </form>
      <div className="text-gray-600 text-center mt-3 font-bold">
        <Link to="/auth/signup">
          <small>Create new account</small>
        </Link>
      </div>
    </>
  );
}
