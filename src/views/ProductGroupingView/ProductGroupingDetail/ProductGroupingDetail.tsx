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
import './ProductGroupingDetail.scss';
import { productGroupingRepository }  from 'views/ProductGroupingView/ProductGroupingRepository';
import { ProductGrouping } from 'models/ProductGrouping';




















import { ProductGroupingFilter } from 'models/ProductGroupingFilter';







const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function ProductGroupingDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    productGrouping,
    setProductGrouping,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    ProductGrouping,
    productGroupingRepository.get,
    productGroupingRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<ProductGrouping>(productGrouping, setProductGrouping);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  const [productGroupingFilter, setProductGroupingFilter] = React.useState<ProductGroupingFilter>(new ProductGroupingFilter());

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  const defaultProductGroupingList: ProductGrouping[] = crudService.useDefaultList<ProductGrouping>(productGrouping.productGrouping);

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('productGroupings.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('productGroupings.id')}
                      validateStatus={formService.getValidationStatus<ProductGrouping>(productGrouping.errors, nameof(productGrouping.id))}
                      help={ productGrouping.errors?.id }
            >
              <InputNumber defaultValue={ productGrouping.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(productGrouping.id))}
              />
            </FormItem>




            <FormItem label={translate('productGroupings.code')}
                      validateStatus={formService.getValidationStatus<ProductGrouping>(productGrouping.errors, nameof(productGrouping.code))}
                      help={ productGrouping.errors?.code }
            >
              <input type="text"
                           defaultValue={ productGrouping.code }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(productGrouping.code))}
              />
            </FormItem>




            <FormItem label={translate('productGroupings.name')}
                      validateStatus={formService.getValidationStatus<ProductGrouping>(productGrouping.errors, nameof(productGrouping.name))}
                      help={ productGrouping.errors?.name }
            >
              <input type="text"
                           defaultValue={ productGrouping.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(productGrouping.name))}
              />
            </FormItem>







            <FormItem label={translate('productGroupings.path')}
                      validateStatus={formService.getValidationStatus<ProductGrouping>(productGrouping.errors, nameof(productGrouping.path))}
                      help={ productGrouping.errors?.path }
            >
              <input type="text"
                           defaultValue={ productGrouping.path }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(productGrouping.path))}
              />
            </FormItem>




            <FormItem label={translate('productGroupings.description')}
                      validateStatus={formService.getValidationStatus<ProductGrouping>(productGrouping.errors, nameof(productGrouping.description))}
                      help={ productGrouping.errors?.description }
            >
              <input type="text"
                           defaultValue={ productGrouping.description }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(productGrouping.description))}
              />
            </FormItem>




            <FormItem label={translate('productGroupings.isActive')}
                      validateStatus={formService.getValidationStatus<ProductGrouping>(productGrouping.errors, nameof(productGrouping.isActive))}
                      help={ productGrouping.errors?.isActive }
            >
            </FormItem>




            <FormItem label={translate('productGroupings.createdAt')}
                      validateStatus={formService.getValidationStatus<ProductGrouping>(productGrouping.errors, nameof(productGrouping.createdAt))}
                      help={ productGrouping.errors?.createdAt }
            >
              <DatePicker defaultValue={ productGrouping.createdAt }
                          onChange={handleChangeDateField(nameof(productGrouping.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('productGroupings.updatedAt')}
                      validateStatus={formService.getValidationStatus<ProductGrouping>(productGrouping.errors, nameof(productGrouping.updatedAt))}
                      help={ productGrouping.errors?.updatedAt }
            >
              <DatePicker defaultValue={ productGrouping.updatedAt }
                          onChange={handleChangeDateField(nameof(productGrouping.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('productGroupings.deletedAt')}
                      validateStatus={formService.getValidationStatus<ProductGrouping>(productGrouping.errors, nameof(productGrouping.deletedAt))}
                      help={ productGrouping.errors?.deletedAt }
            >
              <DatePicker defaultValue={ productGrouping.deletedAt }
                          onChange={handleChangeDateField(nameof(productGrouping.deletedAt))}
                          className="w-100"
              />
            </FormItem>





              <Select value={ productGrouping.parent?.id }
                      onChange={handleChangeObjectField(nameof(productGrouping.parent))}
                      getList={ productGroupingRepository.singleListProductGrouping }
                      list={ defaultProductGroupingList }
                      modelFilter={ productGroupingFilter }
                      setModelFilter={ setProductGroupingFilter }
                      searchField={nameof(productGroupingFilter.id)}
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

export default ProductGroupingDetail;
