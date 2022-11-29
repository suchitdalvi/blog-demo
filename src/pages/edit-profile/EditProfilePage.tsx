import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { USERS_END_POINT } from "../../shared/constants/app.constants";
import { useFetch } from "../../shared/hooks/useFetch";
import { Api } from "../../shared/models/api.interface";
import { toast } from "react-toastify";
import InputFile from "../../ui/input-file/InputFile";
import InputText from "../../ui/input-text/InputText";
import Button from "../../ui/button/Button";
import { setCurrentUser } from "../../redux/slice/users.slice";
import Image from "../../ui/image/Image";

export default function EditProfilePage() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.users);
  const [apiObject, setApiObject] = useState<Api | null>(null);
  const { data, loading } = useFetch(apiObject);

  const formik = useFormik({
    initialValues: {
      profilePhoto: currentUser?.profilePhoto ?? "",
      firstName: currentUser?.firstName ?? "",
      lastName: currentUser?.lastName ?? "",
      password: currentUser?.password ?? "",
    },
    onSubmit: (values) => {
      setApiObject({
        url: `${USERS_END_POINT}/${currentUser?.id}`,
        method: "PATCH",
        optionBody: values,
      });
    },
    validationSchema: Yup.object({
      profilePhoto: Yup.string().required().required("Please select photo"),
      firstName: Yup.string().required().required("Please enter a first name"),
      lastName: Yup.string().required("Please enter a last name"),
      password: Yup.string().required("Please enter a password"),
    }),
  });

  useEffect(() => {
    if (data) {
      dispatch(setCurrentUser(data));
      toast.success("Profile Updated Successfully", {
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
  }, [data, dispatch]);

  return (
    <div className="flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 p-4">
      <div className="text-gray-800 text-center mb-3 font-bold">
        <small>Update Profile</small>
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
              classes="ml-2 shadow rounded-full  align-middle border-none w-28 h-28"
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

        <div className="mt-6">
          <Button text="Update" type="submit" loading={loading} />
        </div>
      </form>
    </div>
  );
}
