import React, { Dispatch, SetStateAction } from 'react';

import Form from 'antd/lib/form';
import { useTranslation } from 'react-i18next';
import { crudService, formService } from 'core/services';
import { productRepository } from '../../ProductRepository';
import { Product } from 'models/Product';
import { defaultDetailFormLayout } from 'config/ant-design/form';
import nameof from 'ts-nameof.macro';
import Select from 'components/Select/Select';
import { ProductGrouping } from 'models/ProductGrouping';
import { ProductType } from 'models/ProductType';
import { UnitOfMeasure } from 'models/UnitOfMeasure';
import { ProductTypeFilter } from 'models/ProductTypeFilter';
import { SupplierFilter } from 'models/SupplierFilter';
import { UnitOfMeasureFilter } from 'models/UnitOfMeasureFilter';
import { Supplier } from 'models/Supplier';
import { Brand } from 'models/Brand';
import { BrandFilter } from 'models/BrandFilter';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { Image } from 'models/Image';
import { ProductProductGroupingMappings } from 'models/ProductProductGroupingMappings';
import { ProductProductGroupingMappingsFilter } from 'models/ProductProductGroupingMappingsFilter';
import TreePopup from 'components/TreePopup/TreePopup';
import { UnitOfMeasureGroupingFilter } from 'models/UnitOfMeasureGroupingFilter';
import { UnitOfMeasureGrouping } from 'models/UnitOfMeasureGrouping';
import { Switch } from 'antd';
import RichTextEditor from 'components/RichTextEditor/RichTextEditor';

const { Item: FormItem } = Form;

export interface ProductDetailGeneralProps {
  product: Product;
  setProduct: Dispatch<SetStateAction<Product>>;
}

