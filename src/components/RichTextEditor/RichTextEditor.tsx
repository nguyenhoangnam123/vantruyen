import React from 'react';
import './RichTextEditor.scss';
import {Editor} from '@tinymce/tinymce-react';

export interface RichTextEditorProps {
  value?: string;

  className?: string;

  editorConfig?: {
    [key: string]: any;
  };

  onChange?(value: string): void;
}

function RichTextEditor(props: RichTextEditorProps) {
  const {
    value,
    onChange,
  } = props;

  const handleChange = React.useCallback(
    (...[content]: any) => {
      if (typeof onChange === 'function') {
        onChange(content);
      }
    },
    [onChange],
  );

  return (
    <Editor
      value={value}
      onEditorChange={handleChange}
    />
  );
}

export default RichTextEditor;
