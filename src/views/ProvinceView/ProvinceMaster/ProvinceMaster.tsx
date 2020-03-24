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
import AdvancedNumberFilter from 'components/AdvancedNumberFilter/AdvancedNumberFilter';
import MasterPreview from 'components/MasterPreview/MasterPreview';
import { generalColumnWidths, generalLanguageKeys } from 'config/consts';
import { PROVINCE_ROUTE } from 'config/route-consts';
import { API_PROVINCE_ROUTE } from 'config/api-consts';
import './ProvinceMaster.scss';
import { provinceRepository } from 'views/ProvinceView/ProvinceRepository';
import { Province } from 'models/Province';
import { ProvinceFilter } from 'models/ProvinceFilter';

const { Item: FormItem } = Form;

function ProvinceMaster() {
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
  ] = crudService.useMaster<Province, ProvinceFilter>(
    Province,
    ProvinceFilter,
    provinceRepository.count,
    provinceRepository.list,
    provinceRepository.get,
  );

  const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(PROVINCE_ROUTE);
  const [pagination, sorter, handleTableChange] = tableService.useMasterTable(filter, setFilter, total, handleSearch);
  const [rowSelection, hasSelected] = tableService.useRowSelection<Province>();

  /**
   * If import
   */
  const [handleImport] = crudService.useImport(
    provinceRepository.import,
    setLoading,
  );

  /**
   * If export
   */
  const [handleExport] = crudService.useExport(API_PROVINCE_ROUTE);

  const [handleDelete] = tableService.useDeleteHandler<Province>(
    provinceRepository.delete,
    setLoading,
    list,
    setList,
    handleSearch,
  );
  const [handleBulkDelete] = tableService.useBulkDeleteHandler(
    rowSelection.selectedRowKeys,
    provinceRepository.bulkDelete,
    setLoading,
    handleSearch,
  );
  // ------------------------------------------------------------------------------------------------------------------------------------------------

  const columns: ColumnProps<Province>[] = React.useMemo(
    () => {
      return [
        {
          title: translate(generalLanguageKeys.columns.index),
          key: nameof(generalLanguageKeys.index),
          width: generalColumnWidths.index,
          render: renderMasterIndex<Province>(pagination),
        },
        {
          title: translate('provinces.name'),
          key: nameof(list[0].name),
          dataIndex: nameof(list[0].name),
          sorter: true,
          sortOrder: getOrderTypeForTable<Province>(
            nameof(list[0].name),
            sorter,
          ),

        },

        {
          title: translate('provinces.priority'),
          key: nameof(list[0].priority),
          dataIndex: nameof(list[0].priority),
          sorter: true,
          sortOrder: getOrderTypeForTable<Province>(
            nameof(list[0].priority),
            sorter,
          ),

        },
        {
          title: translate(generalLanguageKeys.actions.label),
          key: nameof(generalLanguageKeys.columns.actions),
          dataIndex: nameof(list[0].id),
          width: generalColumnWidths.actions,
          align: 'center',
          render(id: number, province: Province) {
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
                  onClick={handleDelete(province)}
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
      <Card title={translate('provinces.master.title')}>
        <Card
          className="head-borderless mb-4"
          title={translate(generalLanguageKeys.actions.search)}
        >
          <Form {...formItemLayout}>
            <Row>
              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('provinces.name')}
                >
                  <AdvancedStringFilter
                    filterType={nameof(filter.name.startWith)}
                    filter={filter.name}
                    onChange={handleFilter(nameof(filter.name))}
                    className="w-100"
                  />
                </FormItem>
              </Col>
              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('provinces.priority')}
                >
                  <AdvancedNumberFilter
                    filterType={nameof(filter.priority.equal)}
                    filter={filter.priority}
                    onChange={handleFilter(nameof(filter.priority))}
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
            <Descriptions title={previewModel.name} >
              <Descriptions.Item label={translate('provinces.id')}>
                {previewModel?.id}
              </Descriptions.Item>
              <Descriptions.Item label={translate('provinces.name')}>
                {previewModel?.name}
              </Descriptions.Item>
              <Descriptions.Item label={translate('provinces.priority')}>
                {previewModel?.priority}
              </Descriptions.Item>
            </Descriptions>
          </Spin>
        </MasterPreview>
      </Card>
    </div>
  );
}

export default ProvinceMaster;
