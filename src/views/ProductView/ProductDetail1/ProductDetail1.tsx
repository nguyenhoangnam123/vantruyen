import React from 'react';

import Form from 'antd/lib/form';
import Tabs from 'antd/lib/tabs';
import { useTranslation } from 'react-i18next';
import { routerService, crudService, formService } from 'core/services';
import { Product } from 'models/Product';
import { productRepository } from '../ProductRepository';
import { Spin, Card, Switch } from 'antd';
import { generalLanguageKeys } from 'config/consts';
import { defaultDetailFormLayout } from 'config/ant-design/form';
import nameof from 'ts-nameof.macro';
import Select from 'components/Select/Select';
import { ProductGrouping } from 'models/ProductGrouping';
import { ProductType } from 'models/ProductType';
import { UnitOfMeasure } from 'models/UnitOfMeasure';
import { ProductGroupingFilter } from 'models/ProductGroupingFilter';
import { ProductTypeFilter } from 'models/ProductTypeFilter';
import { SupplierFilter } from 'models/SupplierFilter';
import { UnitOfMeasureFilter } from 'models/UnitOfMeasureFilter';
import { Supplier } from 'models/Supplier';
import { Brand } from 'models/Brand';
import { BrandFilter } from 'models/BrandFilter';
// import RichTextEditor from 'components/RichTextEditor/RichTextEditor';
import ImageUpload from 'components/ImageUpload/ImageUpload';
// import classNames from 'classnames';
import { Image } from 'models/Image';
import TreeSelectDropdown from 'components/TreeSelect/TreeSelect';

const { TabPane } = Tabs;

const { Item: FormItem } = Form;

