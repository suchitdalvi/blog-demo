import React from "react";

export interface TagProps {
    text: string;
  }

export default function Tag({
    text,
  }: TagProps): JSX.Element {
  return (
    <span
      className='bg-slate-200 text-black text-sm text-center px-3 py-2 rounded mr-1'
    >
      {text}
    </span>
  );
}
