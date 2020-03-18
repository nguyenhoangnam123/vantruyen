import React from 'react';
import Card from 'antd/lib/card';
import Spin from 'antd/lib/spin';
import Form from 'antd/lib/form';
import Table, { ColumnProps } from 'antd/lib/table';
import { Col, Row } from 'antd/lib/grid';
import Descriptions from 'antd/lib/descriptions';
import { crudService, routerService } from 'core/services';
import {
  getOrderTypeForTable,
  renderMasterIndex,
} from 'helpers/ant-design/table';
import { useTranslation } from 'react-i18next';
import nameof from 'ts-nameof.macro';
import { tableService } from 'services';
import { formItemLayout } from 'config/ant-design/form';
import AdvancedStringFilter from 'components/AdvancedStringFilter/AdvancedStringFilter';
import AdvancedIdFilter from 'components/AdvancedIdFilter/AdvancedIdFilter';
import AdvancedNumberFilter from 'components/AdvancedNumberFilter/AdvancedNumberFilter';
import MasterPreview from 'components/MasterPreview/MasterPreview';
import { generalColumnWidths, generalLanguageKeys } from 'config/consts';

import { PRODUCT_ROUTE } from 'config/route-consts';
import { API_PRODUCT_ROUTE } from 'config/api-consts';
import './ProductMaster.scss';
import { productRepository }  from 'views/ProductView/ProductRepository';
import { Product } from 'models/Product';
import { ProductFilter} from 'models/ProductFilter';


const { Item: FormItem } = Form;

