import React from 'react';
import DatePicker from 'antd/lib/date-picker';
import Switch from 'antd/lib/switch';
import {crudService, routerService} from 'core/services';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Tabs from 'antd/lib/tabs';
import {useTranslation} from 'react-i18next';
import {generalLanguageKeys} from 'config/consts';
import Select from 'components/Select/Select';
import nameof from 'ts-nameof.macro';
import {defaultDetailFormLayout} from 'config/ant-design/form';
import InputNumber from 'components/InputNumber/InputNumber';
import {formService} from 'core/services/FormService';
import './StoreGroupingDetail.scss';
import { storeGroupingRepository }  from 'views/StoreGroupingView/StoreGroupingRepository';
import { StoreGrouping } from 'models/StoreGrouping';























const {TabPane} = Tabs;

const {Item: FormItem} = Form;

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
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<StoreGrouping>(storeGrouping, setStoreGrouping);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('storeGroupings.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('storeGroupings.id')}
                      validateStatus={formService.getValidationStatus<StoreGrouping>(storeGrouping.errors, nameof(storeGrouping.id))}
                      help={ storeGrouping.errors?.id }
            >
              <InputNumber defaultValue={ storeGrouping.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(storeGrouping.id))}
              />
            </FormItem>




            <FormItem label={translate('storeGroupings.code')}
                      validateStatus={formService.getValidationStatus<StoreGrouping>(storeGrouping.errors, nameof(storeGrouping.code))}
                      help={ storeGrouping.errors?.code }
            >
              <input type="text"
                           defaultValue={ storeGrouping.code }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(storeGrouping.code))}
              />
            </FormItem>




            <FormItem label={translate('storeGroupings.name')}
                      validateStatus={formService.getValidationStatus<StoreGrouping>(storeGrouping.errors, nameof(storeGrouping.name))}
                      help={ storeGrouping.errors?.name }
            >
              <input type="text"
                           defaultValue={ storeGrouping.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(storeGrouping.name))}
              />
            </FormItem>







            <FormItem label={translate('storeGroupings.path')}
                      validateStatus={formService.getValidationStatus<StoreGrouping>(storeGrouping.errors, nameof(storeGrouping.path))}
                      help={ storeGrouping.errors?.path }
            >
              <input type="text"
                           defaultValue={ storeGrouping.path }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(storeGrouping.path))}
              />
            </FormItem>




            <FormItem label={translate('storeGroupings.level')}
                      validateStatus={formService.getValidationStatus<StoreGrouping>(storeGrouping.errors, nameof(storeGrouping.level))}
                      help={ storeGrouping.errors?.level }
            >
            </FormItem>




            <FormItem label={translate('storeGroupings.isActive')}
                      validateStatus={formService.getValidationStatus<StoreGrouping>(storeGrouping.errors, nameof(storeGrouping.isActive))}
                      help={ storeGrouping.errors?.isActive }
            >
            </FormItem>




            <FormItem label={translate('storeGroupings.createdAt')}
                      validateStatus={formService.getValidationStatus<StoreGrouping>(storeGrouping.errors, nameof(storeGrouping.createdAt))}
                      help={ storeGrouping.errors?.createdAt }
            >
              <DatePicker defaultValue={ storeGrouping.createdAt }
                          onChange={handleChangeDateField(nameof(storeGrouping.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('storeGroupings.updatedAt')}
                      validateStatus={formService.getValidationStatus<StoreGrouping>(storeGrouping.errors, nameof(storeGrouping.updatedAt))}
                      help={ storeGrouping.errors?.updatedAt }
            >
              <DatePicker defaultValue={ storeGrouping.updatedAt }
                          onChange={handleChangeDateField(nameof(storeGrouping.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('storeGroupings.deletedAt')}
                      validateStatus={formService.getValidationStatus<StoreGrouping>(storeGrouping.errors, nameof(storeGrouping.deletedAt))}
                      help={ storeGrouping.errors?.deletedAt }
            >
              <DatePicker defaultValue={ storeGrouping.deletedAt }
                          onChange={handleChangeDateField(nameof(storeGrouping.deletedAt))}
                          className="w-100"
              />
            </FormItem>





          </Form>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
        </Card>
        <Card className="mt-2">
          <Tabs defaultActiveKey="1">

          </Tabs>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
        </Card>
      </Spin>
    </div>
  );
}

export default StoreGroupingDetail;