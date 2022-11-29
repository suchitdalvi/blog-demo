import React, { useEffect, useState } from "react";

import { COMMENTS_END_POINT } from "../../../shared/constants/app.constants";
import { useFetch } from "../../../shared/hooks/useFetch";
import { Api } from "../../../shared/models/api.interface";
import { PostComment } from "../../../shared/models/post-comment.interface";

import Button from "../../../ui/button/Button";
import InputText from "../../../ui/input-text/InputText";

export interface CommentFormProps {
  postId: number;
  currentUserId: number;
  onCommentAdded: (comment: PostComment) => void;
}

export default function CommentForm({
  postId,
  currentUserId,
  onCommentAdded,
}: CommentFormProps) {
  const [userComment, setUserComment] = useState<string>('');
  const [apiObject, setApiObject] = useState<Api | null>(null);
  const { data, loading } = useFetch(apiObject);

  useEffect(() => {
    if (data && apiObject?.method === "POST") {
      onCommentAdded(data);
      setApiObject(null);
      setUserComment('');
    }
  }, [data, apiObject, onCommentAdded]);

  const handleSubmitComment = (): void => {
    setApiObject({
      url: COMMENTS_END_POINT,
      method: "POST",
      optionBody: {
        postId,
        userId: currentUserId,
        comment: userComment,
        createdDate: new Date().getTime(),
      },
    });
  };
  return (
    <div className="flex mt-4 border-t-2 py-4">
      <div className="w-10/12 pr-4">
        <InputText
          type="text"
          placeholder="Enter your comment"
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
        />
      </div>
      <div className="w-2/12">
        <Button type="button" text="submit" onClick={handleSubmitComment} loading={loading}/>
      </div>
    </div>
  );
}
