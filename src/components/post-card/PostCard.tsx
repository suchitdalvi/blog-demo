import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { POSTS_END_POINT } from "../../shared/constants/app.constants";
import { useFetch } from "../../shared/hooks/useFetch";
import { Api } from "../../shared/models/api.interface";

import { Post } from "../../shared/models/post.interface";
import { User } from "../../shared/models/user.interface";
import { getHtmlStripedString } from "../../shared/utils/get-html-striped/get-html-striped";
import Button from "../../ui/button/Button";
import Image from "../../ui/image/Image";
import Tag from "../../ui/tag/Tag";
import PostDate from "../post-date/PostDate";
import UserInfo from "../user-info/UserInfo";

export interface PostCardProps {
  post: Post;
  currentUserId: number;
  postCreator?: User;
  onFormDelete?: (isDeleted: boolean) => void;
}

export default function PostCard({
  post,
  currentUserId,
  postCreator,
  onFormDelete,
}: PostCardProps): JSX.Element {
  const text = getHtmlStripedString(post.content);
  const [apiObject, setApiObject] = useState<Api | null>(null);
  const { data } = useFetch(apiObject);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && apiObject && apiObject.method === "DELETE" && onFormDelete) {
      toast.success("Post deleted successfully.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      onFormDelete(true);
      setApiObject(null);
    }
  }, [data, apiObject, onFormDelete]);

  const handleFormDelete = (id: number) => {
    if (window.confirm("Are you sure, want to delete this post?")) {
      setApiObject({ url: `${POSTS_END_POINT}/${id}`, method: "DELETE" });
    }
  };

  const navigateToDetails = (id: number) => {
    navigate("/blog/" + id);
  };

  return (
    <div className="py-4 border-b-2">
      <div className="flex justify-between">
        <div className="flex items-center">
          <UserInfo
            name={`${postCreator?.firstName} ${postCreator?.lastName}`}
            profilePhoto={postCreator?.profilePhoto}
          />{" "}
          <PostDate postDate={post.createdDate} />
        </div>
        {currentUserId === post.userId && (
          <div>
            <Link to={`/editblog/${post.id}`} className="btn">
              Edit
            </Link>
            <Button
              fullWidth={false}
              text="Delete"
              onClick={() => handleFormDelete(post.id)}
            />
          </div>
        )}
      </div>

      <div
        className="flex justify-between cursor-pointer	"
        onClick={() => navigateToDetails(post.id)}
        tabIndex={12}
      >
        <div className="w-4/5">
          <h2 className="my-4 text-2xl font-semibold">{post.title}</h2>
          <p>{text.length > 300 ? text.slice(0, 300) + ".." : text}</p>
        </div>
        <div className="px-4 w-64">
          <Image
            src={post.featuredImage}
            alt={post.title}
            classes="shadow rounded w-full h-auto align-middle border-none"
          />
        </div>
      </div>

      <div className="mt-4">
        <Tag text={post.category} />
      </div>
    </div>
  );
}
