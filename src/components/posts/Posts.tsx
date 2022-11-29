import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Post } from "../../shared/models/post.interface";
import { User } from "../../shared/models/user.interface";
import { getUserById } from "../../shared/utils/get-user-by-id/get-user-by-id";
import Loader from "../../ui/loader/Loader";
import PostCard from "../post-card/PostCard";

export interface PostsProps {
  posts: Post[];
  users: User[];
  currentUserId: number;
  onFormDelete?: (isDeleted: boolean) => void;
}

const fetchSize = 3;

export default function Posts({ posts, users, currentUserId, onFormDelete }: PostsProps) {
  const [loadedPosts, setLoadedPosts] = useState<Post[]>([]);

  useEffect(() => {
    setLoadedPosts(posts.slice(0, fetchSize));
  }, [posts]);

  const fetchMoreData = () => {
    // a fake async api call like which sends
    setTimeout(() => {
      setLoadedPosts((prevPosts) => prevPosts.concat(posts.slice(loadedPosts.length, loadedPosts.length + fetchSize)))
    }, 500);
  };

  return posts.length === 0 ? (
    <h3 className="text-center text-xl">No Blogs Found</h3>
  ) : (
    <InfiniteScroll
      dataLength={loadedPosts.length}
      next={fetchMoreData}
      hasMore={loadedPosts.length < posts.length}
      loader={<Loader />}
    >
      {loadedPosts.map((post: Post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={currentUserId}
          postCreator={getUserById(users, post.userId)}
          onFormDelete={onFormDelete}
        />
      ))}
    </InfiniteScroll>
  );
}
