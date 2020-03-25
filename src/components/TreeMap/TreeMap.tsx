import React, { useEffect, useMemo } from 'react';
import './TreeMap.scss';
import AntTree, { TreeProps as AntTreeProps } from 'antd/lib/tree';
import { Model } from 'core/models';
import Modal from 'reactstrap/lib/Modal';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import { useTranslation } from 'react-i18next';
// import { generalLanguageKeys } from 'config/consts';
import { ModalHeader } from 'reactstrap';
// import TreeSelectDropdown from 'components/TreeSelect/TreeSelect';
import { Input } from 'antd';

const { TreeNode } = AntTree;


export interface ISelectedItems<T> {
  [key: number]: T;
}

export interface TreeProps<T> extends AntTreeProps {
  value?: T[];
  isEdit?: boolean;
  checkable?: boolean;
  selectedItems?: T[];
  onChange?(value: T[]): void;
}

function Tree<T extends Model>(props: TreeProps<T>) {
  const [translate] = useTranslation();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [, setCurrentItem] = React.useState<T>(null);
  const [visibleDelete, setVisibleDelete] = React.useState<boolean>(false);
  const [visibleNotification, setVisibleNotification] = React.useState<boolean>(false);
  // const [checkedKeys] = React.useState<string[]>([]);

  const {
    value,
    onChange,
  } = props;

  const handleAdd = React.useCallback(
    (node: T) => {
      return () => {
        setCurrentItem(node);
        setVisible(true);
      };
    },
    [setCurrentItem, setVisible],
  );

  const handleEdit = React.useCallback(
    (node: T) => {
      return () => {
        setCurrentItem(node);
        setVisible(true);
      };
    },
    [setCurrentItem, setVisible],
  );

  const handleDelete = React.useCallback(
    (node: T) => {
      return () => {
        setCurrentItem(node);
        setVisibleDelete(true);
      };
    },
    [setCurrentItem, setVisibleDelete],
  );

  const renderTreeNode = React.useCallback(
    (node: T) => {
      return (
        <TreeNode key={node?.id} data={node} title={(
          <>
            <div className="title-tree-node d-flex">
              <div className="title form-control">
                {node.name}
              </div>
              {
                props.isEdit === true && (
                  <div>
                    <i role="button" className="fa fa-eye mr-2" onClick={handleAdd(node)} />
                    <i role="button" className="fa fa-plus mr-2" onClick={handleAdd(node)} />
                    <i role="button" className="fa fa-edit mr-2" onClick={handleEdit(node)} />
                    <i role="button" className="fa fa-trash" onClick={handleDelete(node)} />
                  </div>
                )
              }
            </div>
          </>
        )}>
          {node?.children?.length > 0 && node.children.map((subNode: T) => {
            return renderTreeNode(subNode);
          })}
        </TreeNode>
      );
    },
    [handleAdd],
  );

  const handleToggle = React.useCallback(
    () => {
      setVisible(false);
    },
    [setVisible],
  );

  const handleClose = React.useCallback(
    () => {
      setVisible(false);
    },
    [setVisible],
  );

  const toggle = React.useCallback(
    () => {
      setVisibleDelete(false);
      setVisibleNotification(true);
    },
    [setVisibleDelete],
  );

  const toggleNotification = React.useCallback(
    () => {
      setVisibleNotification(false);
    },
    [setVisibleDelete],
  );

  const handleCheck = React.useCallback(
    (...params) => {
      onChange(params[1].node.props.data);
      // Cái này là bắn event cho thằng ông nó đúng ko đúng rồi
      // thằng ngoài đã đảm bảo đúng chưa
      // đúng rồi đấy
      // Khi thằng ngoài thay đổi selectedItems => tạo checkedKeys từ selectedItems?
      // Ừ mỗi lần nó thay đôi, xong chị lại truyền vào đây để change thằng checkedkeys
      // OK, vấn đề ở đây là, nguồn tạo ra thằng checkedKeys là từ thằng ngoài, ko được phép khai báo state
      // mà dùng useMemo để tính lại checkedKeys từ selectedItems. ĐƠn giản vậy thôi
      // khai báo state thì nó gặp vấn đề gì, chị chưa hiểu lắm
      // Một dữ liệu chỉ nên được xuất phát từ 1 nguồn thôi
      // Với lại, phần effect bên dưới chị push id vào checkedKeys cũng đc, nhưng lại chưa gọi setCheckedKeys để update
      // React cần gọi setState mới update => đây là cái sai
      // best practice vẫn là dùng useMemo
      // ừ tại vì dữ liệu của anh Thắng nó cần phải map 2 lần, nên chị sợ là chị map vào checked là sai
      // bây giờ nếu dùng useMemo thì mình dùng trực tiếp luôn thằng selectItems mà bên ngoài truyền vào à
      // đúng rồi, chị cứ ngồi vẽ luồng dữ liệu ra, có thay đổi thì cũng phải là thằng selectedItems thay đổi trước
      // vì vậy bên trong chỉ cần ánh xạ selectedItems => checkedKeys thôi
      // ở giữa đoạn selectedItems => checkedKeys sẽ k có thay đổi gì cả mà là đưa vào cái gì ra đúng 1 kết quả xác định, k phải là 1 đầu vào nhiều đầu ra
      // chị đang chưa biết nếu dùng usememo thì phải xử lý thằng selectedItems như thế nào
      // selectedItems là đầu vào, khi đầu vào thay đổi thì memo nó sẽ tính
      // tức là cái checkedKeys sẽ là KẾT QUẢ TRẢ VỀ của memo, chứ KHÔNG phải state

    },
    [onChange],
  );

  const checkedKeys = useMemo(
    () => {
      const checked = [];
      if (props.selectedItems && props.selectedItems.length > 0) {
        props.selectedItems.forEach((items: T) => {
          const id = String(items.id);
          checked.push(id);
        });

        return checked;
      }
      else {
        return [];
      }
    },
    [props.selectedItems],
  );

  // useEffect(
  //   () => {
  //     if (props.selectedItems && props.selectedItems.length > 0) {
  //       props.selectedItems.forEach((items: T) => {
  //         const id = String(items.id);
  //         checkedKeys.push(id);
  //       });

  //     }
  //   },
  //   [props.selectedItems],
  // );

  return (
    <>
      {props.isEdit === true && (
        <div className="d-flex justify-content-end mb-2">
          <button className="btn btn-sm btn-primary" onClick={handleAdd(null)}>
            {translate('general.actions.add')}
          </button>
        </div>

      )}
      <AntTree
        defaultCheckedKeys={checkedKeys}
        // checkedKeys={checkedKeys}
        checkable={props.checkable}
        onCheck={handleCheck}
      >
        {value?.map((node: T) => {
          return renderTreeNode(node);
        })}
      </AntTree>
      <Modal isOpen={visible}>
        <ModalHeader>
          {translate('tree.created')}
        </ModalHeader>
        <ModalBody>
          <div className="org-hierarchy mt-2">
            <label>Đơn vị cha: </label>
            <div>
              {/* <TreeSelectDropdown
                value={currentItem?.id}
                mode="single"
                treeDefaultExpandAll={false}
                treeData={props.value}
              /> */}
            </div>
          </div>
          <div className="org-code mt-2">
            <label>Mã đơn vị *:</label>
            <Input />
          </div>
          <div className="org-name mt-2">
            <label>Tên đơn vị *:</label>
            <Input />
          </div>
          <div className="org-mobile mt-2">
            <label>Điện thoại:</label>
            <Input />
          </div>
          <div className="org-status mt-2">
            <label>Trạng thái sử dụng:</label>
            <Input />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-sm btn-primary" onClick={handleToggle}>
            {translate('OK')}
          </button>
          <button className="btn btn-sm btn-cancel" onClick={handleClose}>
            {translate('cancel')}
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={visibleDelete}>
        <ModalHeader>{translate('general.confirm')}</ModalHeader>
        <ModalBody>
          {translate('general.delete.content')}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-sm btn-primary" onClick={toggle}>{translate('general.delete')}</button>
          <button className="btn btn-sm btn-cancel" onClick={toggle}>{translate('general.cancel')}</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={visibleNotification}>
        <ModalHeader>{translate('general.notifications')}</ModalHeader>
        <ModalBody>
          {translate('general.delete.content.sucess')}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-sm btn-primary" onClick={toggleNotification}>{translate('general.delete')}</button>
          <button className="btn btn-sm btn-cancel" onClick={toggleNotification}>{translate('general.cancel')}</button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Tree;