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
  renderMasterIndex
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

import { VIEW_ROUTE } from 'config/route-consts';
import { API_VIEW_ROUTE } from 'config/api-consts';
import './ViewMaster.scss';
import { viewRepository }  from 'views/ViewView/ViewRepository';
import { View } from 'models/View';
import { ViewFilter} from 'models/ViewFilter';


const { Item: FormItem } = Form;

function ViewMaster() {
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
  ] = crudService.useMaster<View, ViewFilter>(
    View,
    ViewFilter,
    viewRepository.count,
    viewRepository.list,
    viewRepository.get,
    );
  
  const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(VIEW_ROUTE);
  const [pagination, sorter, handleTableChange] = tableService.useMasterTable(filter, setFilter, total);
  const [rowSelection, hasSelected] = tableService.useRowSelection<View>();

  /**
   * If import
   */
  const [handleImport] = crudService.useImport(
    viewRepository.import,
    setLoading,
  );

  /**
   * If export
   */
  const [handleExport] = crudService.useExport(API_VIEW_ROUTE);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------
  
  // ------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------
  
  // ------------------------------------------------------------------------------------------------------------------------------------------------

   // Delete handlers -------------------------------------------------------------------------------------------------------------------------------
  const [handleDelete] = tableService.useDeleteHandler<View>(
    viewRepository.delete,
    setLoading,
    list,
    setList
  );
  const [handleBulkDelete] = tableService.useBulkDeleteHandler(
    rowSelection.selectedRowKeys,
    viewRepository.bulkDelete,
    setLoading
  );
  // ------------------------------------------------------------------------------------------------------------------------------------------------

  const columns: Array<ColumnProps<View>> = React.useMemo(
    () => {
      return [
      {
        title: translate(generalLanguageKeys.columns.index),
        key: nameof(generalLanguageKeys.index),
        width: generalColumnWidths.index,
        render: renderMasterIndex<View>(pagination)
      },
      
      {
          title: translate('views.id'),
          key: nameof(list[0].id),
          dataIndex: nameof(list[0].id),
          sorter: true,
          sortOrder: getOrderTypeForTable<View>(
            nameof(list[0].id),
            sorter
          ),
          
      },
      
      {
          title: translate('views.name'),
          key: nameof(list[0].name),
          dataIndex: nameof(list[0].name),
          sorter: true,
          sortOrder: getOrderTypeForTable<View>(
            nameof(list[0].name),
            sorter
          ),
          
      },
      
      {
          title: translate('views.path'),
          key: nameof(list[0].path),
          dataIndex: nameof(list[0].path),
          sorter: true,
          sortOrder: getOrderTypeForTable<View>(
            nameof(list[0].path),
            sorter
          ),
          
      },
      
      {
          title: translate('views.isDeleted'),
          key: nameof(list[0].isDeleted),
          dataIndex: nameof(list[0].isDeleted),
          sorter: true,
          sortOrder: getOrderTypeForTable<View>(
            nameof(list[0].isDeleted),
            sorter
          ),
          
      },
      
      {
          title: translate('views.fields'),
          key: nameof(list[0].fields),
          dataIndex: nameof(list[0].fields),
          sorter: true,
          sortOrder: getOrderTypeForTable<View>(
            nameof(list[0].fields),
            sorter
          ),
          
      },
      
      {
          title: translate('views.pages'),
          key: nameof(list[0].pages),
          dataIndex: nameof(list[0].pages),
          sorter: true,
          sortOrder: getOrderTypeForTable<View>(
            nameof(list[0].pages),
            sorter
          ),
          
      },
      
      {
          title: translate('views.permissions'),
          key: nameof(list[0].permissions),
          dataIndex: nameof(list[0].permissions),
          sorter: true,
          sortOrder: getOrderTypeForTable<View>(
            nameof(list[0].permissions),
            sorter
          ),
          
      },
      
      {
        title: translate(generalLanguageKeys.actions.label),
        key: nameof(generalLanguageKeys.columns.actions),
        dataIndex: nameof(list[0].id),
        width: generalColumnWidths.actions,
        align: 'center',
        render(id: number, view: View) {
          return (
            <div className='d-flex justify-content-center'>
              <button
                className='btn btn-sm btn-link text-warning'
                onClick={handleOpenPreview(id)}
              >
                <i className='fa fa-eye' />
              </button>
              <button
                className='btn btn-sm btn-link'
                onClick={handleGoDetail(id)}
              >
                <i className='fa fa-edit' />
              </button>
              <button
                className='btn btn-sm btn-link text-danger'
                onClick={handleDelete(view)}
              >
                <i className='fa fa-trash' />
              </button>
            </div>
          );
        }
      }
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
      <Card title={translate('views.master.title')}>
        <Card
          className="head-borderless mb-4"
          title={translate(generalLanguageKeys.actions.search)}
        >
          <Form {...formItemLayout}>
            <Row>
              
              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('views.id')}
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
                  label={translate('views.name')}
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
                  label={translate('views.path')}
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
                  label={translate('views.isDeleted')}
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
                    total
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
              
              <Descriptions.Item label={translate('views.id')}>
                { previewModel?.id }
              </Descriptions.Item>
              
                            
              <Descriptions.Item label={translate('views.name')}>
                { previewModel?.name }
              </Descriptions.Item>
              
                            
              <Descriptions.Item label={translate('views.path')}>
                { previewModel?.path }
              </Descriptions.Item>
              
                            
              <Descriptions.Item label={translate('views.isDeleted')}>
                { previewModel?.isDeleted }
              </Descriptions.Item>
              
                            
                            
                            
                          </Descriptions>
          </Spin>
        </MasterPreview>                                
      </Card>
      </div>
  );
}

export default ViewMaster;
