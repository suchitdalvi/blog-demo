import { PostComment } from "../../../shared/models/post-comment.interface";
import UserInfo from "../../user-info/UserInfo";
import { User } from "../../../shared/models/user.interface";
import PostDate from "../../post-date/PostDate";
import Button from "../../../ui/button/Button";
import { useState } from "react";
import { Api } from "../../../shared/models/api.interface";
import { useFetch } from "../../../shared/hooks/useFetch";
import { COMMENTS_END_POINT } from "../../../shared/constants/app.constants";
import Loader from "../../../ui/loader/Loader";

export interface CommentProps {
  comment: PostComment;
  currentUserId: number;
  commentCreator?: User;
  onCommentDeleted: (id: number) => void;
}

export default function Comment({
  comment,
  currentUserId,
  commentCreator,
  onCommentDeleted,
}: CommentProps): JSX.Element {
  const [apiObject, setApiObject] = useState<Api | null>(null);
  const { loading } = useFetch(apiObject);

  const handleCommentDelete = (id: number) => {
    if (window.confirm("Are you sure, want to delete this comment?")) {
      setApiObject({ url: `${COMMENTS_END_POINT}/${id}`, method: "DELETE" });
      onCommentDeleted(id);
    }
  };

  if(loading) {
    return <Loader />;
  }

  return (
    <div className="p-4 border-b-2">
      <div className="flex justify-between">
        <div className="flex items-center">
          <UserInfo
            name={`${commentCreator?.firstName} ${commentCreator?.lastName}`}
            profilePhoto={commentCreator?.profilePhoto}
          />{" "}
          <PostDate postDate={comment.createdDate} />
        </div>
        {currentUserId === comment.userId && (
          <div>
            <Button
              fullWidth={false}
              text="Delete"
              onClick={() => handleCommentDelete(comment.id)}
            />
          </div>
        )}
      </div>
      <p className="px-4 mt-2">
        {comment.comment}
      </p>
    </div>
  );
}
