import React from 'react';
import DatePicker from 'antd/lib/date-picker';
import Switch from 'antd/lib/switch';
import { crudService, routerService } from 'core/services';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Tabs from 'antd/lib/tabs';
import { useTranslation } from 'react-i18next';
import { generalLanguageKeys } from 'config/consts';
import Select from 'components/Select/Select';
import nameof from 'ts-nameof.macro';
import { defaultDetailFormLayout } from 'config/ant-design/form';
import InputNumber from 'components/InputNumber/InputNumber';
import { formService } from 'core/services/FormService';
import './ProductDetail.scss';
import { productRepository } from 'views/ProductView/ProductRepository';
import { Product } from 'models/Product';


// import { Brand } from 'models/Brand'
// import { BrandFilter } from 'models/BrandFilter'


import { ProductGrouping } from 'models/ProductGrouping';
import { ProductGroupingFilter } from 'models/ProductGroupingFilter';


import { ProductType } from 'models/ProductType';
import { ProductTypeFilter } from 'models/ProductTypeFilter';


import { Supplier } from 'models/Supplier';
import { SupplierFilter } from 'models/SupplierFilter';


// import { TaxType } from 'models/TaxType'
// import { TaxTypeFilter } from 'models/TaxTypeFilter'


import { UnitOfMeasure } from 'models/UnitOfMeasure';
import { UnitOfMeasureFilter } from 'models/UnitOfMeasureFilter';






import ProductImageMappingTable from 'views/ProductView/ProductDetail/ProductImageMappingTable/ProductImageMappingTable';




const { TabPane } = Tabs;

const { Item: FormItem } = Form;

