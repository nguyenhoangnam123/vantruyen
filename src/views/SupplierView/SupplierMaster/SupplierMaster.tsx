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

import { SUPPLIER_ROUTE } from 'config/route-consts';
import { API_SUPPLIER_ROUTE } from 'config/api-consts';
import './SupplierMaster.scss';
import { supplierRepository }  from 'views/SupplierView/SupplierRepository';
import { Supplier } from 'models/Supplier';
import { SupplierFilter} from 'models/SupplierFilter';


const { Item: FormItem } = Form;

function SupplierMaster() {
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
  ] = crudService.useMaster<Supplier, SupplierFilter>(
    Supplier,
    SupplierFilter,
    supplierRepository.count,
    supplierRepository.list,
    supplierRepository.get,
    );

  const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(SUPPLIER_ROUTE);
  const [pagination, sorter, handleTableChange] = tableService.useMasterTable(filter, setFilter, total);
  const [rowSelection, hasSelected] = tableService.useRowSelection<Supplier>();

  /**
   * If import
   */
  const [handleImport] = crudService.useImport(
    supplierRepository.import,
    setLoading,
  );

  /**
   * If export
   */
  const [handleExport] = crudService.useExport(API_SUPPLIER_ROUTE);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------------------------------------------------------

   // Delete handlers -------------------------------------------------------------------------------------------------------------------------------
  const [handleDelete] = tableService.useDeleteHandler<Supplier>(
    supplierRepository.delete,
    setLoading,
    list,
    setList,
  );
  const [handleBulkDelete] = tableService.useBulkDeleteHandler(
    rowSelection.selectedRowKeys,
    supplierRepository.bulkDelete,
    setLoading,
  );
  // ------------------------------------------------------------------------------------------------------------------------------------------------

  const columns: ColumnProps<Supplier>[] = React.useMemo(
    () => {
      return [
      {
        title: translate(generalLanguageKeys.columns.index),
        key: nameof(generalLanguageKeys.index),
        width: generalColumnWidths.index,
        render: renderMasterIndex<Supplier>(pagination),
      },

      {
          title: translate('suppliers.id'),
          key: nameof(list[0].id),
          dataIndex: nameof(list[0].id),
          sorter: true,
          sortOrder: getOrderTypeForTable<Supplier>(
            nameof(list[0].id),
            sorter,
          ),

      },

      {
          title: translate('suppliers.code'),
          key: nameof(list[0].code),
          dataIndex: nameof(list[0].code),
          sorter: true,
          sortOrder: getOrderTypeForTable<Supplier>(
            nameof(list[0].code),
            sorter,
          ),

      },

      {
          title: translate('suppliers.name'),
          key: nameof(list[0].name),
          dataIndex: nameof(list[0].name),
          sorter: true,
          sortOrder: getOrderTypeForTable<Supplier>(
            nameof(list[0].name),
            sorter,
          ),

      },

      {
          title: translate('suppliers.taxCode'),
          key: nameof(list[0].taxCode),
          dataIndex: nameof(list[0].taxCode),
          sorter: true,
          sortOrder: getOrderTypeForTable<Supplier>(
            nameof(list[0].taxCode),
            sorter,
          ),

      },

      {
          title: translate('suppliers.createdAt'),
          key: nameof(list[0].createdAt),
          dataIndex: nameof(list[0].createdAt),
          sorter: true,
          sortOrder: getOrderTypeForTable<Supplier>(
            nameof(list[0].createdAt),
            sorter,
          ),

      },

      {
          title: translate('suppliers.updatedAt'),
          key: nameof(list[0].updatedAt),
          dataIndex: nameof(list[0].updatedAt),
          sorter: true,
          sortOrder: getOrderTypeForTable<Supplier>(
            nameof(list[0].updatedAt),
            sorter,
          ),

      },

      {
          title: translate('suppliers.deletedAt'),
          key: nameof(list[0].deletedAt),
          dataIndex: nameof(list[0].deletedAt),
          sorter: true,
          sortOrder: getOrderTypeForTable<Supplier>(
            nameof(list[0].deletedAt),
            sorter,
          ),

      },

      {
          title: translate('suppliers.products'),
          key: nameof(list[0].products),
          dataIndex: nameof(list[0].products),
          sorter: true,
          sortOrder: getOrderTypeForTable<Supplier>(
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
        render(id: number, supplier: Supplier) {
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
                onClick={handleDelete(supplier)}
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
      <Card title={translate('suppliers.master.title')}>
        <Card
          className="head-borderless mb-4"
          title={translate(generalLanguageKeys.actions.search)}
        >
          <Form {...formItemLayout}>
            <Row>

              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('suppliers.id')}
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
                  label={translate('suppliers.code')}
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
                  label={translate('suppliers.name')}
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
                  label={translate('suppliers.taxCode')}
                >
                    <AdvancedStringFilter
                      filterType={nameof(filter.taxCode.startWith)}
                      filter={filter.id}
                      onChange={handleFilter(nameof(previewModel.id))}
                      className="w-100"
                    />


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

              <Descriptions.Item label={translate('suppliers.id')}>
                { previewModel?.id }
              </Descriptions.Item>


              <Descriptions.Item label={translate('suppliers.code')}>
                { previewModel?.code }
              </Descriptions.Item>


              <Descriptions.Item label={translate('suppliers.name')}>
                { previewModel?.name }
              </Descriptions.Item>


              <Descriptions.Item label={translate('suppliers.taxCode')}>
                { previewModel?.taxCode }
              </Descriptions.Item>





                          </Descriptions>
          </Spin>
        </MasterPreview>
      </Card>
      </div>
  );
}

export default SupplierMaster;
