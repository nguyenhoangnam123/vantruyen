import React from 'react';
import { crudService, routerService } from 'core/services';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import { useTranslation } from 'react-i18next';
import { generalLanguageKeys } from 'config/consts';
import nameof from 'ts-nameof.macro';
import { defaultDetailFormLayout } from 'config/ant-design/form';
import { formService } from 'core/services/FormService';
import './StoreTypeDetail.scss';
import { storeTypeRepository } from 'views/StoreTypeView/StoreTypeRepository';
import { StoreType } from 'models/StoreType';
import { Switch } from 'antd';

const { Item: FormItem } = Form;

function StoreTypeDetail() {
  const [translate] = useTranslation();

  // Service goback
  const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
  const [
    storeType,
    setStoreType,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    StoreType,
    storeTypeRepository.get,
    storeTypeRepository.save,
  );

  const [
    handleChangeSimpleField,
  ] = crudService.useChangeHandlers<StoreType>(storeType, setStoreType);

  function handleChangeStatus(checked: boolean) {
    const statusId: number = checked ? 1 : 0;
    setStoreType({
      ...storeType,
      statusId,
    });
  }

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left" />
            </button>
            {isDetail ? translate('storeTypes.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary mr-2" onClick={handleSave}>
              <i className="fa mr-2 fa-save" />
              {translate(generalLanguageKeys.actions.save)}
            </button>
            <button className="btn btn-sm btn-outline-primary mr-2" onClick={handleGoBack}>
              <i className="fa mr-2 fa-times-circle" />
              {translate(generalLanguageKeys.actions.cancel)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('storeTypes.code')}
              validateStatus={formService.getValidationStatus<StoreType>(storeType.errors, nameof(storeType.code))}
              help={storeType.errors?.code}
            >
              <input type="text"
                defaultValue={storeType.code}
                className="form-control form-control-sm"
                onChange={handleChangeSimpleField(nameof(storeType.code))}
              />
            </FormItem>

            <FormItem label={translate('storeTypes.name')}
              validateStatus={formService.getValidationStatus<StoreType>(storeType.errors, nameof(storeType.name))}
              help={storeType.errors?.name}
            >
              <input type="text"
                defaultValue={storeType.name}
                className="form-control form-control-sm"
                onChange={handleChangeSimpleField(nameof(storeType.name))}
              />
            </FormItem>

            <Form.Item label={translate('storeTypes.status')}>
              <div className="status">
                <Switch
                  checked={storeType.statusId===1}
                  onChange={handleChangeStatus}
                />
              </div>
            </Form.Item>
          </Form>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-sm btn-primary mr-2" onClick={handleSave}>
              <i className="fa mr-2 fa-save" />
              {translate(generalLanguageKeys.actions.save)}
            </button>
            <button className="btn btn-sm btn-outline-primary mr-2" onClick={handleGoBack}>
              <i className="fa mr-2 fa-times-circle" />
              {translate(generalLanguageKeys.actions.cancel)}
            </button>
          </div>
        </Card>
      </Spin>
    </div>
  );
}
export default StoreTypeDetail;
