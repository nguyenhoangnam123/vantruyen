import React from 'react';
import './InputTag.scss';
import {Chips} from 'primereact/chips';
import classNames from 'classnames';

export interface InputTagProps {
  tags: string[];

  className?: string;

  onChange(tags: string[]): void;
}

function InputTag(props: InputTagProps) {
  const {
    tags,
    onChange,
    className,
  } = props;

  const handleChange = React.useCallback(
    (event) => {
      const {value} = event;
      if (typeof onChange === 'function') {
        onChange(value);
      }
    },
    [onChange],
  );

  return (
    <Chips value={tags}
           className={classNames('input-tag', className)}
           onChange={handleChange}/>
  );
}

export default InputTag;
