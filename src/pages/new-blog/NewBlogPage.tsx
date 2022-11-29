import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { POSTS_END_POINT } from "../../shared/constants/app.constants";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Api } from "../../shared/models/api.interface";
import { useFetch } from "../../shared/hooks/useFetch";
import BlogForm from "../../components/blog-form/BlogForm";
import { BlogFormContent } from "../../shared/models/blog-form-content.interface";

export default function NewBlogPage() {
  const dispatch = useAppDispatch();
  const [apiObject, setApiObject] = useState<Api | null>(null);
  const { data, loading } = useFetch(apiObject);
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (data) {
      toast.success('Post published successfully.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        
      navigate("/myblog");
    }
  }, [data, navigate, dispatch]);

  const handleFormSubmit = (formValues: BlogFormContent): void => {
    setApiObject({url: POSTS_END_POINT, method: "POST", optionBody: {...formValues, userId: currentUser?.id, createdDate: new Date().getTime()}});
  }

  return <BlogForm loading={loading} onFormSubmit={handleFormSubmit}/>
}
