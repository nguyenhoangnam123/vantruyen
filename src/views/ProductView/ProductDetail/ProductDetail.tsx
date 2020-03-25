import React from 'react';
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
import { formService } from 'core/services/FormService';
import './ProductDetail.scss';
import { productRepository } from 'views/ProductView/ProductRepository';
import { Product } from 'models/Product';

import { Brand } from 'models/Brand';
import { BrandFilter } from 'models/BrandFilter';

import { ProductType } from 'models/ProductType';
import { ProductTypeFilter } from 'models/ProductTypeFilter';

import { Status } from 'models/Status';

import { Supplier } from 'models/Supplier';
import { SupplierFilter } from 'models/SupplierFilter';

import { TaxType } from 'models/TaxType';
import { TaxTypeFilter } from 'models/TaxTypeFilter';

import { UnitOfMeasure } from 'models/UnitOfMeasure';
import { UnitOfMeasureFilter } from 'models/UnitOfMeasureFilter';

import { UnitOfMeasureGrouping } from 'models/UnitOfMeasureGrouping';
import { UnitOfMeasureGroupingFilter } from 'models/UnitOfMeasureGroupingFilter';

import ItemTable from 'views/ProductView/ProductDetail/ItemTable/ItemTable';
import ProductImageMappingTable from 'views/ProductView/ProductDetail/ProductImageMappingTable/ProductImageMappingTable';
import ProductProductGroupingMappingTable from 'views/ProductView/ProductDetail/ProductProductGroupingMappingTable/ProductProductGroupingMappingTable';
import VariationGroupingTable from 'views/ProductView/ProductDetail/VariationGroupingTable/VariationGroupingTable';

