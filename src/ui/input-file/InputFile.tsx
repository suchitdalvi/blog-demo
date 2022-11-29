import React from "react";

import { getBase64 } from "../../shared/utils/get-base64/get-base64";

export interface InputFileProps {
    label?: string;
    placeholder?: string;
    id?: string;
    name?: string;
    accept?: string;
    error?: string | null;
    onChange?: (base64Str: string) => void;
  }

  
export default function InputFile({
    label,
    placeholder,
    id,
    name,
    accept,
    error,
    onChange,
  }: InputFileProps) {
  const handleFileInputChange = (e: any) => {
    getBase64(e.target.files[0])
      .then((result) => {
        onChange && onChange(result as string);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        type="file"
        className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${
          error ? "border border-red-400" : ""
        }`}
        placeholder={placeholder}
        accept={accept}
        onChange={(e) => handleFileInputChange(e)}
        style={{ transition: "all .15s ease" }}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </>
  );
}