function ProductDetailGeneral(props: ProductDetailGeneralProps) {
  const { product, setProduct } = props;
  const [translate] = useTranslation();

  const [
    handleChangeSimpleField,
    handleChangeObjectField,
    // handleChangeDateField,
  ] = crudService.useChangeHandlers<Product>(product, setProduct);

  const [
    productProductGroupingMappingsFilter,
    setProductProductGroupingMappingsFilter,
  ] = React.useState<ProductProductGroupingMappingsFilter>(
    new ProductProductGroupingMappingsFilter(),
  );

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------
  const [productTypeFilter, setProductTypeFilter] = React.useState<
    ProductTypeFilter
  >(new ProductTypeFilter());

  const [supplierFilter, setSupplierFilter] = React.useState<SupplierFilter>(
    new SupplierFilter(),
  );

  // const [taxTypeFilter, setTaxTypeFilter] = React.useState<TaxTypeFilter>(new TaxTypeFilter());

  const [unitOfMeasureFilter, setUnitOfMeasureFilter] = React.useState<
    UnitOfMeasureFilter
  >(new UnitOfMeasureFilter());

  const [
    unitOfMeasureGroupingFilter,
    setUnitOfMeasureGroupingFilter,
  ] = React.useState<UnitOfMeasureGroupingFilter>(
    new UnitOfMeasureGroupingFilter(),
  );

  const [brandFilter, setBrandFilter] = React.useState<BrandFilter>(
    new BrandFilter(),
  );

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  const defaultProductProductGroupingMappingsList: ProductProductGroupingMappings[] = crudService.useDefaultList<
    ProductProductGroupingMappings
  >(product.productProductGroupingMappings);

  const defaultProductTypeList: ProductType[] = crudService.useDefaultList<
    ProductType
  >(product.productType);

  const defaultUnitOfMeasureList: UnitOfMeasure[] = crudService.useDefaultList<
    UnitOfMeasure
  >(product.unitOfMeasure);

  const defaultUnitOfMeasureGroupingList: UnitOfMeasureGrouping[] = crudService.useDefaultList<
    UnitOfMeasureGrouping
  >(product.unitOfMeasureGrouping);

  const defaultSupplierList: Supplier[] = crudService.useDefaultList<Supplier>(
    product.supplier,
  );

  const defaultBrandList: Brand[] = crudService.useDefaultList<Brand>(
    product.brand,
  );

  const [visible, setVisible] = React.useState<boolean>(false);

  const [
    productProductGroupingMappings,
    setProductProductGroupingMappings,
  ] = React.useState<ProductGrouping[]>([]);

  const handleChangeStatus = React.useCallback(
    (checked: boolean) => {
      const statusId = checked ? 1 : 0;
      setProduct({
        ...product,
        statusId,
      });
    },
    [setProduct, product],
  );

  const handleChangeImages = React.useCallback(
    (images: Image[]) => {
      setProduct({
        ...product,
        images,
      });
    },
    [setProduct, product],
  );

  const handleFocus = React.useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const handlePopupCancel = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const handleChangeTreePopup = React.useCallback(
    items => {
      setVisible(false);
      setProductProductGroupingMappings(items);
      const productProductGroupingMappings = [];
      if (items && items.length > 0) {
        items.forEach(item => {
          productProductGroupingMappings.push({ productGroupingId: item.id });
        });
      }
      setProduct({
        ...product,
        productProductGroupingMappings,
      });
    },
    [setVisible, setProductProductGroupingMappings, setProduct, product],
  );

  React.useEffect(() => {
    const listPorductGrouping = [];
    if (
      product.productProductGroupingMappings &&
      product.productProductGroupingMappings.length > 0
    ) {
      product.productProductGroupingMappings.map(
        (productGrouping: ProductProductGroupingMappings) => {
          listPorductGrouping.push(productGrouping.productGrouping);
        },
      );
      setProductProductGroupingMappings(listPorductGrouping);
    }
  }, [
    setProductProductGroupingMappings,
    product.productProductGroupingMappings,
  ]);

  const renderItems = React.useCallback(node => {
    if (node && node.children && node.children.length > 0) {
      return (
        <div className="tree-node d-flex" key={node?.id}>
          {node?.children?.length > 0 &&
            node.children.map(subNode => {
              return renderItems(subNode);
            })}
        </div>
      );
    } else {
      return (
        <div className="tree-node" key={node?.id}>
          {node?.name},
        </div>
      );
    }
  }, []);

  const renderInputTag = React.useCallback(() => {
    const tagGroup: string[] = [];
    if (
      productProductGroupingMappings &&
      productProductGroupingMappings.length > 0
    ) {
      productProductGroupingMappings.map((item: ProductGrouping) => {
        tagGroup.push(`<span>${item.name}</span>`);
      });
    }
    return tagGroup.join('');
  }, [productProductGroupingMappings]);

  return (
    <Form {...defaultDetailFormLayout}>
      <div className="row product-detail mt-5">
        <div className="col-6">
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

          <FormItem label={translate('products.productGrouping')}>
            <div className="product-grouping d-flex">
              {productProductGroupingMappings &&
                productProductGroupingMappings.length > 0 &&
                productProductGroupingMappings.map(productGroping => {
                  return renderItems(productGroping);
                })}
              {product.productProductGroupingMappings &&
                product.productProductGroupingMappings?.length > 0 &&
                productProductGroupingMappings.map((productGrouping, index) => {
                  return (
                    <div key={index}>
                      {productGrouping?.productGrouping &&
                        productGrouping?.productGrouping?.name}
                    </div>
                  );
                })}
            </div>
            <input
              type="text"
              // defaultValue={product.productProductGroupingMappings}
              className="form-control form-control-sm"
              onClick={handleFocus}
            />
            <TreePopup
              onChange={handleChangeTreePopup}
              getList={productRepository.singleListProductGrouping}
              list={defaultProductProductGroupingMappingsList}
              modelFilter={productProductGroupingMappingsFilter}
              setModelFilter={setProductProductGroupingMappingsFilter}
              searchField={nameof(
                productProductGroupingMappingsFilter.productId,
              )}
              selectedItems={productProductGroupingMappings}
              visible={visible}
              onClose={handlePopupCancel}
            />
          </FormItem>

          <Form.Item label={translate('products.status')}>
            <div className="product-status">
              <Switch
                checked={product.statusId === 1}
                onChange={handleChangeStatus}
              />
            </div>
          </Form.Item>

          <FormItem label={translate('products.productType')}>
            <Select
              value={product.productType?.id}
              onChange={handleChangeObjectField(nameof(product.productType))}
              getList={productRepository.singleListProductType}
              list={defaultProductTypeList}
              modelFilter={productTypeFilter}
              setModelFilter={setProductTypeFilter}
              searchField={nameof(productTypeFilter.id)}
            />
          </FormItem>

          <FormItem label={translate('products.unitOfMeasure')}>
            <Select
              value={product.unitOfMeasure?.id}
              onChange={handleChangeObjectField(nameof(product.unitOfMeasure))}
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

          <FormItem label={translate('products.supplier')}>
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

          <FormItem label={translate('products.brand')}>
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
          <div className="product-editor">
            <label>{translate('products.description')}</label>
            <RichTextEditor
              className="text-editor"
              value={product.description}
              onChange={handleChangeSimpleField(nameof(product.description))}
            />
          </div>
        </div>
      </div>
    </Form>
  );
}

export default ProductDetailGeneral;
