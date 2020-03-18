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
import './ItemDetail.scss';
import { itemRepository }  from 'views/ItemView/ItemRepository';
import { Item } from 'models/Item';




















import { Product } from 'models/Product';
import { ProductFilter } from 'models/ProductFilter';



const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function ItemDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    item,
    setItem,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    Item,
    itemRepository.get,
    itemRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<Item>(item, setItem);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  const [productFilter, setProductFilter] = React.useState<ProductFilter>(new ProductFilter());

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  const defaultProductList: Product[] = crudService.useDefaultList<Product>(item.product);

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('items.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('items.id')}
                      validateStatus={formService.getValidationStatus<Item>(item.errors, nameof(item.id))}
                      help={ item.errors?.id }
            >
              <InputNumber defaultValue={ item.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(item.id))}
              />
            </FormItem>







            <FormItem label={translate('items.code')}
                      validateStatus={formService.getValidationStatus<Item>(item.errors, nameof(item.code))}
                      help={ item.errors?.code }
            >
              <input type="text"
                           defaultValue={ item.code }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(item.code))}
              />
            </FormItem>




            <FormItem label={translate('items.name')}
                      validateStatus={formService.getValidationStatus<Item>(item.errors, nameof(item.name))}
                      help={ item.errors?.name }
            >
              <input type="text"
                           defaultValue={ item.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(item.name))}
              />
            </FormItem>




            <FormItem label={translate('items.scanCode')}
                      validateStatus={formService.getValidationStatus<Item>(item.errors, nameof(item.scanCode))}
                      help={ item.errors?.scanCode }
            >
              <input type="text"
                           defaultValue={ item.scanCode }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(item.scanCode))}
              />
            </FormItem>




            <FormItem label={translate('items.salePrice')}
                      validateStatus={formService.getValidationStatus<Item>(item.errors, nameof(item.salePrice))}
                      help={ item.errors?.salePrice }
            >
            </FormItem>




            <FormItem label={translate('items.retailPrice')}
                      validateStatus={formService.getValidationStatus<Item>(item.errors, nameof(item.retailPrice))}
                      help={ item.errors?.retailPrice }
            >
            </FormItem>




            <FormItem label={translate('items.createdAt')}
                      validateStatus={formService.getValidationStatus<Item>(item.errors, nameof(item.createdAt))}
                      help={ item.errors?.createdAt }
            >
              <DatePicker defaultValue={ item.createdAt }
                          onChange={handleChangeDateField(nameof(item.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('items.updatedAt')}
                      validateStatus={formService.getValidationStatus<Item>(item.errors, nameof(item.updatedAt))}
                      help={ item.errors?.updatedAt }
            >
              <DatePicker defaultValue={ item.updatedAt }
                          onChange={handleChangeDateField(nameof(item.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('items.deletedAt')}
                      validateStatus={formService.getValidationStatus<Item>(item.errors, nameof(item.deletedAt))}
                      help={ item.errors?.deletedAt }
            >
              <DatePicker defaultValue={ item.deletedAt }
                          onChange={handleChangeDateField(nameof(item.deletedAt))}
                          className="w-100"
              />
            </FormItem>





              <Select value={ item.product?.id }
                      onChange={handleChangeObjectField(nameof(item.product))}
                      getList={ itemRepository.singleListProduct }
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

export default ItemDetail;