function ProductDetail() {
  const [translate] = useTranslation();

  // Service goback
  const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
  const [
    product,
    setProduct,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    Product,
    productRepository.get,
    productRepository.save,
  );

  const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<Product>(product, setProduct);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  // const [brandFilter, setBrandFilter] = React.useState<BrandFilter>(new BrandFilter());

  const [productGroupingFilter, setProductGroupingFilter] = React.useState<ProductGroupingFilter>(new ProductGroupingFilter());

  const [productTypeFilter, setProductTypeFilter] = React.useState<ProductTypeFilter>(new ProductTypeFilter());

  const [supplierFilter, setSupplierFilter] = React.useState<SupplierFilter>(new SupplierFilter());

  // const [taxTypeFilter, setTaxTypeFilter] = React.useState<TaxTypeFilter>(new TaxTypeFilter());

  const [unitOfMeasureFilter, setUnitOfMeasureFilter] = React.useState<UnitOfMeasureFilter>(new UnitOfMeasureFilter());

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  // const defaultBrandList: Brand[] = crudService.useDefaultList<Brand>(product.brand);

  const defaultProductGroupingList: ProductGrouping[] = crudService.useDefaultList<ProductGrouping>(product.productGrouping);

  const defaultProductTypeList: ProductType[] = crudService.useDefaultList<ProductType>(product.productType);

  const defaultSupplierList: Supplier[] = crudService.useDefaultList<Supplier>(product.supplier);

  // const defaultTaxTypeList: TaxType[] = crudService.useDefaultList<TaxType>(product.taxType);

  const defaultUnitOfMeasureList: UnitOfMeasure[] = crudService.useDefaultList<UnitOfMeasure>(product.unitOfMeasure);

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left" />
            </button>
            {isDetail ? translate('products.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save" />
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('products.id')}
              validateStatus={formService.getValidationStatus<Product>(product.errors, nameof(product.id))}
              help={product.errors?.id}
            >
              <InputNumber defaultValue={product.id}
                className="w-100"
                onChange={handleChangeSimpleField(nameof(product.id))}
              />
            </FormItem>




            <FormItem label={translate('products.code')}
              validateStatus={formService.getValidationStatus<Product>(product.errors, nameof(product.code))}
              help={product.errors?.code}
            >
              <input type="text"
                defaultValue={product.code}
                className="form-control form-control-sm"
                onChange={handleChangeSimpleField(nameof(product.code))}
              />
            </FormItem>




            <FormItem label={translate('products.supplierCode')}
              validateStatus={formService.getValidationStatus<Product>(product.errors, nameof(product.supplierCode))}
              help={product.errors?.supplierCode}
            >
              <input type="text"
                defaultValue={product.supplierCode}
                className="form-control form-control-sm"
                onChange={handleChangeSimpleField(nameof(product.supplierCode))}
              />
            </FormItem>




            <FormItem label={translate('products.name')}
              validateStatus={formService.getValidationStatus<Product>(product.errors, nameof(product.name))}
              help={product.errors?.name}
            >
              <input type="text"
                defaultValue={product.name}
                className="form-control form-control-sm"
                onChange={handleChangeSimpleField(nameof(product.name))}
              />
            </FormItem>




            <FormItem label={translate('products.description')}
              validateStatus={formService.getValidationStatus<Product>(product.errors, nameof(product.description))}
              help={product.errors?.description}
            >
              <input type="text"
                defaultValue={product.description}
                className="form-control form-control-sm"
                onChange={handleChangeSimpleField(nameof(product.description))}
              />
            </FormItem>




            <FormItem label={translate('products.scanCode')}
              validateStatus={formService.getValidationStatus<Product>(product.errors, nameof(product.scanCode))}
              help={product.errors?.scanCode}
            >
              <input type="text"
                defaultValue={product.scanCode}
                className="form-control form-control-sm"
                onChange={handleChangeSimpleField(nameof(product.scanCode))}
              />
            </FormItem>



















            <FormItem label={translate('products.salePrice')}
              validateStatus={formService.getValidationStatus<Product>(product.errors, nameof(product.salePrice))}
              help={product.errors?.salePrice}
            >
            </FormItem>




            <FormItem label={translate('products.retailPrice')}
              validateStatus={formService.getValidationStatus<Product>(product.errors, nameof(product.retailPrice))}
              help={product.errors?.retailPrice}
            >
            </FormItem>







            <FormItem label={translate('products.isActive')}
              validateStatus={formService.getValidationStatus<Product>(product.errors, nameof(product.isActive))}
              help={product.errors?.isActive}
            >
            </FormItem>




            <FormItem label={translate('products.createdAt')}
              validateStatus={formService.getValidationStatus<Product>(product.errors, nameof(product.createdAt))}
              help={product.errors?.createdAt}
            >
              <DatePicker defaultValue={product.createdAt}
                onChange={handleChangeDateField(nameof(product.createdAt))}
                className="w-100"
              />
            </FormItem>



            <FormItem label={translate('products.updatedAt')}
              validateStatus={formService.getValidationStatus<Product>(product.errors, nameof(product.updatedAt))}
              help={product.errors?.updatedAt}
            >
              <DatePicker defaultValue={product.updatedAt}
                onChange={handleChangeDateField(nameof(product.updatedAt))}
                className="w-100"
              />
            </FormItem>



            <FormItem label={translate('products.deletedAt')}
              validateStatus={formService.getValidationStatus<Product>(product.errors, nameof(product.deletedAt))}
              help={product.errors?.deletedAt}
            >
              <DatePicker defaultValue={product.deletedAt}
                onChange={handleChangeDateField(nameof(product.deletedAt))}
                className="w-100"
              />
            </FormItem>





            {/* <Select value={ product.brand?.id }
                      onChange={handleChangeObjectField(nameof(product.brand))}
                      getList={ productRepository.singleListBrand }
                      list={ defaultBrandList }
                      modelFilter={ brandFilter }
                      setModelFilter={ setBrandFilter }
                      searchField={nameof(brandFilter.id)}
              /> */}




            <Select value={product.productGrouping?.id}
              onChange={handleChangeObjectField(nameof(product.productGrouping))}
              getList={productRepository.singleListProductGrouping}
              list={defaultProductGroupingList}
              modelFilter={productGroupingFilter}
              setModelFilter={setProductGroupingFilter}
              searchField={nameof(productGroupingFilter.id)}
            />




            <Select value={product.productType?.id}
              onChange={handleChangeObjectField(nameof(product.productType))}
              getList={productRepository.singleListProductType}
              list={defaultProductTypeList}
              modelFilter={productTypeFilter}
              setModelFilter={setProductTypeFilter}
              searchField={nameof(productTypeFilter.id)}
            />




            <Select value={product.supplier?.id}
              onChange={handleChangeObjectField(nameof(product.supplier))}
              getList={productRepository.singleListSupplier}
              list={defaultSupplierList}
              modelFilter={supplierFilter}
              setModelFilter={setSupplierFilter}
              searchField={nameof(supplierFilter.id)}
            />




            {/* <Select value={ product.taxType?.id }
                      onChange={handleChangeObjectField(nameof(product.taxType))}
                      getList={ productRepository.singleListTaxType }
                      list={ defaultTaxTypeList }
                      modelFilter={ taxTypeFilter }
                      setModelFilter={ setTaxTypeFilter }
                      searchField={nameof(taxTypeFilter.id)}
              /> */}




            <Select value={product.unitOfMeasure?.id}
              onChange={handleChangeObjectField(nameof(product.unitOfMeasure))}
              getList={productRepository.singleListUnitOfMeasure}
              list={defaultUnitOfMeasureList}
              modelFilter={unitOfMeasureFilter}
              setModelFilter={setUnitOfMeasureFilter}
              searchField={nameof(unitOfMeasureFilter.id)}
            />










          </Form>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save" />
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
        </Card>
        <Card className="mt-2">
          <Tabs defaultActiveKey="1">

            <TabPane key="1" tab={translate('product.tabs.roles.title')}>
              <ProductImageMappingTable model={product}
                setModel={setProduct}
                field={(nameof(product.productImageMappings))}
                onChange={handleChangeSimpleField(nameof(product.productImageMappings))}
              />
            </TabPane>

          </Tabs>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save" />
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
        </Card>
      </Spin>
    </div>
  );
}

export default ProductDetail;
