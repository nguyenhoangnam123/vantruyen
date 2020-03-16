import React from 'react';
import Card from 'antd/lib/card';
import Spin from 'antd/lib/spin';
import Form from 'antd/lib/form';
import Table, {ColumnProps} from 'antd/lib/table';
import {Col, Row} from 'antd/lib/grid';
import Descriptions from 'antd/lib/descriptions';
import {crudService, routerService} from 'core/services';
import {getOrderTypeForTable, renderMasterIndex} from 'helpers/ant-design/table';
import {useTranslation} from 'react-i18next';
import nameof from 'ts-nameof.macro';
import {tableService} from 'services';
import {formItemLayout} from 'config/ant-design/form';
import AdvancedStringFilter from 'components/AdvancedStringFilter/AdvancedStringFilter';
import AdvancedIdFilter from 'components/AdvancedIdFilter/AdvancedIdFilter';
import MasterPreview from 'components/MasterPreview/MasterPreview';
import {generalColumnWidths, generalLanguageKeys} from 'config/consts';

import {PROVIDER_ROUTE} from 'config/route-consts';
import {API_PROVIDER_ROUTE} from 'config/api-consts';
import './ProviderMaster.scss';
import {providerRepository} from 'views/ProviderView/ProviderRepository';
import {Provider} from 'models/Provider';
import {ProviderFilter} from 'models/ProviderFilter';

const {Item: FormItem} = Form;