import PriceAndVariations from 'views/ProductView/ProductDetail/PriceAndVariations/PriceAndVariations';

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
  ] = crudService.useChangeHandlers<Product>(product, setProduct);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  const [statusList] = crudService.useEnumList<Status>(
    productRepository.singleListStatus,
  );

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------
  const [brandFilter, setBrandFilter] = React.useState<BrandFilter>(
    new BrandFilter(),
  );
  const [productTypeFilter, setProductTypeFilter] = React.useState<
    ProductTypeFilter
  >(new ProductTypeFilter());
  const [supplierFilter, setSupplierFilter] = React.useState<SupplierFilter>(
    new SupplierFilter(),
  );
  const [taxTypeFilter, setTaxTypeFilter] = React.useState<TaxTypeFilter>(
    new TaxTypeFilter(),
  );
  const [unitOfMeasureFilter, setUnitOfMeasureFilter] = React.useState<
    UnitOfMeasureFilter
  >(new UnitOfMeasureFilter());
  const [
    unitOfMeasureGroupingFilter,
    setUnitOfMeasureGroupingFilter,
  ] = React.useState<UnitOfMeasureGroupingFilter>(
    new UnitOfMeasureGroupingFilter(),
  );

  // Default List -----------------------------------------------------------------------------------------------------------------------------------
  const defaultBrandList: Brand[] = crudService.useDefaultList<Brand>(
    product.brand,
  );
  const defaultProductTypeList: ProductType[] = crudService.useDefaultList<
    ProductType
  >(product.productType);
  const defaultSupplierList: Supplier[] = crudService.useDefaultList<Supplier>(
    product.supplier,
  );
  const defaultTaxTypeList: TaxType[] = crudService.useDefaultList<TaxType>(
    product.taxType,
  );
  const defaultUnitOfMeasureList: UnitOfMeasure[] = crudService.useDefaultList<
    UnitOfMeasure
  >(product.unitOfMeasure);
  const defaultUnitOfMeasureGroupingList: UnitOfMeasureGrouping[] = crudService.useDefaultList<
    UnitOfMeasureGrouping
  >(product.unitOfMeasureGrouping);

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card
          title={
            <>
              <button className="btn btn-link mr-2" onClick={handleGoBack}>
                <i className="fa fa-arrow-left" />
              </button>
              {isDetail
                ? translate('products.detail.title')
                : translate(generalLanguageKeys.actions.create)}
            </>
          }
        >
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save" />
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Tabs defaultActiveKey="1">
            <TabPane key="1" tab={translate('products.general')}>
              <Form {...defaultDetailFormLayout}>
                <FormItem
                  label={translate('products.code')}
                  validateStatus={formService.getValidationStatus<Product>(
                    product.errors,
                    nameof(product.code),
                  )}
                  help={product.errors?.code}
                >
                  <input
                    type="text"
                    defaultValue={product.code}
                    className="form-control form-control-sm"
                    onChange={handleChangeSimpleField(nameof(product.code))}
                  />
                </FormItem>

                <FormItem
                  label={translate('products.supplierCode')}
                  validateStatus={formService.getValidationStatus<Product>(
                    product.errors,
                    nameof(product.supplierCode),
                  )}
                  help={product.errors?.supplierCode}
                >
                  <input
                    type="text"
                    defaultValue={product.supplierCode}
                    className="form-control form-control-sm"
                    onChange={handleChangeSimpleField(
                      nameof(product.supplierCode),
                    )}
                  />
                </FormItem>

                <FormItem
                  label={translate('products.name')}
                  validateStatus={formService.getValidationStatus<Product>(
                    product.errors,
                    nameof(product.name),
                  )}
                  help={product.errors?.name}
                >
                  <input
                    type="text"
                    defaultValue={product.name}
                    className="form-control form-control-sm"
                    onChange={handleChangeSimpleField(nameof(product.name))}
                  />
                </FormItem>

                <FormItem
                  label={translate('products.description')}
                  validateStatus={formService.getValidationStatus<Product>(
                    product.errors,
                    nameof(product.description),
                  )}
                  help={product.errors?.description}
                >
                  <input
                    type="text"
                    defaultValue={product.description}
                    className="form-control form-control-sm"
                    onChange={handleChangeSimpleField(
                      nameof(product.description),
                    )}
                  />
                </FormItem>

                <FormItem
                  label={translate('products.scanCode')}
                  validateStatus={formService.getValidationStatus<Product>(
                    product.errors,
                    nameof(product.scanCode),
                  )}
                  help={product.errors?.scanCode}
                >
                  <input
                    type="text"
                    defaultValue={product.scanCode}
                    className="form-control form-control-sm"
                    onChange={handleChangeSimpleField(nameof(product.scanCode))}
                  />
                </FormItem>

                <FormItem
                  label={translate('products.brand')}
                  validateStatus={formService.getValidationStatus<Product>(
                    product.errors,
                    nameof(product.brand),
                  )}
                  help={product.errors?.brand}
                >
                  <Select
                    value={product.brand?.id}
                    onChange={handleChangeObjectField(nameof(product.brand))}
                    getList={productRepository.singleListBrand}
                    list={defaultBrandList}
                    modelFilter={brandFilter}
                    setModelFilter={setBrandFilter}
                    searchField={nameof(brandFilter.id)}
                  />
                </FormItem>

                <FormItem
                  label={translate('products.productType')}
                  validateStatus={formService.getValidationStatus<Product>(
                    product.errors,
                    nameof(product.productType),
                  )}
                  help={product.errors?.productType}
                >
                  <Select
                    value={product.productType?.id}
                    onChange={handleChangeObjectField(
                      nameof(product.productType),
                    )}
                    getList={productRepository.singleListProductType}
                    list={defaultProductTypeList}
                    modelFilter={productTypeFilter}
                    setModelFilter={setProductTypeFilter}
                    searchField={nameof(productTypeFilter.id)}
                  />
                </FormItem>

                <FormItem
                  label={translate('products.status')}
                  validateStatus={formService.getValidationStatus<Product>(
                    product.errors,
                    nameof(product.status),
                  )}
                  help={product.errors?.status}
                >
                  <Select
                    value={product.status?.id}
                    onChange={handleChangeObjectField(nameof(product.status))}
                    list={statusList}
                  />
                </FormItem>

                <FormItem
                  label={translate('products.supplier')}
                  validateStatus={formService.getValidationStatus<Product>(
                    product.errors,
                    nameof(product.supplier),
                  )}
                  help={product.errors?.supplier}
                >
                  <Select
                    value={product.supplier?.id}
                    onChange={handleChangeObjectField(nameof(product.supplier))}
                    getList={productRepository.singleListSupplier}
                    list={defaultSupplierList}
                    modelFilter={supplierFilter}
                    setModelFilter={setSupplierFilter}
                    searchField={nameof(supplierFilter.id)}
                  />
                </FormItem>

                <FormItem
                  label={translate('products.taxType')}
                  validateStatus={formService.getValidationStatus<Product>(
                    product.errors,
                    nameof(product.taxType),
                  )}
                  help={product.errors?.taxType}
                >
                  <Select
                    value={product.taxType?.id}
                    onChange={handleChangeObjectField(nameof(product.taxType))}
                    getList={productRepository.singleListTaxType}
                    list={defaultTaxTypeList}
                    modelFilter={taxTypeFilter}
                    setModelFilter={setTaxTypeFilter}
                    searchField={nameof(taxTypeFilter.id)}
                  />
                </FormItem>

                <FormItem
                  label={translate('products.unitOfMeasure')}
                  validateStatus={formService.getValidationStatus<Product>(
                    product.errors,
                    nameof(product.unitOfMeasure),
                  )}
                  help={product.errors?.unitOfMeasure}
                >
                  <Select
                    value={product.unitOfMeasure?.id}
                    onChange={handleChangeObjectField(
                      nameof(product.unitOfMeasure),
                    )}
                    getList={productRepository.singleListUnitOfMeasure}
                    list={defaultUnitOfMeasureList}
                    modelFilter={unitOfMeasureFilter}
                    setModelFilter={setUnitOfMeasureFilter}
                    searchField={nameof(unitOfMeasureFilter.id)}
                  />
                </FormItem>

                <FormItem
                  label={translate('products.unitOfMeasureGrouping')}
                  validateStatus={formService.getValidationStatus<Product>(
                    product.errors,
                    nameof(product.unitOfMeasureGrouping),
                  )}
                  help={product.errors?.unitOfMeasureGrouping}
                >
                  <Select
                    value={product.unitOfMeasureGrouping?.id}
                    onChange={handleChangeObjectField(
                      nameof(product.unitOfMeasureGrouping),
                    )}
                    getList={productRepository.singleListUnitOfMeasureGrouping}
                    list={defaultUnitOfMeasureGroupingList}
                    modelFilter={unitOfMeasureGroupingFilter}
                    setModelFilter={setUnitOfMeasureGroupingFilter}
                    searchField={nameof(unitOfMeasureGroupingFilter.id)}
                  />
                </FormItem>
              </Form>
            </TabPane>
            <TabPane key="2" tab={translate('products.variationsAndPrice')}>
              <PriceAndVariations product={product} setProduct={setProduct} />
            </TabPane>
          </Tabs>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save" />
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
        </Card>
        <Card className="mt-2">
          <Tabs defaultActiveKey="1">
            <TabPane key="items" tab={translate('products.tabs.items.title')}>
              <ItemTable
                model={product}
                setModel={setProduct}
                field={nameof(product.items)}
                onChange={handleChangeSimpleField(nameof(product.items))}
              />
            </TabPane>
            <Tabs.TabPane
              key="productImageMappings"
              tab={translate('products.productImageMappings.list')}
            >
              <ProductImageMappingTable
                product={product}
                setProduct={setProduct}
              />
            </Tabs.TabPane>
            <Tabs.TabPane
              key="productProductGroupingMappings"
              tab={translate('products.productProductGroupingMappings.list')}
            >
              <ProductProductGroupingMappingTable
                product={product}
                setProduct={setProduct}
              />
            </Tabs.TabPane>
            <TabPane
              key="variationGroupings"
              tab={translate('products.tabs.variationGroupings.title')}
            >
              <VariationGroupingTable
                model={product}
                setModel={setProduct}
                field={nameof(product.variationGroupings)}
                onChange={handleChangeSimpleField(
                  nameof(product.variationGroupings),
                )}
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
