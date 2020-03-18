import Icon from 'antd/lib/icon';
import Upload, { UploadChangeParam, UploadProps } from 'antd/lib/upload';
import { RcCustomRequestOptions, UploadFile } from 'antd/lib/upload/interface';
import { notification } from 'helpers/notification';
import { Image } from 'models/Image';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalBody } from 'reactstrap';
import { Observable } from 'rxjs';
import v4 from 'uuid/v4';
import './ImageUpload.scss';


interface ImageUploadProps {
  defaultItems: Image[];

  limit?: number;

  onChange?: (images: Image[]) => void;

  key?: number | string;

  onUpload?: (file: File) => Observable<Image>;

  action?: string;

  id?: string;

  customRequest?: (options: RcCustomRequestOptions) => void;
}

function ImageUpload(props: ImageUploadProps) {
  const {
    limit,
    onChange,
    defaultItems,
    action,
    customRequest,
  } = props;

  const [preview, setPreview] = React.useState<string>(null);
  const [fileList, setFileList] = React.useState<any[]>(
    React.useMemo(
      () => {
        return (defaultItems || []).map((Image: Image) => {
          if (!Image.uid) {
            Image.uid = v4();
          }
          return Image;
        });
      },
      [defaultItems],
    ),
  );
  const [translate] = useTranslation();

  const handleClosePreview = React.useCallback(
    () => {
      setPreview(null);
    },
    [setPreview],
  );

  const handlePreview = React.useCallback(
    async (file: UploadFile) => {
      setPreview(file.url);
    },
    [setPreview],
  );

  const handleChange = React.useCallback(
    (uploadInfo: UploadChangeParam) => {
      const fileList = [...uploadInfo.fileList]
        .slice(0, limit)
        .map((file: UploadFile) => {
          if (file.response) {
            Object.assign(file, file.response);
          }
          return file;
        });
      if (fileList.length > limit) {
        notification.error({
          message: translate('imageUpload.lengthExceeded', { limit }),
        });
      }
      setFileList(fileList);
      if (onChange) {
        onChange(fileList);
      }
    },
    [setFileList, limit, translate, onChange],
  );

  const uploadProps: UploadProps = React.useMemo(
    () => ({
      withCredentials: true,
      listType: 'picture-card',
      onChange: handleChange,
      onPreview: handlePreview,
      multiple: true,
      fileList,
    }),
    [handleChange, handlePreview, fileList],
  );

  const uploadButton = React.useMemo(
    () => {
      const { length } = fileList;
      if (length >= limit) {
        return null;
      }
      return (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
    },
    [fileList, limit],
  );

  return (
    <div className="image-upload">
      <Upload
        {...uploadProps}
        action={action}
        customRequest={customRequest}
      >
        {uploadButton}
      </Upload>
      <Modal isOpen={!!preview} toggle={handleClosePreview}>
        <ModalBody className="image-upload-preview">
          <img className="preview" src={preview} alt="" />
        </ModalBody>
      </Modal>
    </div>
  );
}

ImageUpload.defaultProps = {
  limit: 5,
  aspectRatio: 1,
  defaultItems: [],
};

export default ImageUpload;
