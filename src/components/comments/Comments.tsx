import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { COMMENTS_END_POINT } from "../../shared/constants/app.constants";
import { useFetch } from "../../shared/hooks/useFetch";
import { Api } from "../../shared/models/api.interface";
import { PostComment } from "../../shared/models/post-comment.interface";
import { User } from "../../shared/models/user.interface";
import { getUserById } from "../../shared/utils/get-user-by-id/get-user-by-id";
import Loader from "../../ui/loader/Loader";
import CommentForm from "./comment-form/CommentForm";
import Comment from "./comment/Comment";

export interface CommentsProps {
  postId: number;
  currentUserId: number;
  users: User[];
}

export default function Comments({
  postId,
  currentUserId,
  users,
}: CommentsProps): JSX.Element {
  const [apiObject, setApiObject] = useState<Api | null>(null);
  const [postComments, setPostComments] = useState<PostComment[]>([]);
  const { data, loading } = useFetch(apiObject);

  useEffect(() => {
    if (postId) {
      setApiObject({
        url: `${COMMENTS_END_POINT}?postId=${postId}&_sort=createdDate&_order=desc`,
        method: "GET",
      });
    }
  }, [postId]);

  useEffect(() => {
    if (data) {
      if (apiObject?.method === "GET") {
        setPostComments(data);
      } if (apiObject?.method === "DELETE") {
        setPostComments((prevComments) => {
          return [...prevComments].filter(
            (comment) => comment.userId !== currentUserId
          );
        });
      }
    }
  }, [data, apiObject, currentUserId]);


  const handleCommentAdded = (comment: PostComment) => {
    setPostComments([comment, ...postComments]);
  }

  const handleCommentDelete = (commentId: number) => {
    setPostComments((prevComments)=> prevComments.filter((comt) => comt.id !== commentId));
  }
  

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div>
        {currentUserId !== 0 ? <CommentForm postId={postId} currentUserId={currentUserId} onCommentAdded={handleCommentAdded}/> : <h2 className="text-center font-bold"><Link to="/auth">Plase Login to comment</Link></h2>}
      </div>
      {postComments.length === 0 ? (
        <div className="text-center text-xl">No comment found</div>
      ) : (
        postComments.map((comnt) => (
          <Comment
            key={`comment_${comnt.id}`}
            comment={comnt}
            currentUserId={currentUserId}
            commentCreator={getUserById(users, comnt.userId)}
            onCommentDeleted={handleCommentDelete}
          />
        ))
      )}
      
    </>
  );
}
