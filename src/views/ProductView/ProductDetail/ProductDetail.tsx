import React from 'react';
import { crudService, routerService } from 'core/services';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Tabs from 'antd/lib/tabs';
import { useTranslation } from 'react-i18next';
import { generalLanguageKeys } from 'config/consts';
import './ProductDetail.scss';
import { productRepository } from 'views/ProductView/ProductRepository';
import { Product } from 'models/Product';

import PriceAndVariations from 'views/ProductView/ProductDetail/PriceAndVariations/PriceAndVariations';
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
        {/* <Card className="mt-2">
          <Tabs defaultActiveKey="1">
            <TabPane key="items" tab={translate('products.items.title')}>
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
              tab={translate('products.variationGroupings.title')}
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
        </Card> */}
      </Spin>
    </div>
  );
}

export default ProductDetail;
