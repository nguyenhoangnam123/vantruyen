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

import { PERMISSION_ROUTE } from 'config/route-consts';
import { API_PERMISSION_ROUTE } from 'config/api-consts';
import './PermissionMaster.scss';
import { permissionRepository }  from 'views/PermissionView/PermissionRepository';
import { Permission } from 'models/Permission';
import { PermissionFilter} from 'models/PermissionFilter';


const { Item: FormItem } = Form;

function PermissionMaster() {
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
  ] = crudService.useMaster<Permission, PermissionFilter>(
    Permission,
    PermissionFilter,
    permissionRepository.count,
    permissionRepository.list,
    permissionRepository.get,
    );
  
  const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(PERMISSION_ROUTE);
  const [pagination, sorter, handleTableChange] = tableService.useMasterTable(filter, setFilter, total);
  const [rowSelection, hasSelected] = tableService.useRowSelection<Permission>();

  /**
   * If import
   */
  const [handleImport] = crudService.useImport(
    permissionRepository.import,
    setLoading,
  );

  /**
   * If export
   */
  const [handleExport] = crudService.useExport(API_PERMISSION_ROUTE);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------
  
  // ------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------
  
  const [roleFilter, setRoleFilter] = React.useState<PermissionFilter>(new PermissionFilter());
  
  const [viewFilter, setViewFilter] = React.useState<PermissionFilter>(new PermissionFilter());
  
  // ------------------------------------------------------------------------------------------------------------------------------------------------

   // Delete handlers -------------------------------------------------------------------------------------------------------------------------------
  const [handleDelete] = tableService.useDeleteHandler<Permission>(
    permissionRepository.delete,
    setLoading,
    list,
    setList
  );
  const [handleBulkDelete] = tableService.useBulkDeleteHandler(
    rowSelection.selectedRowKeys,
    permissionRepository.bulkDelete,
    setLoading
  );
  // ------------------------------------------------------------------------------------------------------------------------------------------------

  const columns: Array<ColumnProps<Permission>> = React.useMemo(
    () => {
      return [
      {
        title: translate(generalLanguageKeys.columns.index),
        key: nameof(generalLanguageKeys.index),
        width: generalColumnWidths.index,
        render: renderMasterIndex<Permission>(pagination)
      },
      
      {
          title: translate('permissions.id'),
          key: nameof(list[0].id),
          dataIndex: nameof(list[0].id),
          sorter: true,
          sortOrder: getOrderTypeForTable<Permission>(
            nameof(list[0].id),
            sorter
          ),
          
      },
      
      {
          title: translate('permissions.name'),
          key: nameof(list[0].name),
          dataIndex: nameof(list[0].name),
          sorter: true,
          sortOrder: getOrderTypeForTable<Permission>(
            nameof(list[0].name),
            sorter
          ),
          
      },
      
      {
          title: translate('permissions.roleId'),
          key: nameof(list[0].roleId),
          dataIndex: nameof(list[0].roleId),
          sorter: true,
          sortOrder: getOrderTypeForTable<Permission>(
            nameof(list[0].roleId),
            sorter
          ),
          
      },
      
      {
          title: translate('permissions.viewId'),
          key: nameof(list[0].viewId),
          dataIndex: nameof(list[0].viewId),
          sorter: true,
          sortOrder: getOrderTypeForTable<Permission>(
            nameof(list[0].viewId),
            sorter
          ),
          
      },
      
      {
          title: translate('permissions.role'),
          key: nameof(list[0].role),
          dataIndex: nameof(list[0].role),
          sorter: true,
          sortOrder: getOrderTypeForTable<Permission>(
            nameof(list[0].role),
            sorter
          ),
          
      },
      
      {
          title: translate('permissions.view'),
          key: nameof(list[0].view),
          dataIndex: nameof(list[0].view),
          sorter: true,
          sortOrder: getOrderTypeForTable<Permission>(
            nameof(list[0].view),
            sorter
          ),
          
      },
      
      {
        title: translate(generalLanguageKeys.actions.label),
        key: nameof(generalLanguageKeys.columns.actions),
        dataIndex: nameof(list[0].id),
        width: generalColumnWidths.actions,
        align: 'center',
        render(id: number, permission: Permission) {
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
                onClick={handleDelete(permission)}
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
      <Card title={translate('permissions.master.title')}>
        <Card
          className="head-borderless mb-4"
          title={translate(generalLanguageKeys.actions.search)}
        >
          <Form {...formItemLayout}>
            <Row>
              
              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('permissions.id')}
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
                  label={translate('permissions.name')}
                >
                    <AdvancedStringFilter
                      filterType={nameof(filter.name.startWith)}
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
              
              <Descriptions.Item label={translate('permissions.id')}>
                { previewModel?.id }
              </Descriptions.Item>
              
                            
              <Descriptions.Item label={translate('permissions.name')}>
                { previewModel?.name }
              </Descriptions.Item>
              
                            
                            
                            
                            
                            
                            
                          </Descriptions>
          </Spin>
        </MasterPreview>                                
      </Card>
      </div>
  );
}

export default PermissionMaster;
