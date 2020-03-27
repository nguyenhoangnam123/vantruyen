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
import MasterPreview from 'components/MasterPreview/MasterPreview';
import { generalColumnWidths, generalLanguageKeys } from 'config/consts';
import { STORE_GROUPING_ROUTE } from 'config/route-consts';
import { API_STORE_GROUPING_ROUTE } from 'config/api-consts';
import './StoreGroupingMaster.scss';
import { storeGroupingRepository } from 'views/StoreGroupingView/StoreGroupingRepository';
import { StoreGrouping } from 'models/StoreGrouping';
import { StoreGroupingFilter } from 'models/StoreGroupingFilter';

const { Item: FormItem } = Form;

function StoreGroupingMaster() {
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
  ] = crudService.useMaster<StoreGrouping, StoreGroupingFilter>(
    StoreGrouping,
    StoreGroupingFilter,
    storeGroupingRepository.count,
    storeGroupingRepository.list,
    storeGroupingRepository.get,
  );

  const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(STORE_GROUPING_ROUTE);
  const [pagination, sorter, handleTableChange] = tableService.useMasterTable(filter, setFilter, total, handleSearch);
  const [rowSelection, hasSelected] = tableService.useRowSelection<StoreGrouping>();

  /**
   * If import
   */
  const [handleImport] = crudService.useImport(
    storeGroupingRepository.import,
    setLoading,
  );

  /**
   * If export
   */
  const [handleExport] = crudService.useExport(API_STORE_GROUPING_ROUTE);

  const [handleDelete] = tableService.useDeleteHandler<StoreGrouping>(
    storeGroupingRepository.delete,
    setLoading,
    list,
    setList,
    handleSearch,
  );
  const [handleBulkDelete] = tableService.useBulkDeleteHandler(
    rowSelection.selectedRowKeys,
    storeGroupingRepository.bulkDelete,
    setLoading,
    handleSearch,
  );

  const columns: ColumnProps<StoreGrouping>[] = React.useMemo(
    () => {
      return [
        {
          title: translate(generalLanguageKeys.columns.index),
          key: nameof(generalLanguageKeys.index),
          width: generalColumnWidths.index,
          render: renderMasterIndex<StoreGrouping>(pagination),
        },

        {
          title: translate('storeGroupings.code'),
          key: nameof(list[0].code),
          dataIndex: nameof(list[0].code),
          sorter: true,
          sortOrder: getOrderTypeForTable<StoreGrouping>(
            nameof(list[0].code),
            sorter,
          ),

        },

        {
          title: translate('storeGroupings.name'),
          key: nameof(list[0].name),
          dataIndex: nameof(list[0].name),
          sorter: true,
          sortOrder: getOrderTypeForTable<StoreGrouping>(
            nameof(list[0].name),
            sorter,
          ),

        },
        {
          title: translate('storeGroupings.address1'),
          key: nameof(list[0].address1),
          dataIndex: nameof(list[0].address1),
          sorter: true,
          sortOrder: getOrderTypeForTable<StoreGrouping>(
            nameof(list[0].address1),
            sorter,
          ),

        },
        {
          title: translate('storeGroupings.address2'),
          key: nameof(list[0].address2),
          dataIndex: nameof(list[0].address2),
          sorter: true,
          sortOrder: getOrderTypeForTable<StoreGrouping>(
            nameof(list[0].address2),
            sorter,
          ),

        },
        {
          title: translate('storeGroupings.isActive'),
          key: nameof(list[0].isActive),
          dataIndex: nameof(list[0].isActive),
          sorter: true,
          sortOrder: getOrderTypeForTable<StoreGrouping>(
            nameof(list[0].isActive),
            sorter,
          ),
          align: 'center',
          render(isActive: boolean) {
            return (
              <div className={isActive ? 'active' : ''}>
                <i className="fa fa-check-circle d-flex justify-content-center" >
                </i>
              </div>
            );
          },
        },

        {
          title: translate(generalLanguageKeys.actions.label),
          key: nameof(generalLanguageKeys.columns.actions),
          dataIndex: nameof(list[0].id),
          width: generalColumnWidths.actions,
          align: 'center',
          render(id: number, storeGrouping: StoreGrouping) {
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
                  onClick={handleDelete(storeGrouping)}
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
      <Card title={translate('storeGroupings.master.title')}>
        <Card
          className="head-borderless mb-4"
          title={translate(generalLanguageKeys.actions.search)}
        >
          <Form {...formItemLayout}>
            <Row>

              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('storeGroupings.code')}
                >
                  <AdvancedStringFilter
                    filterType={nameof(filter.code.startWith)}
                    filter={filter.code}
                    onChange={handleFilter(nameof(previewModel.code))}
                    className="w-100"
                  />
                </FormItem>
              </Col>

              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('storeGroupings.name')}
                >
                  <AdvancedStringFilter
                    filterType={nameof(filter.name.startWith)}
                    filter={filter.name}
                    onChange={handleFilter(nameof(previewModel.name))}
                    className="w-100"
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
            <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('storeGroupings.address1')}
                >
                  <AdvancedStringFilter
                    filterType={nameof(filter.address1.startWith)}
                    filter={filter.address1}
                    onChange={handleFilter(nameof(previewModel.address1))}
                    className="w-100"
                  />
                </FormItem>
              </Col>
              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('storeGroupings.address2')}
                >
                  <AdvancedStringFilter
                    filterType={nameof(filter.address2.startWith)}
                    filter={filter.address2}
                    onChange={handleFilter(nameof(previewModel.address2))}
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
            <Descriptions title={previewModel.name}>
              <Descriptions.Item label={translate('storeGroupings.code')}>
                {previewModel?.code}
              </Descriptions.Item>
              <Descriptions.Item label={translate('storeGroupings.name')}>
                {previewModel?.name}
              </Descriptions.Item>
              <Descriptions.Item label={translate('storeGroupings.isActive')}>
                {previewModel?.isActive ? <div>Hoạt động</div> : <div>Ngừng hoạt động</div>}
              </Descriptions.Item>
            </Descriptions>
          </Spin>
        </MasterPreview>
      </Card>
    </div>
  );
}

export default StoreGroupingMaster;
