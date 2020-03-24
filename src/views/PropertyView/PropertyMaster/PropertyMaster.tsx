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

import { PROPERTY_ROUTE } from 'config/route-consts';
import { API_PROPERTY_ROUTE } from 'config/api-consts';
import './PropertyMaster.scss';
import { propertyRepository }  from 'views/PropertyView/PropertyRepository';
import { Property } from 'models/Property';
import { PropertyFilter} from 'models/PropertyFilter';


const { Item: FormItem } = Form;

function PropertyMaster() {
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
  ] = crudService.useMaster<Property, PropertyFilter>(
    Property,
    PropertyFilter,
    propertyRepository.count,
    propertyRepository.list,
    propertyRepository.get,
    );

  const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(PROPERTY_ROUTE);
  const [pagination, sorter, handleTableChange] = tableService.useMasterTable(filter, setFilter, total, handleSearch);
  const [rowSelection, hasSelected] = tableService.useRowSelection<Property>();

  /**
   * If import
   */
  const [handleImport] = crudService.useImport(
    propertyRepository.import,
    setLoading,
  );

  /**
   * If export
   */
  const [handleExport] = crudService.useExport(API_PROPERTY_ROUTE);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------------------------------------------------------

   // Delete handlers -------------------------------------------------------------------------------------------------------------------------------
  const [handleDelete] = tableService.useDeleteHandler<Property>(
    propertyRepository.delete,
    setLoading,
    list,
    setList,
  );
  const [handleBulkDelete] = tableService.useBulkDeleteHandler(
    rowSelection.selectedRowKeys,
    propertyRepository.bulkDelete,
    setLoading,
  );
  // ------------------------------------------------------------------------------------------------------------------------------------------------

  const columns: ColumnProps<Property>[] = React.useMemo(
    () => {
      return [
      {
        title: translate(generalLanguageKeys.columns.index),
        key: nameof(generalLanguageKeys.index),
        width: generalColumnWidths.index,
        render: renderMasterIndex<Property>(pagination),
      },

      {
          title: translate('properties.id'),
          key: nameof(list[0].id),
          dataIndex: nameof(list[0].id),
          sorter: true,
          sortOrder: getOrderTypeForTable<Property>(
            nameof(list[0].id),
            sorter,
          ),

      },

      {
          title: translate('properties.code'),
          key: nameof(list[0].code),
          dataIndex: nameof(list[0].code),
          sorter: true,
          sortOrder: getOrderTypeForTable<Property>(
            nameof(list[0].code),
            sorter,
          ),

      },

      {
          title: translate('properties.name'),
          key: nameof(list[0].name),
          dataIndex: nameof(list[0].name),
          sorter: true,
          sortOrder: getOrderTypeForTable<Property>(
            nameof(list[0].name),
            sorter,
          ),

      },

      {
          title: translate('properties.description'),
          key: nameof(list[0].description),
          dataIndex: nameof(list[0].description),
          sorter: true,
          sortOrder: getOrderTypeForTable<Property>(
            nameof(list[0].description),
            sorter,
          ),

      },

      {
          title: translate('properties.propertyTypeId'),
          key: nameof(list[0].propertyTypeId),
          dataIndex: nameof(list[0].propertyTypeId),
          sorter: true,
          sortOrder: getOrderTypeForTable<Property>(
            nameof(list[0].propertyTypeId),
            sorter,
          ),

      },

      {
          title: translate('properties.isSystem'),
          key: nameof(list[0].isSystem),
          dataIndex: nameof(list[0].isSystem),
          sorter: true,
          sortOrder: getOrderTypeForTable<Property>(
            nameof(list[0].isSystem),
            sorter,
          ),

      },

      {
          title: translate('properties.isActive'),
          key: nameof(list[0].isActive),
          dataIndex: nameof(list[0].isActive),
          sorter: true,
          sortOrder: getOrderTypeForTable<Property>(
            nameof(list[0].isActive),
            sorter,
          ),

      },

      {
          title: translate('properties.createdAt'),
          key: nameof(list[0].createdAt),
          dataIndex: nameof(list[0].createdAt),
          sorter: true,
          sortOrder: getOrderTypeForTable<Property>(
            nameof(list[0].createdAt),
            sorter,
          ),

      },

      {
          title: translate('properties.updatedAt'),
          key: nameof(list[0].updatedAt),
          dataIndex: nameof(list[0].updatedAt),
          sorter: true,
          sortOrder: getOrderTypeForTable<Property>(
            nameof(list[0].updatedAt),
            sorter,
          ),

      },

      {
          title: translate('properties.deletedAt'),
          key: nameof(list[0].deletedAt),
          dataIndex: nameof(list[0].deletedAt),
          sorter: true,
          sortOrder: getOrderTypeForTable<Property>(
            nameof(list[0].deletedAt),
            sorter,
          ),

      },

      {
          title: translate('properties.propertyValues'),
          key: nameof(list[0].propertyValues),
          dataIndex: nameof(list[0].propertyValues),
          sorter: true,
          sortOrder: getOrderTypeForTable<Property>(
            nameof(list[0].propertyValues),
            sorter,
          ),

      },

      {
        title: translate(generalLanguageKeys.actions.label),
        key: nameof(generalLanguageKeys.columns.actions),
        dataIndex: nameof(list[0].id),
        width: generalColumnWidths.actions,
        align: 'center',
        render(id: number, property: Property) {
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
                onClick={handleDelete(property)}
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
      <Card title={translate('propertys.master.title')}>
        <Card
          className="head-borderless mb-4"
          title={translate(generalLanguageKeys.actions.search)}
        >
          <Form {...formItemLayout}>
            <Row>

              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('propertys.id')}
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
                  label={translate('propertys.code')}
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
                  label={translate('propertys.name')}
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
                  label={translate('propertys.description')}
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
                  label={translate('propertys.isSystem')}
                >


                </FormItem>
              </Col>



              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('propertys.isActive')}
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

              <Descriptions.Item label={translate('propertys.id')}>
                { previewModel?.id }
              </Descriptions.Item>


              <Descriptions.Item label={translate('propertys.code')}>
                { previewModel?.code }
              </Descriptions.Item>


              <Descriptions.Item label={translate('propertys.name')}>
                { previewModel?.name }
              </Descriptions.Item>


              <Descriptions.Item label={translate('propertys.description')}>
                { previewModel?.description }
              </Descriptions.Item>



              <Descriptions.Item label={translate('propertys.isSystem')}>
                { previewModel?.isSystem }
              </Descriptions.Item>


              <Descriptions.Item label={translate('propertys.isActive')}>
                { previewModel?.isActive }
              </Descriptions.Item>





                          </Descriptions>
          </Spin>
        </MasterPreview>
      </Card>
      </div>
  );
}

export default PropertyMaster;
