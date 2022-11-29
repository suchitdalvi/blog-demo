import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Posts from "../../components/posts/Posts";
import SearchBar from "../../components/search-bar/SearchBar";
import { useAppSelector } from "../../redux/hook";
import { POSTS_END_POINT } from "../../shared/constants/app.constants";
import { useFetch } from "../../shared/hooks/useFetch";
import { Api } from "../../shared/models/api.interface";
import { Post } from "../../shared/models/post.interface";
import Loader from "../../ui/loader/Loader";

export default function HomePage(): JSX.Element {
  const [apiObject, setApiObject] = useState<Api | null>(null);
  const [posts, setPost] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchStr, setSearchStr] = useState("");
  
  const { data, loading } = useFetch(apiObject);
  const { users } = useAppSelector((state) => state.users);
  const { category } = useParams();

  const loadBlog = (cat?: string): void => {
    setApiObject({
      url: `${POSTS_END_POINT}?_sort=createdDate&_order=desc${
        cat ? "&category=" + cat : ""
      }`,
      method: "GET",
    });
    setSearchStr('');
  };

  useEffect(() => {
    if (data && apiObject?.method === "GET") {
      setPost(data);
      setFilteredPosts(data);
    }
  }, [data, apiObject]);

  useEffect(() => {
    const getData = setTimeout(() => {
      if (searchStr) {
        const searchLower = searchStr.toLocaleLowerCase();
        const searchedPosts = posts.filter(
          (post) => post.title.toLocaleLowerCase().indexOf(searchLower) > -1
        );
        setFilteredPosts(searchedPosts);
      } else {
        setFilteredPosts(posts);
      }
    }, 500);

    return () => clearTimeout(getData);
  }, [searchStr, posts]);

  const handleSearch = (str: string) => {
    setSearchStr(str);
  };

  useEffect(() => {
    loadBlog(category);
  }, [category]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="my-4">
        <SearchBar onSearch={handleSearch}/>
      </div>
      <Posts posts={filteredPosts} users={users} currentUserId={0}/>
    </>
  );
}
