import React from "react";
import Loader from "../loader/Loader";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text: string | JSX.Element;
  loading?: boolean;
  classes?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  onClick?: () => void;
}

export default function Button({
  type = "button",
  text,
  loading = false,
  classes,
  fullWidth = true,
  disabled = false,
  tabIndex,
  onClick,
}: ButtonProps): JSX.Element {
  if(loading) {
    return <Loader />
  }
  return (
    <button
      className={
        classes
          ? classes
          : `btn ${fullWidth ? 'w-full' : '' }`
      }
      type={type}
      style={{ transition: "all .15s ease" }}
      onClick={onClick}
      disabled={disabled}
      tabIndex={tabIndex}
    >
      {text}
    </button>
  );
}
