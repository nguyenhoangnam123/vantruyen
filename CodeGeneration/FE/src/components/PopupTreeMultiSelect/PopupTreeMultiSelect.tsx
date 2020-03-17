import Button, { ButtonType } from 'antd/lib/button';
import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ITreeItem } from 'helpers/tree';
import { Model } from 'core/models';
import { useTranslation } from 'react-i18next';
import Tree from 'components/Tree/Tree';


export interface ISelectedItems<T> {
  [key: number]: T;
}

interface ITreeInModalProps<T extends Model> {
  defaultSelectedItems?: T[];
  selectedItems?: T[];
  defaultDataSource?: ITreeItem[];

  visible?: boolean;
  onChange?: (selectedItem: T[]) => void;
  onClose?: (event) => void;

  title?: string;
  className?: string;

  allowOk?: boolean;
  okText?: string;
  okType?: ButtonType;

  allowClose?: boolean;
  closeText?: string;
  closeType?: ButtonType;

}


function PopupTreeMultiSelect<T extends Model>(props: ITreeInModalProps<T>) {

  const [translate] = useTranslation();

  const [selectedItems, setSelectedItems] = useState<T[]>(props.selectedItems || props.defaultSelectedItems || []);

  useEffect(
    () => {
      if (props.selectedItems) {
        setSelectedItems(props.selectedItems);
      }
    },
    [props.selectedItems],
  );

  const handleOk = React.useCallback(
    () => {
      if (props.onChange) {
        props.onChange(selectedItems);
        return;
      }
    },
    [selectedItems]
  );

  // function handleOk() {
  //   if (props.onChange) {
  //     props.onChange(selectedItems);
  //     return;
  //   }
  // }

  const handleClose = React.useCallback(
    (event) => {
      setSelectedItems(props.selectedItems || props.defaultSelectedItems || []);
      if (props.onClose) {
        props.onClose(event);
      }
    },
    [setSelectedItems]
  )

  // function handleClose(event) {
  //   setSelectedItems(props.selectedItems || props.defaultSelectedItems || []);
  //   if (props.onClose) {
  //     props.onClose(event);
  //   }
  // }
  return renderModal();

  function renderModal() {
    return (
      <>
        <Modal
          className={props.className}
          isOpen={props.visible}
          toggle={handleClose}
          size="xl"
          style={{ maxWidth: '1000px', width: '90%' }}
          unmountOnClose
          centered
        >
          <ModalHeader toggle={props.onClose}>
            {translate(props.title)}
          </ModalHeader>
          <ModalBody>
            <Tree value={props.selectedItems} isEdit={false} checkable={true} />
          </ModalBody>
          <ModalFooter>
            <Button htmlType="button" type={props.okType} onClick={handleOk}>
              {translate(props.okText)}
            </Button>
            <Button htmlType="button" type={props.closeType} onClick={handleClose}>
              {translate(props.closeText)}
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

PopupTreeMultiSelect.defaultProps = {
  allowOk: true,
  okText: 'OK',
  okType: 'primary',
  allowClose: true,
  closeText: 'Cancel',
  closeType: 'default',
  defaultDataSource: [],
};

export default PopupTreeMultiSelect;
