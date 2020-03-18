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
import './ProductTypeDetail.scss';
import { productTypeRepository }  from 'views/ProductTypeView/ProductTypeRepository';
import { ProductType } from 'models/ProductType';



















const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function ProductTypeDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    productType,
    setProductType,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    ProductType,
    productTypeRepository.get,
    productTypeRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<ProductType>(productType, setProductType);

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
            {isDetail ? translate('productTypes.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('productTypes.id')}
                      validateStatus={formService.getValidationStatus<ProductType>(productType.errors, nameof(productType.id))}
                      help={ productType.errors?.id }
            >
              <InputNumber defaultValue={ productType.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(productType.id))}
              />
            </FormItem>




            <FormItem label={translate('productTypes.code')}
                      validateStatus={formService.getValidationStatus<ProductType>(productType.errors, nameof(productType.code))}
                      help={ productType.errors?.code }
            >
              <input type="text"
                           defaultValue={ productType.code }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(productType.code))}
              />
            </FormItem>




            <FormItem label={translate('productTypes.name')}
                      validateStatus={formService.getValidationStatus<ProductType>(productType.errors, nameof(productType.name))}
                      help={ productType.errors?.name }
            >
              <input type="text"
                           defaultValue={ productType.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(productType.name))}
              />
            </FormItem>




            <FormItem label={translate('productTypes.description')}
                      validateStatus={formService.getValidationStatus<ProductType>(productType.errors, nameof(productType.description))}
                      help={ productType.errors?.description }
            >
              <input type="text"
                           defaultValue={ productType.description }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(productType.description))}
              />
            </FormItem>




            <FormItem label={translate('productTypes.isActive')}
                      validateStatus={formService.getValidationStatus<ProductType>(productType.errors, nameof(productType.isActive))}
                      help={ productType.errors?.isActive }
            >
            </FormItem>




            <FormItem label={translate('productTypes.createdAt')}
                      validateStatus={formService.getValidationStatus<ProductType>(productType.errors, nameof(productType.createdAt))}
                      help={ productType.errors?.createdAt }
            >
              <DatePicker defaultValue={ productType.createdAt }
                          onChange={handleChangeDateField(nameof(productType.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('productTypes.updatedAt')}
                      validateStatus={formService.getValidationStatus<ProductType>(productType.errors, nameof(productType.updatedAt))}
                      help={ productType.errors?.updatedAt }
            >
              <DatePicker defaultValue={ productType.updatedAt }
                          onChange={handleChangeDateField(nameof(productType.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('productTypes.deletedAt')}
                      validateStatus={formService.getValidationStatus<ProductType>(productType.errors, nameof(productType.deletedAt))}
                      help={ productType.errors?.deletedAt }
            >
              <DatePicker defaultValue={ productType.deletedAt }
                          onChange={handleChangeDateField(nameof(productType.deletedAt))}
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

export default ProductTypeDetail;