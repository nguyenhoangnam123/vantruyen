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
import './PropertyValueDetail.scss';
import { propertyValueRepository }  from 'views/PropertyValueView/PropertyValueRepository';
import { PropertyValue } from 'models/PropertyValue';
















import { Property } from 'models/Property';
import { PropertyFilter } from 'models/PropertyFilter';



const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function PropertyValueDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    propertyValue,
    setPropertyValue,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    PropertyValue,
    propertyValueRepository.get,
    propertyValueRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<PropertyValue>(propertyValue, setPropertyValue);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  const [propertyFilter, setPropertyFilter] = React.useState<PropertyFilter>(new PropertyFilter());

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  const defaultPropertyList: Property[] = crudService.useDefaultList<Property>(propertyValue.property);

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('propertyValues.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('propertyValues.id')}
                      validateStatus={formService.getValidationStatus<PropertyValue>(propertyValue.errors, nameof(propertyValue.id))}
                      help={ propertyValue.errors?.id }
            >
              <InputNumber defaultValue={ propertyValue.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(propertyValue.id))}
              />
            </FormItem>




            <FormItem label={translate('propertyValues.code')}
                      validateStatus={formService.getValidationStatus<PropertyValue>(propertyValue.errors, nameof(propertyValue.code))}
                      help={ propertyValue.errors?.code }
            >
              <input type="text"
                           defaultValue={ propertyValue.code }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(propertyValue.code))}
              />
            </FormItem>




            <FormItem label={translate('propertyValues.name')}
                      validateStatus={formService.getValidationStatus<PropertyValue>(propertyValue.errors, nameof(propertyValue.name))}
                      help={ propertyValue.errors?.name }
            >
              <input type="text"
                           defaultValue={ propertyValue.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(propertyValue.name))}
              />
            </FormItem>







            <FormItem label={translate('propertyValues.isActive')}
                      validateStatus={formService.getValidationStatus<PropertyValue>(propertyValue.errors, nameof(propertyValue.isActive))}
                      help={ propertyValue.errors?.isActive }
            >
            </FormItem>




            <FormItem label={translate('propertyValues.createdAt')}
                      validateStatus={formService.getValidationStatus<PropertyValue>(propertyValue.errors, nameof(propertyValue.createdAt))}
                      help={ propertyValue.errors?.createdAt }
            >
              <DatePicker defaultValue={ propertyValue.createdAt }
                          onChange={handleChangeDateField(nameof(propertyValue.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('propertyValues.updatedAt')}
                      validateStatus={formService.getValidationStatus<PropertyValue>(propertyValue.errors, nameof(propertyValue.updatedAt))}
                      help={ propertyValue.errors?.updatedAt }
            >
              <DatePicker defaultValue={ propertyValue.updatedAt }
                          onChange={handleChangeDateField(nameof(propertyValue.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('propertyValues.deletedAt')}
                      validateStatus={formService.getValidationStatus<PropertyValue>(propertyValue.errors, nameof(propertyValue.deletedAt))}
                      help={ propertyValue.errors?.deletedAt }
            >
              <DatePicker defaultValue={ propertyValue.deletedAt }
                          onChange={handleChangeDateField(nameof(propertyValue.deletedAt))}
                          className="w-100"
              />
            </FormItem>





              <Select value={ propertyValue.property?.id }
                      onChange={handleChangeObjectField(nameof(propertyValue.property))}
                      getList={ propertyValueRepository.singleListProperty }
                      list={ defaultPropertyList }
                      modelFilter={ propertyFilter }
                      setModelFilter={ setPropertyFilter }
                      searchField={nameof(propertyFilter.id)}
              />

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

export default PropertyValueDetail;