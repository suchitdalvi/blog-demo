import React, { useCallback, useEffect, useState } from "react";

import Posts from "../../components/posts/Posts";
import { useAppSelector } from "../../redux/hook";
import { POSTS_END_POINT } from "../../shared/constants/app.constants";
import { useFetch } from "../../shared/hooks/useFetch";
import { Api } from "../../shared/models/api.interface";
import Loader from "../../ui/loader/Loader";

export default function MyBlogPage(): JSX.Element {
  const [apiObject, setApiObject] = useState<Api | null>(null);
  const { data, loading } = useFetch(apiObject);
  const { currentUser, users } = useAppSelector((state) => state.users);

  const loadBlog = useCallback((): void => {
    setApiObject({ url: `${POSTS_END_POINT}?userId=${currentUser?.id}&_sort=createdDate&_order=desc`, method: "GET" });
  }, [currentUser?.id]);

  useEffect(() => {
    loadBlog();
  }, [loadBlog]);

  const handleFormDelete = (isDeleted: boolean) => {
    if(isDeleted) {
      loadBlog();
    }
  };

  if(loading) {
    return <Loader />;
  }

  return <Posts posts={data ?? []} users={users} onFormDelete={handleFormDelete} currentUserId={currentUser?.id ?? 0}/>;
}
