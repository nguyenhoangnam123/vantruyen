import Input from 'antd/lib/input';
import Tag from 'antd/lib/tag';
import React, { useState } from 'react';
import './InputTag.scss';
import { useTranslation } from 'react-i18next';

interface IInputTagProps {
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  onRemove?: (value: string, index?: number) => void;
  onClear?: () => void;
  disabled?: boolean;
}

function TagInput(props: IInputTagProps) {
  if (props.value && props.defaultValue) {
    throw new Error('Component must be controlled or uncontrolled, but not both');
  }

  const [value, setValue] = useState<string[]>(props.defaultValue || []);
  const [input, setInput] = useState<string>('');
  const [translate] = useTranslation();

  const handleRemove = React.useCallback(
    (index: number) => {
      return () => {
        const removedValue: string = value[index];
        value.splice(index, 1);
        const newValue = [...value];
        if (props.onRemove) {
          props.onRemove(removedValue, index);
        }
        if (props.onChange) {
          props.onChange(newValue);
        }
        setValue(newValue);
      };
    },
    [props.onRemove, props.onChange],
  );


  const handleChange = React.useCallback(
    (event) => {
      setInput(event.target.value);
    },
    [setInput],
  );

  const handlePressEnter = React.useCallback(
    (event) => {
      if (event.target.value === '') {
        return;
      }
      if (event.key === 'Enter') {
        setInput('');
        if (props.value) {
          if (props.onChange) {
            props.onChange([
              ...props.value,
              event.target.value,
            ]);
          }
          return;
        }
        if (!value.includes(event.target.value)) {
          const newValue: string[] = [
            ...value,
            event.target.value,
          ];
          setValue(newValue);
          if (props.onChange) {
            props.onChange(newValue);
          }
        }
      }
    },
    [setInput, props.onChange, setValue],
  );

  const handleDeteleAll = React.useCallback(
    () => {
      setValue([]);
      if (props.onChange) {
        props.onChange([]);
      }
    },
    [setValue],
  );

  function renderOutput(value: string[]) {
    return (
      <div className="input-tag d-flex ">
        <div className="form-tag">
          <div className="list-tag">
            {value.map((tag: string, index: number) => (
              <Tag className="tag" key={`${tag}-${index}`} closable={!props.disabled} onClick={handleRemove(index)}>
                {tag}
              </Tag>
            ))}
          </div>

          <input
            type="text"
            className="input form-control form-control-sm"
            onChange={handleChange}
            value={input} onKeyDown={handlePressEnter}
            disabled={props.disabled}
          />
        </div>
        <div className="delete-all">
          <span onClick={handleDeteleAll} className="text-danger delete ml-3"><i className="fa fa-trash"></i></span>
        </div>
      </div>
    );
  }


  if (props.value) {
    return renderOutput(props.value);
  }

  return renderOutput(value);
}

export default TagInput;
