"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// import { Textarea } from "@/components/ui/textarea";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Textarea } from "@/components/ui/textarea";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// export function QuillEditor({ initialValue, onChange, name = "" }) {
//   const [editorContent, setEditorContent] = useState(initialValue);

//   useEffect(() => {
//     if (onChange) {
//       onChange(editorContent);
//     }
//   }, [editorContent]);

//   const modules = {
//     toolbar: [
//       [{ header: "1" }, { header: "2" }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["bold", "italic", "underline"],
//       ["link"],
//       ["blockquote"],
//       ["image"],
//       ["clean"],
//     ],
//   };

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "link",
//     "image",
//   ];

//   return (
//     <div className="quill-editor">
//       <ReactQuill
//         theme="snow"
//         value={editorContent}
//         onChange={setEditorContent}
//         modules={modules}
//         formats={formats}
//         className="min-h-[200px] w-full custom-quill rounded-lg"
//       />
//     </div>
//   );
// }

export function QuillEditor({ initialValue, onChange, name = "" }) {
  const [editorContent, setEditorContent] = useState(initialValue);

  useEffect(() => {
    if (onChange) {
      onChange(editorContent);
    }
  }, [editorContent]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link"],
      ["blockquote"],
      ["image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="quill-editor">
      <ReactQuill
        theme="snow"
        value={editorContent}
        onChange={setEditorContent}
        modules={modules}
        formats={formats}
        className="min-h-[200px] w-full custom-quill rounded-lg"
      />
    </div>
  );
}

export function QuillContentRenderer({ content }) {
  return (
    <div className="quill-content">
      <Textarea
        value={content}
        readOnly={true}
        theme="bubble"
        // modules={{ toolbar: false }}
      />
    </div>
  );
}
