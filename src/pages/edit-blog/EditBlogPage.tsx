import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { POSTS_END_POINT } from "../../shared/constants/app.constants";
import { useAppDispatch } from "../../redux/hook";
import { Api } from "../../shared/models/api.interface";
import { useFetch } from "../../shared/hooks/useFetch";
import BlogForm from "../../components/blog-form/BlogForm";
import { BlogFormContent } from "../../shared/models/blog-form-content.interface";
import { Post } from "../../shared/models/post.interface";

export default function EditBlogPage() {
  const dispatch = useAppDispatch();
  const [apiObject, setApiObject] = useState<Api | null>(null);
  const [post, setPost] = useState<Post>();
  const { data, loading } = useFetch(apiObject);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setApiObject({ url: `${POSTS_END_POINT}/${id}`, method: "GET" });
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      if (apiObject?.method === "GET") {
        setPost(data);
      }else{
        toast.success('Post updated successfully.', {
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
      
    }
  }, [data, apiObject, navigate, dispatch]);

  const handleFormSubmit = (formValues: BlogFormContent): void => {
    setApiObject({
      url: `${POSTS_END_POINT}/${id}`,
      method: "PATCH",
      optionBody: {
        ...formValues,
      },
    });
  };

  return post ? <BlogForm loading={loading} onFormSubmit={handleFormSubmit} post={post} /> : null;
}
