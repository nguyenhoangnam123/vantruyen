import React, {Dispatch, SetStateAction} from 'react';
import {crudService, tableService} from 'core/services';
import Table, {ColumnProps} from 'antd/lib/table';
import {renderMasterIndex} from 'helpers/ant-design/table';
import nameof from 'ts-nameof.macro';
import {useTranslation} from 'react-i18next';
import {generalColumnWidths, generalLanguageKeys} from 'config/consts';

// Parent Repo
import { productRepository } from 'views/ProductView/ProductRepository';
// Parent Class
import { Product } from 'models/Product';
// Class
import { ProductProductGroupingMapping } from 'models/ProductProductGroupingMapping';
// Filter Class
import { ProductProductGroupingMappingFilter } from 'models/ProductProductGroupingMappingFilter';
// Mapping Class
import { ProductGrouping } from 'models/ProductGrouping';
import ProductProductGroupingMappingModal from 'views/ProductView/ProductDetail/ProductProductGroupingMappingModal/ProductProductGroupingMappingModal';

export interface ProductProductGroupingMappingTableProps {
  product: Product;

  setProduct: Dispatch<SetStateAction<Product>>;
}

function ProductProductGroupingMappingTable(props: ProductProductGroupingMappingTableProps) {
  const [translate] = useTranslation();

  const {
    product,
    setProduct,
  } = props;

  const [
    productProductGroupingMappings,
    setProductProductGroupingMappings,
  ] = crudService.useContentTable<Product, ProductProductGroupingMapping>(
    product,
    setProduct,
    nameof(product.productProductGroupingMappings),
  );

  const [
    productProductGroupingMappingFilter,
    setProductProductGroupingMappingFilter,
  ] = React.useState<ProductProductGroupingMappingFilter>(
    new ProductProductGroupingMappingFilter(),
  );

  const [
    dataSource,
    pagination,
    ,
    handleTableChange,
  ] = tableService.useLocalTable<ProductProductGroupingMapping, ProductProductGroupingMappingFilter>(
    productProductGroupingMappings,
    productProductGroupingMappingFilter,
    setProductProductGroupingMappingFilter,
  );

    const [
    loading,
    visible,
    list,
    total,
    handleOpen,
    handleClose,
    filter,
    setFilter,
  ] = crudService.useContentModal(
    productRepository.listProductProductGroupingMapping,
    productRepository.countProductProductGroupingMapping,
    ProductProductGroupingMappingFilter,
  );

  const rowSelection = tableService.useModalRowSelection<ProductGrouping, ProductProductGroupingMapping>(
    product.id,
    nameof(product),
    nameof(productProductGroupingMappings[0].productGrouping),
    productProductGroupingMappings,
    setProductProductGroupingMappings,
  );

  const columns: ColumnProps<ProductProductGroupingMapping>[] = React.useMemo(
    () => [
      {
        title: translate(generalLanguageKeys.columns.index),
        key: nameof(generalLanguageKeys.columns.index),
        width: generalColumnWidths.index,
        render: renderMasterIndex<ProductProductGroupingMapping>(pagination),
      },
      {
        title: translate('products.productGroupings.productId'),
        key: nameof(dataSource[0].productGrouping.productId),
        dataIndex: nameof(dataSource[0].productGrouping),
        render(productGrouping: ProductGrouping) {
          return productGrouping?.productId;
        },
      },
      {
        title: translate('products.productGroupings.productGroupingId'),
        key: nameof(dataSource[0].productGrouping.productGroupingId),
        dataIndex: nameof(dataSource[0].productGrouping),
        render(productGrouping: ProductGrouping) {
          return productGrouping?.productGroupingId;
        },
      },
    ],
    [dataSource, pagination, translate],
  );

    return (
    <>
      <Table tableLayout="fixed"
             bordered={true}
             size="small"
             columns={columns}
             dataSource={dataSource}
             pagination={pagination}
             rowKey={nameof(productProductGroupingMappings[0].productGroupingId)}
             onChange={handleTableChange}
             title={() => (
               <>
                 <div className="d-flex justify-content-end">
                   <button className="btn btn-sm btn-primary" onClick={handleOpen}>
                     <i className="fa fa-plus mr-2"/>
                     {translate(generalLanguageKeys.actions.add)}
                   </button>
                 </div>
               </>
             )}
      />
      <ProductProductGroupingMappingModal current={ productProductGroupingMappings }
                         list={list}
                         total={total}
                         loading={loading}
                         isOpen={visible}
                         modelFilter={filter}
                         setModelFilter={setFilter}
                         rowSelection={rowSelection}
                         onClose={handleClose}/>
    </>
  );
}
export default ProductProductGroupingMappingTable;
