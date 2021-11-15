import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Wysiwyg = ({ editorHeight, setValue, value }) => {
  const editorRef = useRef(null);
  // const [value, setValue] = useState("");
  const log = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      console.log(value);
    }
  };
  function handleChange(content, editor) {
    setValue(content);
  }

  return (
    <>
      <Editor
        apiKey={process.env.REACT_APP_TINY_MCE_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        onEditorChange={handleChange}
        init={{
          height: editorHeight,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
        }}
      />
    </>
  );
};

export default Wysiwyg;
