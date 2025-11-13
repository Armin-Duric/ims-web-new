// src/components/RichEditor.jsx
import React, { forwardRef, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import ImageResize from 'quill-image-resize-module';
import ImageDrop from 'quill-image-drop-module';
import Quill from 'quill';
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ align: [] }],
  ['link', 'image'],
  [{ size: ['small', false, 'large', 'huge'] }],
  ['clean'],
];

const RichEditor = forwardRef(({ value, onChange }, ref) => {
  const modules = {
    toolbar: toolbarOptions,
    imageResize: {},
    imageDrop: true,
  };

  return (
    <ReactQuill
      ref={ref}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      placeholder="Start writing…"
      style={{ height: '100%', minHeight: '350px' }}
    />
  );
});

export default RichEditor;