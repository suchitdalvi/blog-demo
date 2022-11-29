import React, { ChangeEvent, FocusEvent } from "react";

export interface InputTextProps {
  type: string;
  label?: string;
  placeholder?: string;
  id?: string;
  value?: string;
  name?: string;
  classes?: string;
  error?: string | null;
  tabIndex?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement, Element>) => void;
}

export default function InputText({
  label,
  placeholder,
  id,
  type,
  value,
  name,
  error,
  classes,
  tabIndex,
  onChange,
  onBlur,
}: InputTextProps): JSX.Element {
  return (
    <>
      {label && (
        <label
          className="block uppercase text-gray-700 text-xs font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        name={name}
        type={type}
        className={`${classes ? classes : 'border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'} ${
          error ? "border border-red-400" : ""
        }`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        style={{ transition: "all .15s ease" }}
        tabIndex={tabIndex}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </>
  );
}
