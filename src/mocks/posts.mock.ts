import { PostComment } from "../shared/models/post-comment.interface";
import { PostLike } from "../shared/models/post-like.interface";
import { Post } from "../shared/models/post.interface";

export const MOCK_POSTS: Post[] = [
  {
    category: "Technology",
    title: "title 1",
    content: "lorem ipsum is test",
    userId: 1,
    createdDate: 1669262390352,
    featuredImage: "someurl",
    id: 1,
  },
  {
    category: "Technology",
    title: "title 2",
    content: "lorem ipsum is test",
    userId: 2,
    createdDate: 1669262390352,
    featuredImage: "someurl",
    id: 2,
  },
  {
    category: "Technology",
    title: "title 3",
    content: "lorem ipsum is test",
    userId: 1,
    createdDate: 1669262390352,
    featuredImage: "someurl",
    id: 3,
  },
  {
    category: "Technology",
    title: "title 2",
    content: "lorem ipsum is test",
    userId: 2,
    createdDate: 1669262390352,
    featuredImage: "someurl",
    id: 4,
  },
  {
    category: "Technology",
    title: "title 1",
    content: "lorem ipsum is test",
    userId: 1,
    createdDate: 1669262390352,
    featuredImage: "someurl",
    id: 5,
  },
  {
    category: "Technology",
    title: "title 2",
    content: "lorem ipsum is test",
    userId: 2,
    createdDate: 1669262390352,
    featuredImage: "someurl",
    id: 6,
  },
];

export const MOCK_COMMENTS: PostComment[] = [
  {
    comment: "test comment 1",
    userId: 1,
    createdDate: 1669262390352,
    id: 1,
    postId: 1
  },
  {
    comment: "test comment 2",
    userId: 1,
    createdDate: 1669262390366,
    id: 2,
    postId: 1
  },
];

export const MOCK_LIKES: PostLike[] = [
  {
    userId: 1,
    id: 1,
    postId: 1
  },
  {
    userId: 1,
    id: 2,
    postId: 2
  },
];