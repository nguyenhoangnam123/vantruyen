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

import { APP_USER_ROUTE } from 'config/route-consts';
import { API_APP_USER_ROUTE } from 'config/api-consts';
import './AppUserMaster.scss';
import { appUserRepository }  from 'views/AppUserView/AppUserRepository';
import { AppUser } from 'models/AppUser';
import { AppUserFilter} from 'models/AppUserFilter';

import { UserStatus } from 'models/UserStatus';


const { Item: FormItem } = Form;

function AppUserMaster() {
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
  ] = crudService.useMaster<AppUser, AppUserFilter>(
    AppUser,
    AppUserFilter,
    appUserRepository.count,
    appUserRepository.list,
    appUserRepository.get,
    );

  const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(APP_USER_ROUTE);
  const [pagination, sorter, handleTableChange] = tableService.useMasterTable(filter, setFilter, total, handleSearch);
  const [rowSelection, hasSelected] = tableService.useRowSelection<AppUser>();

  /**
   * If import
   */
  const [handleImport] = crudService.useImport(
    appUserRepository.import,
    setLoading,
  );

  /**
   * If export
   */
  const [handleExport] = crudService.useExport(API_APP_USER_ROUTE);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  const [userStatusList] = crudService.useEnumList<UserStatus>(appUserRepository.singleListUserStatus);

  // ------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------------------------------------------------------

   // Delete handlers -------------------------------------------------------------------------------------------------------------------------------
  const [handleDelete] = tableService.useDeleteHandler<AppUser>(
    appUserRepository.delete,
    setLoading,
    list,
    setList,
  );
  const [handleBulkDelete] = tableService.useBulkDeleteHandler(
    rowSelection.selectedRowKeys,
    appUserRepository.bulkDelete,
    setLoading,
  );
  // ------------------------------------------------------------------------------------------------------------------------------------------------

  const columns: ColumnProps<AppUser>[] = React.useMemo(
    () => {
      return [
      {
        title: translate(generalLanguageKeys.columns.index),
        key: nameof(generalLanguageKeys.index),
        width: generalColumnWidths.index,
        render: renderMasterIndex<AppUser>(pagination),
      },

      {
          title: translate('appUsers.id'),
          key: nameof(list[0].id),
          dataIndex: nameof(list[0].id),
          sorter: true,
          sortOrder: getOrderTypeForTable<AppUser>(
            nameof(list[0].id),
            sorter,
          ),

      },

      {
          title: translate('appUsers.username'),
          key: nameof(list[0].username),
          dataIndex: nameof(list[0].username),
          sorter: true,
          sortOrder: getOrderTypeForTable<AppUser>(
            nameof(list[0].username),
            sorter,
          ),

      },

      {
          title: translate('appUsers.password'),
          key: nameof(list[0].password),
          dataIndex: nameof(list[0].password),
          sorter: true,
          sortOrder: getOrderTypeForTable<AppUser>(
            nameof(list[0].password),
            sorter,
          ),

      },

      {
          title: translate('appUsers.displayName'),
          key: nameof(list[0].displayName),
          dataIndex: nameof(list[0].displayName),
          sorter: true,
          sortOrder: getOrderTypeForTable<AppUser>(
            nameof(list[0].displayName),
            sorter,
          ),

      },

      {
          title: translate('appUsers.email'),
          key: nameof(list[0].email),
          dataIndex: nameof(list[0].email),
          sorter: true,
          sortOrder: getOrderTypeForTable<AppUser>(
            nameof(list[0].email),
            sorter,
          ),

      },

      {
          title: translate('appUsers.phone'),
          key: nameof(list[0].phone),
          dataIndex: nameof(list[0].phone),
          sorter: true,
          sortOrder: getOrderTypeForTable<AppUser>(
            nameof(list[0].phone),
            sorter,
          ),

      },

      {
          title: translate('appUsers.userStatusId'),
          key: nameof(list[0].userStatusId),
          dataIndex: nameof(list[0].userStatusId),
          sorter: true,
          sortOrder: getOrderTypeForTable<AppUser>(
            nameof(list[0].userStatusId),
            sorter,
          ),

      },

      {
          title: translate('appUsers.createdAt'),
          key: nameof(list[0].createdAt),
          dataIndex: nameof(list[0].createdAt),
          sorter: true,
          sortOrder: getOrderTypeForTable<AppUser>(
            nameof(list[0].createdAt),
            sorter,
          ),

      },

      {
          title: translate('appUsers.updatedAt'),
          key: nameof(list[0].updatedAt),
          dataIndex: nameof(list[0].updatedAt),
          sorter: true,
          sortOrder: getOrderTypeForTable<AppUser>(
            nameof(list[0].updatedAt),
            sorter,
          ),

      },

      {
          title: translate('appUsers.deletedAt'),
          key: nameof(list[0].deletedAt),
          dataIndex: nameof(list[0].deletedAt),
          sorter: true,
          sortOrder: getOrderTypeForTable<AppUser>(
            nameof(list[0].deletedAt),
            sorter,
          ),

      },

      {
          title: translate('appUsers.userStatus'),
          key: nameof(list[0].userStatus),
          dataIndex: nameof(list[0].userStatus),
          sorter: true,
          sortOrder: getOrderTypeForTable<AppUser>(
            nameof(list[0].userStatus),
            sorter,
          ),

          render(userStatus: UserStatus) {
            return userStatus?.name;
          },

      },

      {
        title: translate(generalLanguageKeys.actions.label),
        key: nameof(generalLanguageKeys.columns.actions),
        dataIndex: nameof(list[0].id),
        width: generalColumnWidths.actions,
        align: 'center',
        render(id: number, appUser: AppUser) {
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
                onClick={handleDelete(appUser)}
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
      <Card title={translate('appUsers.master.title')}>
        <Card
          className="head-borderless mb-4"
          title={translate(generalLanguageKeys.actions.search)}
        >
          <Form {...formItemLayout}>
            <Row>

              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('appUsers.id')}
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
                  label={translate('appUsers.username')}
                >
                    <AdvancedStringFilter
                      filterType={nameof(filter.username.startWith)}
                      filter={filter.id}
                      onChange={handleFilter(nameof(previewModel.id))}
                      className="w-100"
                    />


                </FormItem>
              </Col>



              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('appUsers.password')}
                >
                    <AdvancedStringFilter
                      filterType={nameof(filter.password.startWith)}
                      filter={filter.id}
                      onChange={handleFilter(nameof(previewModel.id))}
                      className="w-100"
                    />


                </FormItem>
              </Col>



              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('appUsers.displayName')}
                >
                    <AdvancedStringFilter
                      filterType={nameof(filter.displayName.startWith)}
                      filter={filter.id}
                      onChange={handleFilter(nameof(previewModel.id))}
                      className="w-100"
                    />


                </FormItem>
              </Col>



              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('appUsers.email')}
                >
                    <AdvancedStringFilter
                      filterType={nameof(filter.email.startWith)}
                      filter={filter.id}
                      onChange={handleFilter(nameof(previewModel.id))}
                      className="w-100"
                    />


                </FormItem>
              </Col>



              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('appUsers.phone')}
                >
                    <AdvancedStringFilter
                      filterType={nameof(filter.phone.startWith)}
                      filter={filter.id}
                      onChange={handleFilter(nameof(previewModel.id))}
                      className="w-100"
                    />


                </FormItem>
              </Col>












              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('appUsers.userStatus')}
                >
                  <AdvancedIdFilter filter={filter.userStatusId}
                                    filterType={nameof(filter.userStatusId.equal)}
                                    setModelFilter={setFilter}
                                    value={filter.userStatusId.equal}
                                    onChange={handleFilter(nameof(filter.userStatusId))}
                                    list={ userStatusList }
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

              <Descriptions.Item label={translate('appUsers.id')}>
                { previewModel?.id }
              </Descriptions.Item>


              <Descriptions.Item label={translate('appUsers.username')}>
                { previewModel?.username }
              </Descriptions.Item>


              <Descriptions.Item label={translate('appUsers.password')}>
                { previewModel?.password }
              </Descriptions.Item>


              <Descriptions.Item label={translate('appUsers.displayName')}>
                { previewModel?.displayName }
              </Descriptions.Item>


              <Descriptions.Item label={translate('appUsers.email')}>
                { previewModel?.email }
              </Descriptions.Item>


              <Descriptions.Item label={translate('appUsers.phone')}>
                { previewModel?.phone }
              </Descriptions.Item>







              <Descriptions.Item
                label={translate('appUsers.userStatus')}
              >
                {previewModel?.userStatus?.name}
              </Descriptions.Item>

                          </Descriptions>
          </Spin>
        </MasterPreview>
      </Card>
      </div>
  );
}

export default AppUserMaster;
