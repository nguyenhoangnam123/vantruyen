import React from 'react';
import { crudService, routerService } from 'core/services';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Tabs from 'antd/lib/tabs';
import { useTranslation } from 'react-i18next';
import { generalLanguageKeys } from 'config/consts';
import nameof from 'ts-nameof.macro';
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
import { ProductProductGroupingMappingsFilter } from 'models/ProductProductGroupingMappingsFilter';
import { ProductProductGroupingMappings } from 'models/ProductProductGroupingMappings';
import ProductDetailGeneral from './ProductDetailGeneral/ProductDetailGeneral';

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

  const [
    productProductGroupingMappingsFilter,
    setProductProductGroupingMappingsFilter,
  ] = React.useState<ProductProductGroupingMappingsFilter>(
    new ProductProductGroupingMappingsFilter(),
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

  const defaultProductProductGroupingMappingsList: ProductProductGroupingMappings[] = crudService.useDefaultList<
    ProductProductGroupingMappings
  >(product.productProductGroupingMappings);

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
              <ProductDetailGeneral product={product} setProduct={setProduct} />
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
