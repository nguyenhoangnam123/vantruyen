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

import { PRODUCT_GROUPING_ROUTE } from 'config/route-consts';
import { API_PRODUCT_GROUPING_ROUTE } from 'config/api-consts';
import './ProductGroupingMaster.scss';
import { productGroupingRepository }  from 'views/ProductGroupingView/ProductGroupingRepository';
import { ProductGrouping } from 'models/ProductGrouping';
import { ProductGroupingFilter} from 'models/ProductGroupingFilter';


const { Item: FormItem } = Form;

function ProductGroupingMaster() {
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
  ] = crudService.useMaster<ProductGrouping, ProductGroupingFilter>(
    ProductGrouping,
    ProductGroupingFilter,
    productGroupingRepository.count,
    productGroupingRepository.list,
    productGroupingRepository.get,
    );

  const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(PRODUCT_GROUPING_ROUTE);
  const [pagination, sorter, handleTableChange] = tableService.useMasterTable(filter, setFilter, total);
  const [rowSelection, hasSelected] = tableService.useRowSelection<ProductGrouping>();

  /**
   * If import
   */
  const [handleImport] = crudService.useImport(
    productGroupingRepository.import,
    setLoading,
  );

  /**
   * If export
   */
  const [handleExport] = crudService.useExport(API_PRODUCT_GROUPING_ROUTE);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  const [productGroupingFilter, setProductGroupingFilter] = React.useState<ProductGroupingFilter>(new ProductGroupingFilter());

  // ------------------------------------------------------------------------------------------------------------------------------------------------

   // Delete handlers -------------------------------------------------------------------------------------------------------------------------------
  const [handleDelete] = tableService.useDeleteHandler<ProductGrouping>(
    productGroupingRepository.delete,
    setLoading,
    list,
    setList,
  );
  const [handleBulkDelete] = tableService.useBulkDeleteHandler(
    rowSelection.selectedRowKeys,
    productGroupingRepository.bulkDelete,
    setLoading,
  );
  // ------------------------------------------------------------------------------------------------------------------------------------------------

  const columns: ColumnProps<ProductGrouping>[] = React.useMemo(
    () => {
      return [
      {
        title: translate(generalLanguageKeys.columns.index),
        key: nameof(generalLanguageKeys.index),
        width: generalColumnWidths.index,
        render: renderMasterIndex<ProductGrouping>(pagination),
      },

      {
          title: translate('productGroupings.id'),
          key: nameof(list[0].id),
          dataIndex: nameof(list[0].id),
          sorter: true,
          sortOrder: getOrderTypeForTable<ProductGrouping>(
            nameof(list[0].id),
            sorter,
          ),

      },

      {
          title: translate('productGroupings.code'),
          key: nameof(list[0].code),
          dataIndex: nameof(list[0].code),
          sorter: true,
          sortOrder: getOrderTypeForTable<ProductGrouping>(
            nameof(list[0].code),
            sorter,
          ),

      },

      {
          title: translate('productGroupings.name'),
          key: nameof(list[0].name),
          dataIndex: nameof(list[0].name),
          sorter: true,
          sortOrder: getOrderTypeForTable<ProductGrouping>(
            nameof(list[0].name),
            sorter,
          ),

      },

      {
          title: translate('productGroupings.parentId'),
          key: nameof(list[0].parentId),
          dataIndex: nameof(list[0].parentId),
          sorter: true,
          sortOrder: getOrderTypeForTable<ProductGrouping>(
            nameof(list[0].parentId),
            sorter,
          ),

      },

      {
          title: translate('productGroupings.path'),
          key: nameof(list[0].path),
          dataIndex: nameof(list[0].path),
          sorter: true,
          sortOrder: getOrderTypeForTable<ProductGrouping>(
            nameof(list[0].path),
            sorter,
          ),

      },

      {
          title: translate('productGroupings.description'),
          key: nameof(list[0].description),
          dataIndex: nameof(list[0].description),
          sorter: true,
          sortOrder: getOrderTypeForTable<ProductGrouping>(
            nameof(list[0].description),
            sorter,
          ),

      },

      {
          title: translate('productGroupings.isActive'),
          key: nameof(list[0].isActive),
          dataIndex: nameof(list[0].isActive),
          sorter: true,
          sortOrder: getOrderTypeForTable<ProductGrouping>(
            nameof(list[0].isActive),
            sorter,
          ),

      },

      {
          title: translate('productGroupings.createdAt'),
          key: nameof(list[0].createdAt),
          dataIndex: nameof(list[0].createdAt),
          sorter: true,
          sortOrder: getOrderTypeForTable<ProductGrouping>(
            nameof(list[0].createdAt),
            sorter,
          ),

      },

      {
          title: translate('productGroupings.updatedAt'),
          key: nameof(list[0].updatedAt),
          dataIndex: nameof(list[0].updatedAt),
          sorter: true,
          sortOrder: getOrderTypeForTable<ProductGrouping>(
            nameof(list[0].updatedAt),
            sorter,
          ),

      },

      {
          title: translate('productGroupings.deletedAt'),
          key: nameof(list[0].deletedAt),
          dataIndex: nameof(list[0].deletedAt),
          sorter: true,
          sortOrder: getOrderTypeForTable<ProductGrouping>(
            nameof(list[0].deletedAt),
            sorter,
          ),

      },

      {
          title: translate('productGroupings.parent'),
          key: nameof(list[0].parent),
          dataIndex: nameof(list[0].parent),
          sorter: true,
          sortOrder: getOrderTypeForTable<ProductGrouping>(
            nameof(list[0].parent),
            sorter,
          ),

      },

      {
          title: translate('productGroupings.inverseParent'),
          key: nameof(list[0].inverseParent),
          dataIndex: nameof(list[0].inverseParent),
          sorter: true,
          sortOrder: getOrderTypeForTable<ProductGrouping>(
            nameof(list[0].inverseParent),
            sorter,
          ),

      },

      {
          title: translate('productGroupings.products'),
          key: nameof(list[0].products),
          dataIndex: nameof(list[0].products),
          sorter: true,
          sortOrder: getOrderTypeForTable<ProductGrouping>(
            nameof(list[0].products),
            sorter,
          ),

      },

      {
        title: translate(generalLanguageKeys.actions.label),
        key: nameof(generalLanguageKeys.columns.actions),
        dataIndex: nameof(list[0].id),
        width: generalColumnWidths.actions,
        align: 'center',
        render(id: number, productGrouping: ProductGrouping) {
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
                onClick={handleDelete(productGrouping)}
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
      <Card title={translate('productGroupings.master.title')}>
        <Card
          className="head-borderless mb-4"
          title={translate(generalLanguageKeys.actions.search)}
        >
          <Form {...formItemLayout}>
            <Row>

              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('productGroupings.id')}
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
                  label={translate('productGroupings.code')}
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
                  label={translate('productGroupings.name')}
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
                  label={translate('productGroupings.path')}
                >
                    <AdvancedStringFilter
                      filterType={nameof(filter.path.startWith)}
                      filter={filter.id}
                      onChange={handleFilter(nameof(previewModel.id))}
                      className="w-100"
                    />


                </FormItem>
              </Col>



              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('productGroupings.description')}
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
                  label={translate('productGroupings.isActive')}
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

              <Descriptions.Item label={translate('productGroupings.id')}>
                { previewModel?.id }
              </Descriptions.Item>


              <Descriptions.Item label={translate('productGroupings.code')}>
                { previewModel?.code }
              </Descriptions.Item>


              <Descriptions.Item label={translate('productGroupings.name')}>
                { previewModel?.name }
              </Descriptions.Item>



              <Descriptions.Item label={translate('productGroupings.path')}>
                { previewModel?.path }
              </Descriptions.Item>


              <Descriptions.Item label={translate('productGroupings.description')}>
                { previewModel?.description }
              </Descriptions.Item>


              <Descriptions.Item label={translate('productGroupings.isActive')}>
                { previewModel?.isActive }
              </Descriptions.Item>







                          </Descriptions>
          </Spin>
        </MasterPreview>
      </Card>
      </div>
  );
}

export default ProductGroupingMaster;
