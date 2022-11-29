import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import InputText from "../../../ui/input-text/InputText";
import Button from "../../../ui/button/Button";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { useFetch } from "../../../shared/hooks/useFetch";
import { USERS_END_POINT } from "../../../shared/constants/app.constants";
import { usersAdded } from "../../../redux/slice/users.slice";
import { Api } from "../../../shared/models/api.interface";
import { toast } from "react-toastify";
import InputFile from "../../../ui/input-file/InputFile";
import Image from "../../../ui/image/Image";

export default function SignUpPage() {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const [apiObject, setApiObject] = useState<Api | null>(null);
  const { data, loading } = useFetch(apiObject);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      profilePhoto: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      const existingUser = users.findIndex(
        (user) => user.email === values.email
      );
      if (existingUser > -1) {
        toast.error("Given email already exists.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setApiObject({
          url: USERS_END_POINT,
          method: "POST",
          optionBody: values,
        });
      }
    },
    validationSchema: Yup.object({
      profilePhoto: Yup.string().required("Please select photo"),
      firstName: Yup.string().required("Please enter a first name"),
      lastName: Yup.string().required("Please enter a last name"),
      email: Yup.string().email("Invalid Email").required("Please enter a email"),
      password: Yup.string().required("Please enter a password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "Must container 8 characters, one uppercase, one lowercase, one number, one special character"),
      confirmPassword: Yup.string().required("Please enter a confirm password").oneOf([Yup.ref('password')], "Password does not match"),
    }),
  });

  useEffect(() => {
    if (data) {
      dispatch(usersAdded(data));
      toast.success("Registration done successfully, please sign in now.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/auth");
    }
  }, [data, navigate, dispatch]);

  return (
    <>
      <div className="text-gray-800 text-center mb-3 font-bold">
        <small>Sign up</small>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex">
          <div className="relative w-2/5 mb-3 ml-2">
            <InputFile
              placeholder="Profile Photo"
              id="profilePhotoInput"
              label="Profile Photo"
              name="profilePhoto"
              onChange={(contentStr: string) =>
                formik.setFieldValue("profilePhoto", contentStr)
              }
              accept="image/png, image/jpeg"
              error={
                formik.touched.profilePhoto && formik.errors.profilePhoto
                  ? formik.errors.profilePhoto
                  : null
              }
            />
          </div>
          {formik.values.profilePhoto && (
            <Image
              src={formik.values.profilePhoto}
              alt="featured"
              classes="ml-2 w-28 h-28"
            />
          )}
        </div>
        <div className="relative w-full mb-3">
          <InputText
            type="text"
            placeholder="First Name"
            id="firstNameInput"
            label="First Name"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            error={
              formik.touched.firstName && formik.errors.firstName
                ? formik.errors.firstName
                : null
            }
          />
        </div>
        <div className="relative w-full mb-3">
          <InputText
            type="text"
            placeholder="Last Name"
            id="lastNameInput"
            label="Last Name"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            error={
              formik.touched.lastName && formik.errors.lastName
                ? formik.errors.lastName
                : null
            }
          />
        </div>
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
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
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
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null
            }
          />
        </div>

        <div className="relative w-full mb-3">
          <InputText
            type="password"
            placeholder="Confirm Password"
            id="confirmPasswordInput"
            label="Confirm Password"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : null
            }
          />
        </div>

        <div className="mt-6">
          <Button text="Sign Up" type="submit" loading={loading} />
        </div>
      </form>
      <div className="text-gray-600 text-center mt-3 font-bold">
        <Link to="/auth">
          <small>Sign In</small>
        </Link>
      </div>
    </>
  );
}