function ProductMaster() {
  const [translate] = useTranslation();

  const [
    filter,
    setFilter,
    list,
    setList,
    loading,
    setLoading,
    total,
    previewLoading,
    previewVisible,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
    handleFilter,
    handleSearch,
    handleReset,
  ] = crudService.useMaster<Product, ProductFilter>(
    Product,
    ProductFilter,
    productRepository.count,
    productRepository.list,
    productRepository.get,
    );

  const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(PRODUCT_ROUTE);
  const [pagination, sorter, handleTableChange] = tableService.useMasterTable(filter, setFilter, total);
  const [rowSelection, hasSelected] = tableService.useRowSelection<Product>();

  /**
   * If import
   */
  const [handleImport] = crudService.useImport(
    productRepository.import,
    setLoading,
  );

  /**
   * If export
   */
  const [handleExport] = crudService.useExport(API_PRODUCT_ROUTE);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  const [brandFilter, setBrandFilter] = React.useState<ProductFilter>(new ProductFilter());

  const [productGroupingFilter, setProductGroupingFilter] = React.useState<ProductFilter>(new ProductFilter());

  const [productTypeFilter, setProductTypeFilter] = React.useState<ProductFilter>(new ProductFilter());

  const [supplierFilter, setSupplierFilter] = React.useState<ProductFilter>(new ProductFilter());

  const [taxTypeFilter, setTaxTypeFilter] = React.useState<ProductFilter>(new ProductFilter());

  const [unitOfMeasureFilter, setUnitOfMeasureFilter] = React.useState<ProductFilter>(new ProductFilter());

  // ------------------------------------------------------------------------------------------------------------------------------------------------

   // Delete handlers -------------------------------------------------------------------------------------------------------------------------------
  const [handleDelete] = tableService.useDeleteHandler<Product>(
    productRepository.delete,
    setLoading,
    list,
    setList,
  );
  const [handleBulkDelete] = tableService.useBulkDeleteHandler(
    rowSelection.selectedRowKeys,
    productRepository.bulkDelete,
    setLoading,
  );
  // ------------------------------------------------------------------------------------------------------------------------------------------------

  const columns: ColumnProps<Product>[] = React.useMemo(
    () => {
      return [
      {
        title: translate(generalLanguageKeys.columns.index),
        key: nameof(generalLanguageKeys.index),
        width: generalColumnWidths.index,
        render: renderMasterIndex<Product>(pagination),
      },

      {
          title: translate('products.id'),
          key: nameof(list[0].id),
          dataIndex: nameof(list[0].id),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].id),
            sorter,
          ),

      },

      {
          title: translate('products.code'),
          key: nameof(list[0].code),
          dataIndex: nameof(list[0].code),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].code),
            sorter,
          ),

      },

      {
          title: translate('products.supplierCode'),
          key: nameof(list[0].supplierCode),
          dataIndex: nameof(list[0].supplierCode),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].supplierCode),
            sorter,
          ),

      },

      {
          title: translate('products.name'),
          key: nameof(list[0].name),
          dataIndex: nameof(list[0].name),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].name),
            sorter,
          ),

      },

      {
          title: translate('products.description'),
          key: nameof(list[0].description),
          dataIndex: nameof(list[0].description),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].description),
            sorter,
          ),

      },

      {
          title: translate('products.scanCode'),
          key: nameof(list[0].scanCode),
          dataIndex: nameof(list[0].scanCode),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].scanCode),
            sorter,
          ),

      },

      {
          title: translate('products.productGroupingId'),
          key: nameof(list[0].productGroupingId),
          dataIndex: nameof(list[0].productGroupingId),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].productGroupingId),
            sorter,
          ),

      },

      {
          title: translate('products.productTypeId'),
          key: nameof(list[0].productTypeId),
          dataIndex: nameof(list[0].productTypeId),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].productTypeId),
            sorter,
          ),

      },

      {
          title: translate('products.supplierId'),
          key: nameof(list[0].supplierId),
          dataIndex: nameof(list[0].supplierId),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].supplierId),
            sorter,
          ),

      },

      {
          title: translate('products.brandId'),
          key: nameof(list[0].brandId),
          dataIndex: nameof(list[0].brandId),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].brandId),
            sorter,
          ),

      },

      {
          title: translate('products.unitOfMeasureId'),
          key: nameof(list[0].unitOfMeasureId),
          dataIndex: nameof(list[0].unitOfMeasureId),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].unitOfMeasureId),
            sorter,
          ),

      },

      {
          title: translate('products.salePrice'),
          key: nameof(list[0].salePrice),
          dataIndex: nameof(list[0].salePrice),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].salePrice),
            sorter,
          ),

      },

      {
          title: translate('products.retailPrice'),
          key: nameof(list[0].retailPrice),
          dataIndex: nameof(list[0].retailPrice),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].retailPrice),
            sorter,
          ),

      },

      {
          title: translate('products.taxTypeId'),
          key: nameof(list[0].taxTypeId),
          dataIndex: nameof(list[0].taxTypeId),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].taxTypeId),
            sorter,
          ),

      },

      {
          title: translate('products.isActive'),
          key: nameof(list[0].isActive),
          dataIndex: nameof(list[0].isActive),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].isActive),
            sorter,
          ),

      },

      {
          title: translate('products.createdAt'),
          key: nameof(list[0].createdAt),
          dataIndex: nameof(list[0].createdAt),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].createdAt),
            sorter,
          ),

      },

      {
          title: translate('products.updatedAt'),
          key: nameof(list[0].updatedAt),
          dataIndex: nameof(list[0].updatedAt),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].updatedAt),
            sorter,
          ),

      },

      {
          title: translate('products.deletedAt'),
          key: nameof(list[0].deletedAt),
          dataIndex: nameof(list[0].deletedAt),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].deletedAt),
            sorter,
          ),

      },

      {
          title: translate('products.brand'),
          key: nameof(list[0].brand),
          dataIndex: nameof(list[0].brand),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].brand),
            sorter,
          ),

      },

      {
          title: translate('products.productGrouping'),
          key: nameof(list[0].productGrouping),
          dataIndex: nameof(list[0].productGrouping),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].productGrouping),
            sorter,
          ),

      },

      {
          title: translate('products.productType'),
          key: nameof(list[0].productType),
          dataIndex: nameof(list[0].productType),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].productType),
            sorter,
          ),

      },

      {
          title: translate('products.supplier'),
          key: nameof(list[0].supplier),
          dataIndex: nameof(list[0].supplier),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].supplier),
            sorter,
          ),

      },

      {
          title: translate('products.taxType'),
          key: nameof(list[0].taxType),
          dataIndex: nameof(list[0].taxType),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].taxType),
            sorter,
          ),

      },

      {
          title: translate('products.unitOfMeasure'),
          key: nameof(list[0].unitOfMeasure),
          dataIndex: nameof(list[0].unitOfMeasure),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].unitOfMeasure),
            sorter,
          ),

      },

      {
          title: translate('products.items'),
          key: nameof(list[0].items),
          dataIndex: nameof(list[0].items),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].items),
            sorter,
          ),

      },

      {
          title: translate('products.variationGroupings'),
          key: nameof(list[0].variationGroupings),
          dataIndex: nameof(list[0].variationGroupings),
          sorter: true,
          sortOrder: getOrderTypeForTable<Product>(
            nameof(list[0].variationGroupings),
            sorter,
          ),

      },

      {
        title: translate(generalLanguageKeys.actions.label),
        key: nameof(generalLanguageKeys.columns.actions),
        dataIndex: nameof(list[0].id),
        width: generalColumnWidths.actions,
        align: 'center',
        render(id: number, product: Product) {
          return (
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-sm btn-link text-warning"
                onClick={handleOpenPreview(id)}
              >
                <i className="fa fa-eye" />
              </button>
              <button
                className="btn btn-sm btn-link"
                onClick={handleGoDetail(id)}
              >
                <i className="fa fa-edit" />
              </button>
              <button
                className="btn btn-sm btn-link text-danger"
                onClick={handleDelete(product)}
              >
                <i className="fa fa-trash" />
              </button>
            </div>
          );
        },
      },
      ];
    },
    // tslint:disable-next-line:max-line-length
    [
      handleDelete,
      handleGoDetail,
      handleOpenPreview,
      list,
      pagination,
      sorter,
      translate],
  );

  return (
    <div className="page master-page">
      <Card title={translate('products.master.title')}>
        <Card
          className="head-borderless mb-4"
          title={translate(generalLanguageKeys.actions.search)}
        >
          <Form {...formItemLayout}>
            <Row>

              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('products.id')}
                >


                    <AdvancedIdFilter
                      filterType={nameof(filter.id.equal)}
                      filter={ filter.id }
                      onChange={handleFilter(nameof(filter.id))}
                      className="w-100"
                    />
                </FormItem>
              </Col>



              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('products.code')}
                >
                    <AdvancedStringFilter
                      filterType={nameof(filter.code.startWith)}
                      filter={filter.id}
                      onChange={handleFilter(nameof(previewModel.id))}
                      className="w-100"
                    />


                </FormItem>
              </Col>



              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('products.supplierCode')}
                >
                    <AdvancedStringFilter
                      filterType={nameof(filter.supplierCode.startWith)}
                      filter={filter.id}
                      onChange={handleFilter(nameof(previewModel.id))}
                      className="w-100"
                    />


                </FormItem>
              </Col>



              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('products.name')}
                >
                    <AdvancedStringFilter
                      filterType={nameof(filter.name.startWith)}
                      filter={filter.id}
                      onChange={handleFilter(nameof(previewModel.id))}
                      className="w-100"
                    />


                </FormItem>
              </Col>



              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('products.description')}
                >
                    <AdvancedStringFilter
                      filterType={nameof(filter.description.startWith)}
                      filter={filter.id}
                      onChange={handleFilter(nameof(previewModel.id))}
                      className="w-100"
                    />


                </FormItem>
              </Col>



              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('products.scanCode')}
                >
                    {/* <AdvancedStringFilter
                      filterType={nameof(filter.scanCode.startWith)}
                      filter={filter.id}
                      onChange={handleFilter(nameof(previewModel.id))}
                      className="w-100"
                    /> */}


                </FormItem>
              </Col>













              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('products.salePrice')}
                >

                    {/* <AdvancedNumberFilter
                      filterType={nameof(filter.salePrice.equal)}
                      filter={ filter.salePrice }
                      onChange={handleFilter(nameof(filter.salePrice))}
                      className="w-100"
                    /> */}

                </FormItem>
              </Col>



              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('products.retailPrice')}
                >

                    {/* <AdvancedNumberFilter
                      filterType={nameof(filter.retailPrice.equal)}
                      filter={ filter.retailPrice }
                      onChange={handleFilter(nameof(filter.retailPrice))}
                      className="w-100"
                    /> */}

                </FormItem>
              </Col>





              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('products.isActive')}
                >


                </FormItem>
              </Col>


























            </Row>
          </Form>
          <div className="d-flex justify-content-end mt-2">
            <button
              className="btn btn-sm btn-primary mr-2"
              onClick={handleSearch}
            >
              {translate(generalLanguageKeys.actions.filter)}
            </button>
            <button
              className="btn btn-sm btn-outline-secondary text-dark"
              onClick={handleReset}
            >
              <i className="fa mr-2 fa-times" />
              {translate(generalLanguageKeys.actions.reset)}
            </button>
          </div>
        </Card>
        <Table
          dataSource={list}
          columns={columns}
          bordered
          size="small"
          tableLayout="fixed"
          loading={loading}
          rowKey={nameof(previewModel.id)}
          pagination={pagination}
          rowSelection={rowSelection}
          onChange={handleTableChange}
          title={() => (
            <>
              <div className="d-flex justify-content-between">
                <div className="flex-shrink-1 d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-primary mr-2"
                    onClick={handleGoCreate}
                  >
                    <i className="fa mr-2 fa-plus" />
                    {translate(generalLanguageKeys.actions.create)}
                  </button>
                  <button
                    className="btn btn-sm btn-danger mr-2"
                    disabled={!hasSelected}
                    onClick={handleBulkDelete}
                  >
                    <i className="fa mr-2 fa-trash" />
                    {translate(generalLanguageKeys.actions.delete)}
                  </button>
                  <label
                    className="btn btn-sm btn-outline-primary mr-2 mb-0"
                    htmlFor="master-import"
                  >
                    <i className="fa mr-2 fa-upload" />
                    {translate(generalLanguageKeys.actions.import)}
                  </label>
                  <button
                    className="btn btn-sm btn-outline-primary mr-2"
                    onClick={handleExport}
                  >
                    <i className="fa mr-2 fa-download" />
                    {translate(generalLanguageKeys.actions.export)}
                  </button>
                </div>
                <div className="flex-shrink-1 d-flex align-items-center">
                  {translate('general.master.pagination', {
                    pageSize: pagination.pageSize,
                    total,
                  })}
                </div>
              </div>
            </>
          )}
        />
        <input
          type="file"
          className="hidden"
          id="master-import"
          onChange={handleImport}
        />
        <MasterPreview
          isOpen={previewVisible}
          onClose={handleClosePreview}
          size="xl"
        >
          <Spin spinning={previewLoading}>
            <Descriptions title={previewModel.name} bordered>

              <Descriptions.Item label={translate('products.id')}>
                { previewModel?.id }
              </Descriptions.Item>


              <Descriptions.Item label={translate('products.code')}>
                { previewModel?.code }
              </Descriptions.Item>


              <Descriptions.Item label={translate('products.supplierCode')}>
                { previewModel?.supplierCode }
              </Descriptions.Item>


              <Descriptions.Item label={translate('products.name')}>
                { previewModel?.name }
              </Descriptions.Item>


              <Descriptions.Item label={translate('products.description')}>
                { previewModel?.description }
              </Descriptions.Item>


              <Descriptions.Item label={translate('products.scanCode')}>
                { previewModel?.scanCode }
              </Descriptions.Item>







              <Descriptions.Item label={translate('products.salePrice')}>
                { previewModel?.salePrice }
              </Descriptions.Item>


              <Descriptions.Item label={translate('products.retailPrice')}>
                { previewModel?.retailPrice }
              </Descriptions.Item>



              <Descriptions.Item label={translate('products.isActive')}>
                { previewModel?.isActive }
              </Descriptions.Item>













                          </Descriptions>
          </Spin>
        </MasterPreview>
      </Card>
      </div>
  );
}

export default ProductMaster;
