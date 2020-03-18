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

import { UNIT_OF_MEASURE_GROUPING_CONTENT_ROUTE } from 'config/route-consts';
import { API_UNIT_OF_MEASURE_GROUPING_CONTENT_ROUTE } from 'config/api-consts';
import './UnitOfMeasureGroupingContentMaster.scss';
import { unitOfMeasureGroupingContentRepository }  from 'views/UnitOfMeasureGroupingContentView/UnitOfMeasureGroupingContentRepository';
import { UnitOfMeasureGroupingContent } from 'models/UnitOfMeasureGroupingContent';
import { UnitOfMeasureGroupingContentFilter} from 'models/UnitOfMeasureGroupingContentFilter';


const { Item: FormItem } = Form;

function UnitOfMeasureGroupingContentMaster() {
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
  ] = crudService.useMaster<UnitOfMeasureGroupingContent, UnitOfMeasureGroupingContentFilter>(
    UnitOfMeasureGroupingContent,
    UnitOfMeasureGroupingContentFilter,
    unitOfMeasureGroupingContentRepository.count,
    unitOfMeasureGroupingContentRepository.list,
    unitOfMeasureGroupingContentRepository.get,
    );

  const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(UNIT_OF_MEASURE_GROUPING_CONTENT_ROUTE);
  const [pagination, sorter, handleTableChange] = tableService.useMasterTable(filter, setFilter, total);
  const [rowSelection, hasSelected] = tableService.useRowSelection<UnitOfMeasureGroupingContent>();

  /**
   * If import
   */
  const [handleImport] = crudService.useImport(
    unitOfMeasureGroupingContentRepository.import,
    setLoading,
  );

  /**
   * If export
   */
  const [handleExport] = crudService.useExport(API_UNIT_OF_MEASURE_GROUPING_CONTENT_ROUTE);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  const [unitOfMeasureFilter, setUnitOfMeasureFilter] = React.useState<UnitOfMeasureGroupingContentFilter>(new UnitOfMeasureGroupingContentFilter());

  const [unitOfMeasureGroupingFilter, setUnitOfMeasureGroupingFilter] = React.useState<UnitOfMeasureGroupingContentFilter>(new UnitOfMeasureGroupingContentFilter());

  // ------------------------------------------------------------------------------------------------------------------------------------------------

   // Delete handlers -------------------------------------------------------------------------------------------------------------------------------
  const [handleDelete] = tableService.useDeleteHandler<UnitOfMeasureGroupingContent>(
    unitOfMeasureGroupingContentRepository.delete,
    setLoading,
    list,
    setList,
  );
  const [handleBulkDelete] = tableService.useBulkDeleteHandler(
    rowSelection.selectedRowKeys,
    unitOfMeasureGroupingContentRepository.bulkDelete,
    setLoading,
  );
  // ------------------------------------------------------------------------------------------------------------------------------------------------

  const columns: ColumnProps<UnitOfMeasureGroupingContent>[] = React.useMemo(
    () => {
      return [
      {
        title: translate(generalLanguageKeys.columns.index),
        key: nameof(generalLanguageKeys.index),
        width: generalColumnWidths.index,
        render: renderMasterIndex<UnitOfMeasureGroupingContent>(pagination),
      },

      {
          title: translate('unitOfMeasureGroupingContents.id'),
          key: nameof(list[0].id),
          dataIndex: nameof(list[0].id),
          sorter: true,
          sortOrder: getOrderTypeForTable<UnitOfMeasureGroupingContent>(
            nameof(list[0].id),
            sorter,
          ),

      },

      {
          title: translate('unitOfMeasureGroupingContents.unitOfMeasureGroupingId'),
          key: nameof(list[0].unitOfMeasureGroupingId),
          dataIndex: nameof(list[0].unitOfMeasureGroupingId),
          sorter: true,
          sortOrder: getOrderTypeForTable<UnitOfMeasureGroupingContent>(
            nameof(list[0].unitOfMeasureGroupingId),
            sorter,
          ),

      },

      {
          title: translate('unitOfMeasureGroupingContents.unitOfMeasureId'),
          key: nameof(list[0].unitOfMeasureId),
          dataIndex: nameof(list[0].unitOfMeasureId),
          sorter: true,
          sortOrder: getOrderTypeForTable<UnitOfMeasureGroupingContent>(
            nameof(list[0].unitOfMeasureId),
            sorter,
          ),

      },

      {
          title: translate('unitOfMeasureGroupingContents.factor'),
          key: nameof(list[0].factor),
          dataIndex: nameof(list[0].factor),
          sorter: true,
          sortOrder: getOrderTypeForTable<UnitOfMeasureGroupingContent>(
            nameof(list[0].factor),
            sorter,
          ),

      },

      {
          title: translate('unitOfMeasureGroupingContents.unitOfMeasure'),
          key: nameof(list[0].unitOfMeasure),
          dataIndex: nameof(list[0].unitOfMeasure),
          sorter: true,
          sortOrder: getOrderTypeForTable<UnitOfMeasureGroupingContent>(
            nameof(list[0].unitOfMeasure),
            sorter,
          ),

      },

      {
          title: translate('unitOfMeasureGroupingContents.unitOfMeasureGrouping'),
          key: nameof(list[0].unitOfMeasureGrouping),
          dataIndex: nameof(list[0].unitOfMeasureGrouping),
          sorter: true,
          sortOrder: getOrderTypeForTable<UnitOfMeasureGroupingContent>(
            nameof(list[0].unitOfMeasureGrouping),
            sorter,
          ),

      },

      {
        title: translate(generalLanguageKeys.actions.label),
        key: nameof(generalLanguageKeys.columns.actions),
        dataIndex: nameof(list[0].id),
        width: generalColumnWidths.actions,
        align: 'center',
        render(id: number, unitOfMeasureGroupingContent: UnitOfMeasureGroupingContent) {
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
                onClick={handleDelete(unitOfMeasureGroupingContent)}
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
      <Card title={translate('unitOfMeasureGroupingContents.master.title')}>
        <Card
          className="head-borderless mb-4"
          title={translate(generalLanguageKeys.actions.search)}
        >
          <Form {...formItemLayout}>
            <Row>

              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('unitOfMeasureGroupingContents.id')}
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
                  label={translate('unitOfMeasureGroupingContents.factor')}
                >

                    <AdvancedNumberFilter
                      filterType={nameof(filter.factor.equal)}
                      filter={ filter.factor }
                      onChange={handleFilter(nameof(filter.factor))}
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

              <Descriptions.Item label={translate('unitOfMeasureGroupingContents.id')}>
                { previewModel?.id }
              </Descriptions.Item>




              <Descriptions.Item label={translate('unitOfMeasureGroupingContents.factor')}>
                { previewModel?.factor }
              </Descriptions.Item>



                          </Descriptions>
          </Spin>
        </MasterPreview>
      </Card>
      </div>
  );
}

export default UnitOfMeasureGroupingContentMaster;