function ProviderMaster() {
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
  ] = crudService.useMaster<Provider, ProviderFilter>(
    Provider,
    ProviderFilter,
    providerRepository.count,
    providerRepository.list,
    providerRepository.get,
  );

  const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(PROVIDER_ROUTE);
  const [pagination, sorter, handleTableChange] = tableService.useMasterTable(filter, setFilter, total);
  const [rowSelection, hasSelected] = tableService.useRowSelection<Provider>();

  /**
   * If import
   */
  const [handleImport] = crudService.useImport(
    providerRepository.import,
    setLoading,
  );

  /**
   * If export
   */
  const [handleExport] = crudService.useExport(API_PROVIDER_ROUTE);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------------------------------------------------------

  // Delete handlers -------------------------------------------------------------------------------------------------------------------------------
  const [handleDelete] = tableService.useDeleteHandler<Provider>(
    providerRepository.delete,
    setLoading,
    list,
    setList,
  );
  const [handleBulkDelete] = tableService.useBulkDeleteHandler(
    rowSelection.selectedRowKeys,
    providerRepository.bulkDelete,
    setLoading,
  );
  // ------------------------------------------------------------------------------------------------------------------------------------------------

  const columns: ColumnProps<Provider>[] = React.useMemo(
    () => {
      return [
        {
          title: translate(generalLanguageKeys.columns.index),
          key: nameof(generalLanguageKeys.index),
          width: generalColumnWidths.index,
          render: renderMasterIndex<Provider>(pagination),
        },

        {
          title: translate('providers.id'),
          key: nameof(list[0].id),
          dataIndex: nameof(list[0].id),
          sorter: true,
          sortOrder: getOrderTypeForTable<Provider>(
            nameof(list[0].id),
            sorter,
          ),

        },

        {
          title: translate('providers.name'),
          key: nameof(list[0].name),
          dataIndex: nameof(list[0].name),
          sorter: true,
          sortOrder: getOrderTypeForTable<Provider>(
            nameof(list[0].name),
            sorter,
          ),

        },

        {
          title: translate('providers.googleRedirectUri'),
          key: nameof(list[0].googleRedirectUri),
          dataIndex: nameof(list[0].googleRedirectUri),
          sorter: true,
          sortOrder: getOrderTypeForTable<Provider>(
            nameof(list[0].googleRedirectUri),
            sorter,
          ),

        },

        {
          title: translate('providers.aDIP'),
          key: nameof(list[0].aDIP),
          dataIndex: nameof(list[0].aDIP),
          sorter: true,
          sortOrder: getOrderTypeForTable<Provider>(
            nameof(list[0].aDIP),
            sorter,
          ),

        },

        {
          title: translate('providers.aDUsername'),
          key: nameof(list[0].aDUsername),
          dataIndex: nameof(list[0].aDUsername),
          sorter: true,
          sortOrder: getOrderTypeForTable<Provider>(
            nameof(list[0].aDUsername),
            sorter,
          ),

        },

        {
          title: translate('providers.aDPassword'),
          key: nameof(list[0].aDPassword),
          dataIndex: nameof(list[0].aDPassword),
          sorter: true,
          sortOrder: getOrderTypeForTable<Provider>(
            nameof(list[0].aDPassword),
            sorter,
          ),

        },

        {
          title: translate('providers.googleClient'),
          key: nameof(list[0].googleClient),
          dataIndex: nameof(list[0].googleClient),
          sorter: true,
          sortOrder: getOrderTypeForTable<Provider>(
            nameof(list[0].googleClient),
            sorter,
          ),

        },

        {
          title: translate('providers.googleClientSecret'),
          key: nameof(list[0].googleClientSecret),
          dataIndex: nameof(list[0].googleClientSecret),
          sorter: true,
          sortOrder: getOrderTypeForTable<Provider>(
            nameof(list[0].googleClientSecret),
            sorter,
          ),

        },

        {
          title: translate('providers.microsoftClient'),
          key: nameof(list[0].microsoftClient),
          dataIndex: nameof(list[0].microsoftClient),
          sorter: true,
          sortOrder: getOrderTypeForTable<Provider>(
            nameof(list[0].microsoftClient),
            sorter,
          ),

        },

        {
          title: translate('providers.microsoftClientSecret'),
          key: nameof(list[0].microsoftClientSecret),
          dataIndex: nameof(list[0].microsoftClientSecret),
          sorter: true,
          sortOrder: getOrderTypeForTable<Provider>(
            nameof(list[0].microsoftClientSecret),
            sorter,
          ),

        },

        {
          title: translate('providers.microsoftRedirectUri'),
          key: nameof(list[0].microsoftRedirectUri),
          dataIndex: nameof(list[0].microsoftRedirectUri),
          sorter: true,
          sortOrder: getOrderTypeForTable<Provider>(
            nameof(list[0].microsoftRedirectUri),
            sorter,
          ),

        },

        {
          title: translate(generalLanguageKeys.actions.label),
          key: nameof(generalLanguageKeys.columns.actions),
          dataIndex: nameof(list[0].id),
          width: generalColumnWidths.actions,
          align: 'center',
          render(id: number, provider: Provider) {
            return (
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-sm btn-link text-warning"
                  onClick={handleOpenPreview(id)}
                >
                  <i className="fa fa-eye"/>
                </button>
                <button
                  className="btn btn-sm btn-link"
                  onClick={handleGoDetail(id)}
                >
                  <i className="fa fa-edit"/>
                </button>
                <button
                  className="btn btn-sm btn-link text-danger"
                  onClick={handleDelete(provider)}
                >
                  <i className="fa fa-trash"/>
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
      <Card title={translate('providers.master.title')}>
        <Card
          className="head-borderless mb-4"
          title={translate(generalLanguageKeys.actions.search)}
        >
          <Form {...formItemLayout}>
            <Row>

              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('providers.id')}
                >


                  <AdvancedIdFilter
                    filterType={nameof(filter.id.equal)}
                    filter={filter.id}
                    onChange={handleFilter(nameof(filter.id))}
                    className="w-100"
                  />
                </FormItem>
              </Col>


              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('providers.name')}
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
                  label={translate('providers.googleRedirectUri')}
                >
                  <AdvancedStringFilter
                    filterType={nameof(filter.googleRedirectUri.startWith)}
                    filter={filter.id}
                    onChange={handleFilter(nameof(previewModel.id))}
                    className="w-100"
                  />


                </FormItem>
              </Col>


              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('providers.aDIP')}
                >
                  <AdvancedStringFilter
                    filterType={nameof(filter.aDIP.startWith)}
                    filter={filter.id}
                    onChange={handleFilter(nameof(previewModel.id))}
                    className="w-100"
                  />


                </FormItem>
              </Col>


              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('providers.aDUsername')}
                >
                  <AdvancedStringFilter
                    filterType={nameof(filter.aDUsername.startWith)}
                    filter={filter.id}
                    onChange={handleFilter(nameof(previewModel.id))}
                    className="w-100"
                  />


                </FormItem>
              </Col>


              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('providers.aDPassword')}
                >
                  <AdvancedStringFilter
                    filterType={nameof(filter.aDPassword.startWith)}
                    filter={filter.id}
                    onChange={handleFilter(nameof(previewModel.id))}
                    className="w-100"
                  />


                </FormItem>
              </Col>


              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('providers.googleClient')}
                >
                  <AdvancedStringFilter
                    filterType={nameof(filter.googleClient.startWith)}
                    filter={filter.id}
                    onChange={handleFilter(nameof(previewModel.id))}
                    className="w-100"
                  />


                </FormItem>
              </Col>


              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('providers.googleClientSecret')}
                >
                  <AdvancedStringFilter
                    filterType={nameof(filter.googleClientSecret.startWith)}
                    filter={filter.id}
                    onChange={handleFilter(nameof(previewModel.id))}
                    className="w-100"
                  />


                </FormItem>
              </Col>


              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('providers.microsoftClient')}
                >
                  <AdvancedStringFilter
                    filterType={nameof(filter.microsoftClient.startWith)}
                    filter={filter.id}
                    onChange={handleFilter(nameof(previewModel.id))}
                    className="w-100"
                  />


                </FormItem>
              </Col>


              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('providers.microsoftClientSecret')}
                >
                  <AdvancedStringFilter
                    filterType={nameof(filter.microsoftClientSecret.startWith)}
                    filter={filter.id}
                    onChange={handleFilter(nameof(previewModel.id))}
                    className="w-100"
                  />


                </FormItem>
              </Col>


              <Col className="pl-1" span={8}>
                <FormItem
                  className="mb-0"
                  label={translate('providers.microsoftRedirectUri')}
                >
                  <AdvancedStringFilter
                    filterType={nameof(filter.microsoftRedirectUri.startWith)}
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
              <i className="fa mr-2 fa-times"/>
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
                    <i className="fa mr-2 fa-plus"/>
                    {translate(generalLanguageKeys.actions.create)}
                  </button>
                  <button
                    className="btn btn-sm btn-danger mr-2"
                    disabled={!hasSelected}
                    onClick={handleBulkDelete}
                  >
                    <i className="fa mr-2 fa-trash"/>
                    {translate(generalLanguageKeys.actions.delete)}
                  </button>
                  <label
                    className="btn btn-sm btn-outline-primary mr-2 mb-0"
                    htmlFor="master-import"
                  >
                    <i className="fa mr-2 fa-upload"/>
                    {translate(generalLanguageKeys.actions.import)}
                  </label>
                  <button
                    className="btn btn-sm btn-outline-primary mr-2"
                    onClick={handleExport}
                  >
                    <i className="fa mr-2 fa-download"/>
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

              <Descriptions.Item label={translate('providers.id')}>
                {previewModel?.id}
              </Descriptions.Item>


              <Descriptions.Item label={translate('providers.name')}>
                {previewModel?.name}
              </Descriptions.Item>


              <Descriptions.Item label={translate('providers.googleRedirectUri')}>
                {previewModel?.googleRedirectUri}
              </Descriptions.Item>


              <Descriptions.Item label={translate('providers.aDIP')}>
                {previewModel?.aDIP}
              </Descriptions.Item>


              <Descriptions.Item label={translate('providers.aDUsername')}>
                {previewModel?.aDUsername}
              </Descriptions.Item>


              <Descriptions.Item label={translate('providers.aDPassword')}>
                {previewModel?.aDPassword}
              </Descriptions.Item>


              <Descriptions.Item label={translate('providers.googleClient')}>
                {previewModel?.googleClient}
              </Descriptions.Item>


              <Descriptions.Item label={translate('providers.googleClientSecret')}>
                {previewModel?.googleClientSecret}
              </Descriptions.Item>


              <Descriptions.Item label={translate('providers.microsoftClient')}>
                {previewModel?.microsoftClient}
              </Descriptions.Item>


              <Descriptions.Item label={translate('providers.microsoftClientSecret')}>
                {previewModel?.microsoftClientSecret}
              </Descriptions.Item>


              <Descriptions.Item label={translate('providers.microsoftRedirectUri')}>
                {previewModel?.microsoftRedirectUri}
              </Descriptions.Item>

            </Descriptions>
          </Spin>
        </MasterPreview>
      </Card>
    </div>
  );
}

export default ProviderMaster;
