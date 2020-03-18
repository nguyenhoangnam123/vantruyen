import React from 'react';
import {ContentTableProps} from 'react3l';
import {crudService, formService} from 'core/services';
import Table, {ColumnProps} from 'antd/lib/table';
import {tableService} from 'services';
import {getOrderTypeForTable, renderMasterIndex} from 'helpers/ant-design/table';
import nameof from 'ts-nameof.macro';
import {useTranslation} from 'react-i18next';
import {generalColumnWidths, generalLanguageKeys} from 'config/consts';
import Form from 'antd/lib/form';
import {formItemLayout} from 'config/ant-design/form';
import {Col, Row} from 'antd/lib/grid';
import AdvancedIdFilter from 'components/AdvancedIdFilter/AdvancedIdFilter';
import CollapsibleCard from 'components/CollapsibleCard/CollapsibleCard';

import { supplierRepository } from 'views/SupplierView/SupplierRepository';
import { Supplier } from 'models/Supplier';
import { Product } from 'models/Product';
import { ProductFilter } from 'models/ProductFilter';
const {Item: FormItem} = Form;

function ProductTable(props: ContentTableProps<Supplier, Product>) {
  const [translate] = useTranslation();

  const {
    model,
    setModel,
  } = props;

  const [
    products,
    setProducts,
    handleAdd,
    handleDelete,
  ] = crudService.useContentTable<Supplier, Product>(
    model,
    setModel,
    nameof(model.products),
  );

  const [
    productFilter,
    setProductFilter,
  ] = React.useState<ProductFilter>(
    new ProductFilter(),
  );

  const [
    dataSource,
    pagination,
    sorter,
    handleTableChange,
    handleFilter,
    handleSearch,
    handleReset,
  ] = tableService.useLocalTable(
    products,
    productFilter,
    setProductFilter,
  );

  const columns: ColumnProps<Product>[] = React.useMemo(
    () => [
      {
        title: translate(generalLanguageKeys.columns.index),
        key: nameof(generalLanguageKeys.columns.index),
        width: generalColumnWidths.index,
        render: renderMasterIndex<Product>(pagination),
      },
      {
        title: translate('products.id'),
        key: nameof(dataSource[0].id),
        dataIndex: nameof(dataSource[0].id),
        render: renderMasterIndex<Product>(pagination),
      },
      {
        title: translate('products.name'),
        key: nameof(dataSource[0].name),
        dataIndex: nameof(dataSource[0].name),
        sorter: true,
        sortOrder: getOrderTypeForTable<Supplier>(nameof(dataSource[0].name), sorter),
        render(name: string, product: Product) {
          return (
            <FormItem validateStatus={formService.getValidationStatus<Product>(product.errors, nameof(product.name))}
                      help={ product.errors?.name }
            >
              <input type="text"
                     className="form-control form-control-sm"
                     name={nameof(name)}
                     defaultValue={name}
              />
            </FormItem>
          );
        },
      },
      {
        title: translate(generalLanguageKeys.actions.label),
        key: nameof(generalLanguageKeys.actions),
        width: generalColumnWidths.actions,
        align: 'center',
        render(...params: [Product, Product, number]) {
          return (
            <>
              <button className="btn btn-link mr-2" onClick={handleDelete(params[2])}>
                <i className="fa fa-trash text-danger"/>
              </button>
            </>
          );
        },
      },
    ],
    [dataSource, handleDelete, pagination, sorter, translate],
  );
    const tableFooter = React.useCallback(
    () => (
      <>
        <button className="btn btn-link" onClick={handleAdd}>
          <i className="fa fa-plus mr-2"/>
          {translate(generalLanguageKeys.actions.create)}
        </button>
      </>
    ),
    [handleAdd, translate],
  );

    return (
    <>
    <CollapsibleCard title={translate(generalLanguageKeys.actions.search)} className="mb-4">
        <Form {...formItemLayout}>
          <Row>
            <Col className="pl-1" span={8}>
              <FormItem className="mb-0" label={translate('suppliers.id')}>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div className="d-flex justify-content-end mt-2">
          <button className="btn btn-sm btn-primary mr-2" onClick={handleSearch}>
            <i className="fa fa-search mr-2"/>
            {translate(generalLanguageKeys.actions.filter)}
          </button>
          <button className="btn btn-sm btn-outline-secondary text-dark" onClick={handleReset}>
            <i className="fa mr-2 fa-times"/>
            {translate(generalLanguageKeys.actions.reset)}
          </button>
        </div>
      </CollapsibleCard>
      <Table pagination={pagination}
             dataSource={dataSource}
             columns={columns}
             onChange={handleTableChange}
             tableLayout="fixed"
             bordered={true}
             size="small"
             footer={tableFooter}
      />
    </>
  );
}

export default ProductTable;
