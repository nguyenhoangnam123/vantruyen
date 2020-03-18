import React from 'react';
import { TreeSelect } from 'antd';
import { ITreeItem } from 'helpers/tree';

export type TreeSelectMode = 'single' | 'multiple';


interface ITreeSelectProps {
  treeData: ITreeItem[];
  mode: TreeSelectMode;
  onlyLeaf?: boolean;
  defaultValue?: any;
  value?: number | number[];
  onChange?: (value: number | number[], node?) => void;
  treeCheckable?: boolean;
  allowClear?: boolean;
  treeDefaultExpandAll?: boolean;
}

const { TreeNode } = TreeSelect;

const TreeSelectDropdown = React.forwardRef(
  (props: ITreeSelectProps, ref: React.Ref<any>) => {

    const { treeCheckable, treeDefaultExpandAll, allowClear, defaultValue, onlyLeaf, onChange, mode, treeData } = props;

    const multiple: boolean = (mode === 'multiple');

    const isControlled: boolean = props.hasOwnProperty('value');



    const renderItemTree = React.useCallback(
      (listData) => {
        return listData.map((item: any) => (
          <TreeNode value={item.id}
            key={item.id}
            title={item.name}
            disabled={onlyLeaf && (!item.children || item.children.length > 0)}
            data-content={item}>
            {item.children && renderItemTree(item.children)}
          </TreeNode>
        ));
      },
      [onlyLeaf],
    );

    const handleControlledChange = React.useCallback(
      (...[newValue, , extra]: [number | number[], any, any]) => {
        if (mode === 'single') {
          if (onChange) {
            onChange(newValue, newValue ? extra.triggerNode.props['data-content'] : undefined);
          }
          return;
        }
        if (treeCheckable) {
          if (onChange) {
            onChange(newValue);
          }
          return;
        }
        if (onChange) {
          if ((newValue as number[]).length === 0) {
            onChange([], []);
            return;
          }
          onChange(newValue, extra.triggerNode.props['data-content']);
        }
      },
      [mode, onChange, treeCheckable],
    );

    const renderTree = React.useCallback(
      (value: number | number[], handleChange) => {
        return (
          <TreeSelect
            ref={ref}
            multiple={multiple}
            value={value}
            onChange={handleChange}
            treeCheckable={treeCheckable}
            allowClear={allowClear}
            treeDefaultExpandAll={treeDefaultExpandAll}>
            {renderItemTree(treeData)}
          </TreeSelect>
        );
      },
      [multiple, treeCheckable, treeDefaultExpandAll, renderItemTree, allowClear, ref, treeData],
    );

    if (isControlled) {
      return renderTree(props.value, handleControlledChange);
    }

    const [value, setValue] = React.useState<number | number[]>(multiple ? [] : undefined);

    const handleChange = React.useCallback(
      (...[newValue, , extra]: [number | number[], any, any]) => {
        if (mode === 'single') {
          setValue(newValue);
          if (onChange) {
            onChange(newValue, newValue ? extra.triggerNode.props['data-content'] : undefined);
          }
          return;
        }
        if (treeCheckable) {
          setValue(newValue);
          if (onChange) {
            onChange(newValue);
          }
          return;
        }
        setValue(newValue);
        if (onChange) {
          if ((newValue as number[]).length === 0) {
            onChange([], []);
            return;
          }
          onChange(newValue, extra.triggerNode.props['data-content']);
        }
      },
      [mode, onChange, treeCheckable],
    );

    const handleUpdateValue = React.useCallback(
      () => {
        setValue(defaultValue);
      },
      [defaultValue],
    );

    React.useEffect(
      () => {
        handleUpdateValue();
      },
      [handleUpdateValue],
    );

    return renderTree(value, handleChange);
  },
);

TreeSelectDropdown.defaultProps = {
  mode: 'single',
  onlyLeaf: false,
  allowClear: true,
  treeDefaultExpandAll: false,
};

export default TreeSelectDropdown;
