import Tag from 'antd/lib/tag';
import React, {useState} from 'react';
import 'views/ProductView/ProductDetail/PriceAndVariations/InputTag/InputTag.scss';

interface IInputTagProps {
  defaultValue?: string[];

  value?: string[];

  onChange?: (value: string[]) => void;

  onRemove?: (value: string, index?: number) => void;

  onRemoveVariation?: () => void;

  onClear?: () => void;

  disabled?: boolean;

  max?: number;

  onClick?(): void;
}

function InputTag(props: IInputTagProps) {
  if (props.value && props.defaultValue) {
    throw new Error('Component must be controlled or uncontrolled, but not both');
  }

  const {max} = props;

  const [value, setValue] = useState<string[]>(props.defaultValue || []);
  const [input, setInput] = useState<string>('');

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
    [value, props],
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
    [props, value],
  );

  const renderOutput = React.useCallback(
    (value: string[]) => {
      return (
        <div className="input-tag">
          <div className="flex-grow-1 d-flex">
            <button className="btn btn-sm btn-link" onClick={props.onClick}
                    disabled={props.disabled || (typeof max !== 'undefined' && value?.length >= max)}>
              <i className="fa fa-plus"/>
            </button>
            <div className="list-tag flex-grow-1">
              {value.map((tag: string, index: number) => (
                <Tag className="tag"
                     key={`${tag}-${index}`}
                     closable={!props.disabled}
                     onClick={handleRemove(index)}>
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
          <div className="delete-all">
          <span onClick={props.onRemoveVariation} className="text-danger delete ml-3">
            <i className="fa fa-trash"/>
          </span>
          </div>
        </div>
      );
    },
    [handleChange, handlePressEnter, handleRemove, input, max, props.disabled, props.onRemoveVariation],
  );

  if (props.value) {
    return renderOutput(props.value);
  }

  return renderOutput(value);
}

export default InputTag;