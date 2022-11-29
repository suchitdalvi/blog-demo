import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogDeails from "../../components/blog-details/BlogDetails";
import { useAppSelector } from "../../redux/hook";
import { POSTS_END_POINT } from "../../shared/constants/app.constants";
import { useFetch } from "../../shared/hooks/useFetch";
import { Api } from "../../shared/models/api.interface";
import { Post } from "../../shared/models/post.interface";
import { getUserById } from "../../shared/utils/get-user-by-id/get-user-by-id";
import Loader from "../../ui/loader/Loader";

export default function BlogDetailsPage() {
  const { users } = useAppSelector((state) => state.users);
  const [apiObject, setApiObject] = useState<Api | null>(null);
  const [post, setPost] = useState<Post>();
  const { data, loading } = useFetch(apiObject);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setApiObject({ url: `${POSTS_END_POINT}/${id}`, method: "GET" });
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      setPost(data);
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
        {post && <BlogDeails post={post} postCreator={getUserById(users, post.userId)} />}
    </>
  );
}
