import React from 'react'

import { timeAgo } from '../../shared/utils/date-utils/date-utils';

export interface PostDateProps {
    postDate: number;
  }

export default function PostDate({
    postDate
  }: PostDateProps) {
  return (
    <span className="ml-2 text-sm text-gray-500">Posted On: {timeAgo(postDate)}</span>
  )
}
