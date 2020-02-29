import classNames from 'classnames';
import Input from 'antd/lib/input';
import 'components/AdvancedStringFilter/AdvancedStringFilter.scss';
import {GuidFilter, IdFilter, NumberFilter, StringFilter} from 'core/filters';
import React, {ChangeEvent, ComponentProps, RefObject} from 'react';

export interface AdvancedStringFilterProps extends ComponentProps<any> {
  filter: StringFilter | NumberFilter | IdFilter | GuidFilter;

  filterType?: keyof StringFilter | keyof NumberFilter | keyof IdFilter | keyof GuidFilter | string;

  onChange(filter: StringFilter | NumberFilter | IdFilter | GuidFilter);
}

function AdvancedStringFilter(props: AdvancedStringFilterProps) {
  const {filter, filterType, onChange, className} = props;

  const ref: RefObject<Input> = React.useRef<Input>(null);

  const {
    [filterType]: value,
  } = filter as any;

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      filter[filterType] = event.target.value;
      if (event.target.value === '' && typeof onChange === 'function') {
        onChange(filter);
      }
    },
    [filter, filterType, onChange],
  );

  React.useEffect(
    () => {
      if (typeof filter[filterType] === 'undefined') {
        ref.current.setState({
          value: '',
        });
      }
    },
    [filter, filterType],
  );

  const handlePressEnter = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && typeof onChange === 'function') {
        onChange(filter);
      }
    },
    [filter, onChange],
  );

  return (
    <Input type="text"
           ref={ref}
           className={classNames(className)}
           defaultValue={value}
           onKeyPress={handlePressEnter}
           onChange={handleChange}
           size="small"
    />
  );
}

export default AdvancedStringFilter;
