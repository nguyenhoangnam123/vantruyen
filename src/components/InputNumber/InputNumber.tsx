import AntInputNumber, {InputNumberProps as AntInputNumberProps} from 'antd/lib/input-number';
import React, {ReactText} from 'react';
import './InputNumber.scss';
import classNames from 'classnames';

interface InputNumberProps {
  value?: number;

  defaultValue?: number;

  onChange?: (event) => void;

  allowNegative?: boolean;

  onlyInteger?: boolean;

  className?: string;

  disabled?: boolean;

  min?: number;

  max?: number;

  step?: number;
}

function formatter(x: ReactText) {
  if (x === '-') {
    return x;
  }
  if (typeof x === 'string') {
    x = parser(x);
  }
  if (typeof x === 'number') {
    return x.toLocaleString();
  }
  return '';
}

function parser(x: string) {
  const result: number = parseFloat(x.split(',').join(''));
  if (Number.isNaN(result)) {
    if (x === '-') {
      return '-';
    }
    return '';
  }
  return result;
}

const InputNumber = React.forwardRef((props: InputNumberProps & AntInputNumberProps, ref: React.Ref<any>) => {
  const {
    defaultValue,
    step,
    value,
    className,
    disabled,
    min,
    max,
    onChange,
  } = props;

  const isControlled: boolean = (!props.hasOwnProperty('defaultValue')) && props.hasOwnProperty('value');

  return React.useMemo(
    () => {
      const commonProps = {
        className: classNames('form-control form-control-sm input-number', className),
        disabled,
        max,
        min,
        step,
        formatter,
        parser,
        onChange,
      };

      if (isControlled) {
        return (
          <AntInputNumber
            ref={ref}
            {...commonProps}
            value={value}
          />
        );
      }
      return (
        <AntInputNumber
          ref={ref}
          {...commonProps}
          defaultValue={defaultValue}
        />
      );
    },
    [isControlled, className, defaultValue, disabled, max, min, ref, step, value, onChange],
  );
});

InputNumber.defaultProps = {
  allowNegative: true,
  onlyInteger: false,
  step: 1,
};

export default InputNumber;
