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
import './PropertyDetail.scss';
import { propertyRepository }  from 'views/PropertyView/PropertyRepository';
import { Property } from 'models/Property';























const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function PropertyDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    property,
    setProperty,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    Property,
    propertyRepository.get,
    propertyRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<Property>(property, setProperty);

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
            {isDetail ? translate('properties.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('properties.id')}
                      validateStatus={formService.getValidationStatus<Property>(property.errors, nameof(property.id))}
                      help={ property.errors?.id }
            >
              <InputNumber defaultValue={ property.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(property.id))}
              />
            </FormItem>




            <FormItem label={translate('properties.code')}
                      validateStatus={formService.getValidationStatus<Property>(property.errors, nameof(property.code))}
                      help={ property.errors?.code }
            >
              <input type="text"
                           defaultValue={ property.code }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(property.code))}
              />
            </FormItem>




            <FormItem label={translate('properties.name')}
                      validateStatus={formService.getValidationStatus<Property>(property.errors, nameof(property.name))}
                      help={ property.errors?.name }
            >
              <input type="text"
                           defaultValue={ property.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(property.name))}
              />
            </FormItem>




            <FormItem label={translate('properties.description')}
                      validateStatus={formService.getValidationStatus<Property>(property.errors, nameof(property.description))}
                      help={ property.errors?.description }
            >
              <input type="text"
                           defaultValue={ property.description }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(property.description))}
              />
            </FormItem>







            <FormItem label={translate('properties.isSystem')}
                      validateStatus={formService.getValidationStatus<Property>(property.errors, nameof(property.isSystem))}
                      help={ property.errors?.isSystem }
            >
            </FormItem>




            <FormItem label={translate('properties.isActive')}
                      validateStatus={formService.getValidationStatus<Property>(property.errors, nameof(property.isActive))}
                      help={ property.errors?.isActive }
            >
            </FormItem>




            <FormItem label={translate('properties.createdAt')}
                      validateStatus={formService.getValidationStatus<Property>(property.errors, nameof(property.createdAt))}
                      help={ property.errors?.createdAt }
            >
              <DatePicker defaultValue={ property.createdAt }
                          onChange={handleChangeDateField(nameof(property.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('properties.updatedAt')}
                      validateStatus={formService.getValidationStatus<Property>(property.errors, nameof(property.updatedAt))}
                      help={ property.errors?.updatedAt }
            >
              <DatePicker defaultValue={ property.updatedAt }
                          onChange={handleChangeDateField(nameof(property.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('properties.deletedAt')}
                      validateStatus={formService.getValidationStatus<Property>(property.errors, nameof(property.deletedAt))}
                      help={ property.errors?.deletedAt }
            >
              <DatePicker defaultValue={ property.deletedAt }
                          onChange={handleChangeDateField(nameof(property.deletedAt))}
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

export default PropertyDetail;