function ProductDetail1() {

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
    // handleChangeDateField,
  ] = crudService.useChangeHandlers<Product>(product, setProduct);

  // Filter
  const [productGroupingFilter, setProductGroupingFilter] = React.useState<ProductGroupingFilter>(new ProductGroupingFilter());

  const [productTypeFilter, setProductTypeFilter] = React.useState<ProductTypeFilter>(new ProductTypeFilter());

  const [supplierFilter, setSupplierFilter] = React.useState<SupplierFilter>(new SupplierFilter());

  // const [taxTypeFilter, setTaxTypeFilter] = React.useState<TaxTypeFilter>(new TaxTypeFilter());

  const [unitOfMeasureFilter, setUnitOfMeasureFilter] = React.useState<UnitOfMeasureFilter>(new UnitOfMeasureFilter());

  const [brandFilter, setBrandFilter] = React.useState<BrandFilter>(new BrandFilter());
  ///////

  const defaultProductGroupingList: ProductGrouping[] = crudService.useDefaultList<ProductGrouping>(product.productGrouping);

  const defaultProductTypeList: ProductType[] = crudService.useDefaultList<ProductType>(product.productType);

  const defaultUnitOfMeasureList: UnitOfMeasure[] = crudService.useDefaultList<UnitOfMeasure>(product.unitOfMeasure);

  const defaultSupplierList: Supplier[] = crudService.useDefaultList<Supplier>(product.supplier);

  const defaultBrandList: Brand[] = crudService.useDefaultList<Brand>(product.brand);


  // const handleChangeStatus = React.useCallback(
  //   (checked: boolean) => {
  //     const isActive: boolean = checked;
  //     console.log('handleChangeStatus', product)
  //     // setProduct({
  //     //   ...product,
  //     //   isActive,
  //     // });
  //   },
  //   [],
  // );

  function handleChangeStatus(checked: boolean) {
    const isActive: boolean = checked;
    setProduct({
      ...product,
      isActive,
    });
  }

  // const statusDisplay: string = React.useMemo(
  //   () => {
  //     if (statusList) {
  //       const status: ProductStatus = statusList.find((status: ProductStatus) => status.id === product.statusId);
  //       if (status) {
  //         return status.name;
  //       }
  //     }
  //     return null;
  //   },
  //   [],
  // );


  const handleChangeImages = React.useCallback(
    (images: Image[]) => {
      setProduct({
        ...product,
        images,
      });
    },
    [setProduct],
  );

  const treeData = [
    {
      id: 1,
      name: 'Máy tính',
      children: [
        {
          id: 2,
          parentId: 1,
          name: 'Laptop',
        },
        {
          id: 3,
          parentId: 1,
          name: 'Desktop',
        },
      ],
    },
    {
      id: 4,
      name: 'Điện thoại',
    },
  ];
  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left" />
            </button>
            {isDetail ? translate('products.detail.title') : translate(generalLanguageKeys.actions.create)}
            <button className="btn btn-sm btn-primary float-right" onClick={handleSave}>
              <i className="fa mr-2 fa-save" />
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </>
        )}>

          <Tabs defaultActiveKey="1" className="mt-1">

            <TabPane key="1" tab={translate('product.tabs.general.title')}>
              <Form {...defaultDetailFormLayout}>
                <div className="row product-detail mt-5">
                  <div className="col-6">

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
                    <FormItem label={translate('products.productGrouping')}>
                      {/* {/* <Select value={product.productGrouping?.id}
                        onChange={handleChangeObjectField(nameof(product.productGrouping))}
                        getList={productRepository.singleListProductGrouping}
                        list={defaultProductGroupingList}
                        modelFilter={productGroupingFilter}
                        setModelFilter={setProductGroupingFilter}
                        searchField={nameof(productGroupingFilter.id)}
                      /> */}

                      <TreeSelectDropdown
                        mode="multiple"
                        getList={productRepository.singleListProductGrouping}
                        treeCheckable={true}
                        list={defaultProductGroupingList}
                        modelFilter={productGroupingFilter}
                        setModelFilter={setProductGroupingFilter}
                        searchField={nameof(productGroupingFilter.id)}
                      /> */}
                    </FormItem>
                    <Form.Item label={translate('productDetail.status')}>
                      <div className="product-status">
                        <Switch checked={product.isActive === true} onChange={handleChangeStatus} />
                        {/* <span className={classNames('status-display', { active: product.isActive === true, inactive: product.isActive === false })}>
                          {statusDisplay}
                        </span> */}
                      </div>
                    </Form.Item>

                    <FormItem label={translate('products.productType')}>
                      <Select value={product.productType?.id}
                        onChange={handleChangeObjectField(nameof(product.productType))}
                        getList={productRepository.singleListProductType}
                        list={defaultProductTypeList}
                        modelFilter={productTypeFilter}
                        setModelFilter={setProductTypeFilter}
                        searchField={nameof(productTypeFilter.id)}
                      />
                    </FormItem>

                    <FormItem label={translate('products.unitOfMeasure')}>
                      <Select value={product.unitOfMeasure?.id}
                        onChange={handleChangeObjectField(nameof(product.unitOfMeasure))}
                        getList={productRepository.singleListUnitOfMeasure}
                        list={defaultUnitOfMeasureList}
                        modelFilter={unitOfMeasureFilter}
                        setModelFilter={setUnitOfMeasureFilter}
                        searchField={nameof(unitOfMeasureFilter.id)}
                      />
                    </FormItem>

                    <FormItem label={translate('products.supplier')}>
                      <Select value={product.supplier?.id}
                        onChange={handleChangeObjectField(nameof(product.supplier))}
                        getList={productRepository.singleListSupplier}
                        list={defaultSupplierList}
                        modelFilter={supplierFilter}
                        setModelFilter={setSupplierFilter}
                        searchField={nameof(supplierFilter.id)}
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

                    <FormItem label={translate('products.brand')}>
                      <Select value={product.brand?.id}
                        onChange={handleChangeObjectField(nameof(product.brand))}
                        getList={productRepository.singleListBrand}
                        list={defaultBrandList}
                        modelFilter={brandFilter}
                        setModelFilter={setBrandFilter}
                        searchField={nameof(brandFilter.id)}
                      />
                    </FormItem>

                  </div>
                  <div className="col-6">
                    <div className="product-image">
                      {/* <ImageUpload /> */}
                      <Form.Item label={translate('productDetail.images')}>
                        <ImageUpload
                          defaultItems={product.images}
                          limit={15}
                          aspectRatio={1}
                          onUpload={productRepository.uploadImage}
                          onChange={handleChangeImages}
                        // action="/api/product/product-detail/upload-image"
                        />
                      </Form.Item>
                    </div>
                    {/* <div className="product-editor">
                      <label>{translate('products.description')}</label>
                      <RichTextEditor
                        className="text-editor"
                        value={product.description}
                        onChange={handleChangeSimpleField(nameof(product.description))}
                        />
                    </div> */}

                  </div>
                </div>
              </Form>
            </TabPane>

          </Tabs>

        </Card>
      </Spin>
    </div>
  );
}

export default ProductDetail1;
