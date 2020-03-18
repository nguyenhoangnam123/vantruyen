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
import './StoreTypeDetail.scss';
import { storeTypeRepository }  from 'views/StoreTypeView/StoreTypeRepository';
import { StoreType } from 'models/StoreType';

















const {TabPane} = Tabs;

const {Item: FormItem} = Form;

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
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<StoreType>(storeType, setStoreType);

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
            {isDetail ? translate('storeTypes.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('storeTypes.id')}
                      validateStatus={formService.getValidationStatus<StoreType>(storeType.errors, nameof(storeType.id))}
                      help={ storeType.errors?.id }
            >
              <InputNumber defaultValue={ storeType.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(storeType.id))}
              />
            </FormItem>




            <FormItem label={translate('storeTypes.code')}
                      validateStatus={formService.getValidationStatus<StoreType>(storeType.errors, nameof(storeType.code))}
                      help={ storeType.errors?.code }
            >
              <input type="text"
                           defaultValue={ storeType.code }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(storeType.code))}
              />
            </FormItem>




            <FormItem label={translate('storeTypes.name')}
                      validateStatus={formService.getValidationStatus<StoreType>(storeType.errors, nameof(storeType.name))}
                      help={ storeType.errors?.name }
            >
              <input type="text"
                           defaultValue={ storeType.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(storeType.name))}
              />
            </FormItem>




            <FormItem label={translate('storeTypes.isActive')}
                      validateStatus={formService.getValidationStatus<StoreType>(storeType.errors, nameof(storeType.isActive))}
                      help={ storeType.errors?.isActive }
            >
            </FormItem>




            <FormItem label={translate('storeTypes.createdAt')}
                      validateStatus={formService.getValidationStatus<StoreType>(storeType.errors, nameof(storeType.createdAt))}
                      help={ storeType.errors?.createdAt }
            >
              <DatePicker defaultValue={ storeType.createdAt }
                          onChange={handleChangeDateField(nameof(storeType.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('storeTypes.updatedAt')}
                      validateStatus={formService.getValidationStatus<StoreType>(storeType.errors, nameof(storeType.updatedAt))}
                      help={ storeType.errors?.updatedAt }
            >
              <DatePicker defaultValue={ storeType.updatedAt }
                          onChange={handleChangeDateField(nameof(storeType.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('storeTypes.deletedAt')}
                      validateStatus={formService.getValidationStatus<StoreType>(storeType.errors, nameof(storeType.deletedAt))}
                      help={ storeType.errors?.deletedAt }
            >
              <DatePicker defaultValue={ storeType.deletedAt }
                          onChange={handleChangeDateField(nameof(storeType.deletedAt))}
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

export default StoreTypeDetail;