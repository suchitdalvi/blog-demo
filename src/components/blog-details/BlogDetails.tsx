import React from "react";
import { useAppSelector } from "../../redux/hook";

import { Post } from "../../shared/models/post.interface";
import { User } from "../../shared/models/user.interface";
import Image from "../../ui/image/Image";
import Tag from "../../ui/tag/Tag";
import Comments from "../comments/Comments";
import Likes from "../likes/Likes";
import PostDate from "../post-date/PostDate";
import UserInfo from "../user-info/UserInfo";

export interface BlogDeailsProps {
  post: Post;
  postCreator?: User;
}

export default function BlogDeails({
  post,
  postCreator,
}: BlogDeailsProps): JSX.Element {
  const { currentUser, users } = useAppSelector((state) => state.users);
  return (
    <div className="py-4">
      <div className="py-4 border-b-2">
        <div className="flex justify-between">
          <div className="flex items-center">
            <UserInfo
              name={`${postCreator?.firstName} ${postCreator?.lastName}`}
              profilePhoto={postCreator?.profilePhoto}
            />{" "}
            <PostDate postDate={post.createdDate} />
          </div>
          <div className="mt-4">
            <Tag text={post.category} />
          </div>
        </div>

        <div className="mt-4 h-96">
          <Image
            src={post.featuredImage}
            alt={post.title}
            classes="shadow rounded h-full border-none w-full"
          />
        </div>

        <h2 className="my-4 text-2xl font-semibold">{post.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      <div className="mt-4">
        <Likes postId={post.id} currentUserId={currentUser?.id ?? 0} />
      </div>
      <div className="mt-4">
        <Comments
          postId={post.id}
          currentUserId={currentUser?.id ?? 0}
          users={users}
        />
      </div>
    </div>
  );
}
