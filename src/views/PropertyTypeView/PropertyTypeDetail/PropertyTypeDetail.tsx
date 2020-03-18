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
import './PropertyTypeDetail.scss';
import { propertyTypeRepository }  from 'views/PropertyTypeView/PropertyTypeRepository';
import { PropertyType } from 'models/PropertyType';















const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function PropertyTypeDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    propertyType,
    setPropertyType,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    PropertyType,
    propertyTypeRepository.get,
    propertyTypeRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<PropertyType>(propertyType, setPropertyType);

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
            {isDetail ? translate('propertyTypes.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('propertyTypes.id')}
                      validateStatus={formService.getValidationStatus<PropertyType>(propertyType.errors, nameof(propertyType.id))}
                      help={ propertyType.errors?.id }
            >
              <InputNumber defaultValue={ propertyType.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(propertyType.id))}
              />
            </FormItem>




            <FormItem label={translate('propertyTypes.code')}
                      validateStatus={formService.getValidationStatus<PropertyType>(propertyType.errors, nameof(propertyType.code))}
                      help={ propertyType.errors?.code }
            >
              <input type="text"
                           defaultValue={ propertyType.code }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(propertyType.code))}
              />
            </FormItem>




            <FormItem label={translate('propertyTypes.name')}
                      validateStatus={formService.getValidationStatus<PropertyType>(propertyType.errors, nameof(propertyType.name))}
                      help={ propertyType.errors?.name }
            >
              <input type="text"
                           defaultValue={ propertyType.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(propertyType.name))}
              />
            </FormItem>




            <FormItem label={translate('propertyTypes.isActive')}
                      validateStatus={formService.getValidationStatus<PropertyType>(propertyType.errors, nameof(propertyType.isActive))}
                      help={ propertyType.errors?.isActive }
            >
            </FormItem>




            <FormItem label={translate('propertyTypes.createdAt')}
                      validateStatus={formService.getValidationStatus<PropertyType>(propertyType.errors, nameof(propertyType.createdAt))}
                      help={ propertyType.errors?.createdAt }
            >
              <DatePicker defaultValue={ propertyType.createdAt }
                          onChange={handleChangeDateField(nameof(propertyType.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('propertyTypes.updatedAt')}
                      validateStatus={formService.getValidationStatus<PropertyType>(propertyType.errors, nameof(propertyType.updatedAt))}
                      help={ propertyType.errors?.updatedAt }
            >
              <DatePicker defaultValue={ propertyType.updatedAt }
                          onChange={handleChangeDateField(nameof(propertyType.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('propertyTypes.deletedAt')}
                      validateStatus={formService.getValidationStatus<PropertyType>(propertyType.errors, nameof(propertyType.deletedAt))}
                      help={ propertyType.errors?.deletedAt }
            >
              <DatePicker defaultValue={ propertyType.deletedAt }
                          onChange={handleChangeDateField(nameof(propertyType.deletedAt))}
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

export default PropertyTypeDetail;