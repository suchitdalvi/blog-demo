import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./InputEditor.css";

export interface InputEditorProps {
  label?: string;
  id?: string;
  value?: string;
  error?: string | null;
  onChange?: (e: string) => void;
}

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "header",
  "blockquote",
  "code-block",
  "indent",
  "list",
  "direction",
  "align",
  "link",
  "image",
  "video",
  "formula",
];

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

export default function InputEditor({
  label,
  id,
  value,
  error,
  onChange,
}: InputEditorProps): JSX.Element {
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
      <div className="bg-white">
        <ReactQuill
          id={id}
          theme="snow"
          value={value}
          modules={modules}
          onChange={(value: string) => onChange && onChange(value)}
          formats={formats}
        />
      </div>

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </>
  );
}
