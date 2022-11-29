import React, { ChangeEvent, FocusEvent } from "react";

export interface InputSelectProps {
  options: string[];
  label?: string;
  placeholder?: string;
  id?: string;
  value?: string | string[];
  name?: string;
  error?: string | string[] | null;
  multiple?: boolean;
  onChange?: (e: ChangeEvent) => void;
  onBlur?: (e: FocusEvent) => void;
}

export default function InputSelect({
  label,
  placeholder,
  id,
  options,
  value,
  name,
  error,
  multiple = false,
  onChange,
  onBlur,
}: InputSelectProps): JSX.Element {
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

      <select
        name={name}
        id={id}
        className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${
          error ? "border border-red-400" : ""
        }`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        multiple={multiple}
        style={{ transition: "all .15s ease" }}
      >
        <option>Please select</option>
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </>
  );
}
