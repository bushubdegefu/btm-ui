"use client";

/* eslint-disable unicorn/no-null */
/* eslint-disable quotes */
// import React, { useCallback, useRef, useState } from "react";

// import RichTextEditor, {
//   BaseKit,
//   Blockquote,
//   Bold,
//   BulletList,
//   Clear,
//   Code,
//   CodeBlock,
//   Color,
//   ColumnActionButton,
//   Emoji,
//   ExportPdf,
//   ExportWord,
//   FontFamily,
//   FontSize,
//   FormatPainter,
//   Heading,
//   Highlight,
//   History,
//   HorizontalRule,
//   Iframe,
//   Image,
//   ImportWord,
//   Indent,
//   Italic,
//   Katex,
//   LineHeight,
//   Link,
//   MoreMark,
//   OrderedList,
//   SearchAndReplace,
//   SlashCommand,
//   Strike,
//   Table,
//   TaskList,
//   TextAlign,
//   Underline,
//   Video,
//   locale,
//   TableOfContents,
//   Excalidraw,
//   TextDirection,
//   Mention,
//   Attachment,
//   ImageGif,
//   Mermaid,
//   Twitter,
// } from "reactjs-tiptap-editor";

import "katex/dist/katex.min.css";

// import "reactjs-tiptap-editor/style.css";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

// function convertBase64ToBlob(base64) {
//   const arr = base64.split(",");
//   // const mime = arr[0].match(/:(.*?);/)![1]
//   const match = arr[0].match(/:(.*?);/);
//   const mime = match ? match[1] : null;
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new Blob([u8arr], { type: mime });
// }

// const extensions = [
//   BaseKit.configure({
//     multiColumn: true,
//     placeholder: {
//       showOnlyCurrent: true,
//     },
//     characterCount: {
//       limit: 50_000,
//     },
//   }),
//   History,
//   SearchAndReplace,
//   TextDirection,
//   TableOfContents,
//   FormatPainter.configure({ spacer: true }),
//   Clear,
//   FontFamily,
//   Heading.configure({ spacer: true }),
//   FontSize,
//   Bold,
//   Italic,
//   Underline,
//   Strike,
//   MoreMark,
//   Katex,
//   Emoji,
//   Color.configure({ spacer: true }),
//   Highlight,
//   BulletList,
//   OrderedList,
//   TextAlign.configure({ types: ["heading", "paragraph"], spacer: true }),
//   Indent,
//   LineHeight,
//   TaskList.configure({
//     spacer: true,
//     taskItem: {
//       nested: true,
//     },
//   }),
//   Link,
//   Image.configure({
//     upload: (files) => {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve(URL.createObjectURL(files));
//         }, 500);
//       });
//     },
//   }),
//   Video.configure({
//     upload: (files) => {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve(URL.createObjectURL(files));
//         }, 500);
//       });
//     },
//   }),
//   ImageGif.configure({
//     GIPHY_API_KEY: process.env.NEXT_PUBLIC_GIPHY_API_KEY,
//   }),
//   Blockquote.configure({ spacer: true }),
//   SlashCommand,
//   HorizontalRule,
//   Code.configure({
//     toolbar: false,
//   }),
//   CodeBlock.configure({ defaultTheme: "dracula" }),
//   ColumnActionButton,
//   Table,
//   Iframe,
//   ExportPdf.configure({ spacer: true }),
//   ImportWord.configure({
//     upload: (files) => {
//       const f = files.map((file) => ({
//         src: URL.createObjectURL(file),
//         alt: file.name,
//       }));
//       return Promise.resolve(f);
//     },
//   }),
//   ExportWord,
//   Excalidraw,
//   Mention,
//   Attachment.configure({
//     upload: (file) => {
//       // fake upload return base 64
//       const reader = new FileReader();
//       reader.readAsDataURL(file);

//       return new Promise((resolve) => {
//         setTimeout(() => {
//           const blob = convertBase64ToBlob(reader.result);
//           resolve(URL.createObjectURL(blob));
//         }, 300);
//       });
//     },
//   }),
//   Twitter,
// ];

const DEFAULT = `<h1 style="text-align: center">Rich Text Editor</h1><p>A modern WYSIWYG rich text editor based on <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://github.com/scrumpy/tiptap">tiptap</a> and <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://ui.shadcn.com/">shadcn ui</a> for Reactjs</p><p></p><p style="text-align: center"></p><div style="text-align: center;" class="image"><img height="auto" src="https://picsum.photos/1920/1080.webp?t=1" align="center" width="500"></div><p></p><div data-type="horizontalRule"><hr></div><h2>Demo</h2><p>👉<a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://reactjs-tiptap-editor.vercel.app/">Demo</a></p><h2>Features</h2><ul><li><p>Use <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://ui.shadcn.com/">shadcn ui</a> components</p></li><li><p>Markdown support</p></li><li><p>TypeScript support</p></li><li><p>I18n support (vi, en, zh, pt)</p></li><li><p>React support</p></li><li><p>Slash Commands</p></li><li><p>Multi Column</p></li><li><p>TailwindCss</p></li><li><p>Support emoji</p></li><li><p>Support iframe</p></li><li><p>Support mermaid</p></li></ul><h2>Installation</h2><pre><code class="language-bash">pnpm add reactjs-tiptap-editor</code></pre><p></p>`;

// function debounce(func, wait) {
//   let timeout;
//   return function (...args) {
//     clearTimeout(timeout);
//     // @ts-ignore
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// }

function TipTapEditor({ inital_value, onChange, name }) {
  const [content, setContent] = useState(inital_value);
  // const refEditor = useRef(null);

  // const [disable, setDisable] = useState(false);

  // const onValueChange = useCallback(
  //   debounce((value) => {
  //     setContent(value);
  //     if (onChange) {
  //       onChange(value);
  //     }
  //   }, 300),
  //   []
  // );
  //

  useEffect(() => {
    setContent(inital_value);
  });
  const handleChange = (event) => {
    setContent(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    // <RichTextEditor
    //   ref={refEditor}
    //   // output="html"
    //   content={DEFAULT}
    //   // onChangeContent={onValueChange}
    //   // extensions={extensions}
    //   dark={"light"}
    //   disabled={disable}
    // />
    <Textarea
      name={name ? name : null}
      value={content}
      onChange={handleChange}
    />
  );
}

export default TipTapEditor;
