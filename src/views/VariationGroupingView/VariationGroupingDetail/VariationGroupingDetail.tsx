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
import './VariationGroupingDetail.scss';
import { variationGroupingRepository }  from 'views/VariationGroupingView/VariationGroupingRepository';
import { VariationGrouping } from 'models/VariationGrouping';












import { Product } from 'models/Product';
import { ProductFilter } from 'models/ProductFilter';





const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function VariationGroupingDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    variationGrouping,
    setVariationGrouping,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    VariationGrouping,
    variationGroupingRepository.get,
    variationGroupingRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<VariationGrouping>(variationGrouping, setVariationGrouping);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  const [productFilter, setProductFilter] = React.useState<ProductFilter>(new ProductFilter());

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  const defaultProductList: Product[] = crudService.useDefaultList<Product>(variationGrouping.product);

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('variationGroupings.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('variationGroupings.id')}
                      validateStatus={formService.getValidationStatus<VariationGrouping>(variationGrouping.errors, nameof(variationGrouping.id))}
                      help={ variationGrouping.errors?.id }
            >
              <InputNumber defaultValue={ variationGrouping.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(variationGrouping.id))}
              />
            </FormItem>




            <FormItem label={translate('variationGroupings.name')}
                      validateStatus={formService.getValidationStatus<VariationGrouping>(variationGrouping.errors, nameof(variationGrouping.name))}
                      help={ variationGrouping.errors?.name }
            >
              <input type="text"
                           defaultValue={ variationGrouping.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(variationGrouping.name))}
              />
            </FormItem>







            <FormItem label={translate('variationGroupings.createdAt')}
                      validateStatus={formService.getValidationStatus<VariationGrouping>(variationGrouping.errors, nameof(variationGrouping.createdAt))}
                      help={ variationGrouping.errors?.createdAt }
            >
              <DatePicker defaultValue={ variationGrouping.createdAt }
                          onChange={handleChangeDateField(nameof(variationGrouping.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('variationGroupings.updatedAt')}
                      validateStatus={formService.getValidationStatus<VariationGrouping>(variationGrouping.errors, nameof(variationGrouping.updatedAt))}
                      help={ variationGrouping.errors?.updatedAt }
            >
              <DatePicker defaultValue={ variationGrouping.updatedAt }
                          onChange={handleChangeDateField(nameof(variationGrouping.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('variationGroupings.deletedAt')}
                      validateStatus={formService.getValidationStatus<VariationGrouping>(variationGrouping.errors, nameof(variationGrouping.deletedAt))}
                      help={ variationGrouping.errors?.deletedAt }
            >
              <DatePicker defaultValue={ variationGrouping.deletedAt }
                          onChange={handleChangeDateField(nameof(variationGrouping.deletedAt))}
                          className="w-100"
              />
            </FormItem>





              <Select value={ variationGrouping.product?.id }
                      onChange={handleChangeObjectField(nameof(variationGrouping.product))}
                      getList={ variationGroupingRepository.singleListProduct }
                      list={ defaultProductList }
                      modelFilter={ productFilter }
                      setModelFilter={ setProductFilter }
                      searchField={nameof(productFilter.id)}
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

export default VariationGroupingDetail;