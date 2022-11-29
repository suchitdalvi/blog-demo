import React from "react";
import InputText from "../../ui/input-text/InputText";

export interface SearchBarProps {
  onSearch: (str: string) => void;
}
const sarchIcon = (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="rgba(8, 8, 8, 1)">
    <path d="M20.07 18.93l-4.16-4.15a6 6 0 1 0-.88.88l4.15 4.16a.62.62 0 1 0 .89-.89zM6.5 11a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0z"></path>
  </svg>
);

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative flex w-full flex-wrap items-stretch">
      <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
        {sarchIcon}
      </span>
      <InputText
        type="text"
        data-testid="search-bar"
        placeholder="Search here..."
        onChange={(e) => onSearch(e.target.value)}
        tabIndex={5}
        classes="border-2 px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
      />
    </div>
  );
}
