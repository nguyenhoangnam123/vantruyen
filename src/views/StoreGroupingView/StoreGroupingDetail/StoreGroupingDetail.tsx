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
import './StoreGroupingDetail.scss';
import { storeGroupingRepository } from 'views/StoreGroupingView/StoreGroupingRepository';
import { StoreGrouping } from 'models/StoreGrouping';
import { Switch } from 'antd';

const { Item: FormItem } = Form;

function StoreGroupingDetail() {
  const [translate] = useTranslation();

  // Service goback
  const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
  const [
    storeGrouping,
    setStoreGrouping,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    StoreGrouping,
    storeGroupingRepository.get,
    storeGroupingRepository.save,
  );

  const [
    handleChangeSimpleField,
  ] = crudService.useChangeHandlers<StoreGrouping>(storeGrouping, setStoreGrouping);

  function handleChangeStatus(checked : boolean){
    const isActive = checked ? true : false;
    setStoreGrouping({
      ...storeGrouping,
      isActive,
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
            {isDetail ? translate('storeGroupings.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('storeGroupings.code')}
              validateStatus={formService.getValidationStatus<StoreGrouping>(storeGrouping.errors, nameof(storeGrouping.code))}
              help={storeGrouping.errors?.code}
            >
              <input type="text"
                defaultValue={storeGrouping.code}
                className="form-control form-control-sm"
                onChange={handleChangeSimpleField(nameof(storeGrouping.code))}
              />
            </FormItem>
            <FormItem label={translate('storeGroupings.name')}
              validateStatus={formService.getValidationStatus<StoreGrouping>(storeGrouping.errors, nameof(storeGrouping.name))}
              help={storeGrouping.errors?.name}
            >
              <input type="text"
                defaultValue={storeGrouping.name}
                className="form-control form-control-sm"
                onChange={handleChangeSimpleField(nameof(storeGrouping.name))}
              />
            </FormItem>
            <FormItem label={translate('storeGroupings.address1')}
              validateStatus={formService.getValidationStatus<StoreGrouping>(storeGrouping.errors, nameof(storeGrouping.address1))}
              help={storeGrouping.errors?.address1}
            >
              <input type="text"
                defaultValue={storeGrouping.address1}
                className="form-control form-control-sm"
                onChange={handleChangeSimpleField(nameof(storeGrouping.address1))}
              />
            </FormItem>

            <FormItem label={translate('storeGroupings.address2')}
              validateStatus={formService.getValidationStatus<StoreGrouping>(storeGrouping.errors, nameof(storeGrouping.address2))}
              help={storeGrouping.errors?.address2}
            >
              <input type="text"
                defaultValue={storeGrouping.address2}
                className="form-control form-control-sm"
                onChange={handleChangeSimpleField(nameof(storeGrouping.address2))}
              />
            </FormItem>

            <FormItem label={translate('storeGroupings.isActive')}
              validateStatus={formService.getValidationStatus<StoreGrouping>(storeGrouping.errors, nameof(storeGrouping.status))}
              help={storeGrouping.errors?.status}>
              <Switch
                checked={storeGrouping.isActive}
                onChange={handleChangeStatus}>
              </Switch>
            </FormItem>

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

export default StoreGroupingDetail;
