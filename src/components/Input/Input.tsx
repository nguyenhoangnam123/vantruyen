import React from 'react';
import './Input.scss';
import classNames from 'classnames';
import RichTextEditor from 'components/RichTextEditor/RichTextEditor';

export type InputType = 'text' | 'textarea' | 'editor';

export interface InputProps {
  type?: InputType;

  value?: string;

  className?: string;

  defaultValue?: string;

  onChange?(value?: string): void;
}

function Input(props: InputProps) {
  const {
    type,
    value,
    defaultValue,
    onChange,
    className,
  } = props;

  const handleTextChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (typeof onChange === 'function') {
        onChange(event.target.value);
      }
    },
    [onChange],
  );

  if (type === 'text') {
    return (
      <input type="text"
             className={classNames('react3l-input form-control form-control-sm', className)}
             value={value}
             defaultValue={defaultValue}
             onChange={handleTextChange}/>
    );
  }
  if (type === 'textarea') {
    return (
      <textarea
        className={classNames('react3l-input form-control form-control-sm', className)}
        value={value}
        defaultValue={defaultValue}
        onChange={handleTextChange}/>
    );
  }
  return (
    <RichTextEditor value={value}
                    className={className}
                    onChange={onChange}/>
  );
}

Input.defaultProps = {
  type: 'text',
};

export default Input;
