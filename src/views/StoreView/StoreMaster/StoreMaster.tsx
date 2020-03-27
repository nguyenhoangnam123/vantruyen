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
import {STORE_ROUTE} from 'config/route-consts';
import {API_STORE_ROUTE} from 'config/api-consts';
import './StoreMaster.scss';
import {storeRepository} from 'views/StoreView/StoreRepository';
import {Store} from 'models/Store';
import {StoreFilter} from 'models/StoreFilter';
import {District} from 'models/District';
import {DistrictFilter} from 'models/DistrictFilter';
import {Organization} from 'models/Organization';
import {OrganizationFilter} from 'models/OrganizationFilter';
import {Province} from 'models/Province';
import {ProvinceFilter} from 'models/ProvinceFilter';
import {Status} from 'models/Status';
import {StoreGrouping} from 'models/StoreGrouping';
import {StoreType} from 'models/StoreType';
import {Ward} from 'models/Ward';
import {WardFilter} from 'models/WardFilter';

const {Item: FormItem} = Form;

function StoreMaster() {
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
  ] = crudService.useMaster<Store, StoreFilter>(
    Store,
    StoreFilter,
    storeRepository.count,
    storeRepository.list,
    storeRepository.get,
  );

  const [handleGoCreate, handleGoDetail] = routerService.useMasterNavigation(STORE_ROUTE);
  const [pagination, sorter, handleTableChange] = tableService.useMasterTable(filter, setFilter, total, handleSearch);
  const [rowSelection, hasSelected] = tableService.useRowSelection<Store>();

  /**
   * If import
   */
  const [handleImport] = crudService.useImport(
    storeRepository.import,
    setLoading,
  );

  /**
   * If export
   */
  const [handleExport] = crudService.useExport(API_STORE_ROUTE);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  const [statusList] = crudService.useEnumList<Status>(storeRepository.singleListStatus);

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  const [districtFilter, setDistrictFilter] = React.useState<DistrictFilter>(new DistrictFilter());

  const [organizationFilter, setOrganizationFilter] = React.useState<OrganizationFilter>(new OrganizationFilter());

  const [parentStoreFilter, setParentStoreFilter] = React.useState<StoreFilter>(new StoreFilter());

  const [provinceFilter, setProvinceFilter] = React.useState<ProvinceFilter>(new ProvinceFilter());

  const [wardFilter, setWardFilter] = React.useState<WardFilter>(new WardFilter());

  // Delete handlers -------------------------------------------------------------------------------------------------------------------------------
  const [handleDelete] = tableService.useDeleteHandler<Store>(
    storeRepository.delete,
    setLoading,
    list,
    setList,
    handleSearch,
  );
  const [handleBulkDelete] = tableService.useBulkDeleteHandler(
    rowSelection.selectedRowKeys,
    storeRepository.bulkDelete,
    setLoading,
    handleSearch,
  );

  const columns: ColumnProps<Store>[] = React.useMemo(
    () => {
      return [
        {
          title: translate(generalLanguageKeys.columns.index),
          key: nameof(generalLanguageKeys.index),
          width: generalColumnWidths.index,
          render: renderMasterIndex<Store>(pagination),
          fixed: 'left',
        },
        {
          title: translate('stores.code'),
          key: nameof(list[0].code),
          dataIndex: nameof(list[0].code),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].code),
            sorter,
          ),
        },
        {
          title: translate('stores.name'),
          key: nameof(list[0].name),
          dataIndex: nameof(list[0].name),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].name),
            sorter,
          ),
        },
        {
          title: translate('stores.telephone'),
          key: nameof(list[0].telephone),
          dataIndex: nameof(list[0].telephone),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].telephone),
            sorter,
          ),
        },
        {
          title: translate('stores.address1'),
          key: nameof(list[0].address1),
          dataIndex: nameof(list[0].address1),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].address1),
            sorter,
          ),
        },

        {
          title: translate('stores.address2'),
          key: nameof(list[0].address2),
          dataIndex: nameof(list[0].address2),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].address2),
            sorter,
          ),
        },

        {
          title: translate('stores.latitude'),
          key: nameof(list[0].latitude),
          dataIndex: nameof(list[0].latitude),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].latitude),
            sorter,
          ),
        },

        {
          title: translate('stores.longitude'),
          key: nameof(list[0].longitude),
          dataIndex: nameof(list[0].longitude),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].longitude),
            sorter,
          ),
        },
        {
          title: translate('stores.ownerName'),
          key: nameof(list[0].ownerName),
          dataIndex: nameof(list[0].ownerName),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].ownerName),
            sorter,
          ),
        },
        {
          title: translate('stores.ownerPhone'),
          key: nameof(list[0].ownerPhone),
          dataIndex: nameof(list[0].ownerPhone),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].ownerPhone),
            sorter,
          ),
        },
        {
          title: translate('stores.ownerEmail'),
          key: nameof(list[0].ownerEmail),
          dataIndex: nameof(list[0].ownerEmail),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].ownerEmail),
            sorter,
          ),
        },
        {
          title: translate('stores.district'),
          key: nameof(list[0].district),
          dataIndex: nameof(list[0].district),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].district),
            sorter,
          ),
          render(district: District) {
            return district?.name;
          },
        },
        {
          title: translate('stores.organization'),
          key: nameof(list[0].organization),
          dataIndex: nameof(list[0].organization),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].organization),
            sorter,
          ),
          render(organization: Organization) {
            return organization?.name;
          },
        },
        {
          title: translate('stores.parentStore'),
          key: nameof(list[0].parentStore),
          dataIndex: nameof(list[0].parentStore),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].parentStore),
            sorter,
          ),
          render(parentStore: Store) {
            return parentStore?.name;
          },
        },
        {
          title: translate('stores.province'),
          key: nameof(list[0].province),
          dataIndex: nameof(list[0].province),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].province),
            sorter,
          ),
          render(province: Province) {
            return province?.name;
          },
        },
        {
          title: translate('stores.status'),
          key: nameof(list[0].status),
          dataIndex: nameof(list[0].status),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].status),
            sorter,
          ),
          render(status: Status) {
            return status?.name;
          },
        },
        {
          title: translate('stores.storeGrouping'),
          key: nameof(list[0].storeGrouping),
          dataIndex: nameof(list[0].storeGrouping),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].storeGrouping),
            sorter,
          ),
          render(storeGrouping: StoreGrouping) {
            return storeGrouping?.name;
          },
        },
        {
          title: translate('stores.storeType'),
          key: nameof(list[0].storeType),
          dataIndex: nameof(list[0].storeType),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].storeType),
            sorter,
          ),
          render(storeType: StoreType) {
            return storeType?.name;
          },
        },
        {
          title: translate('stores.ward'),
          key: nameof(list[0].ward),
          dataIndex: nameof(list[0].ward),
          sorter: true,
          sortOrder: getOrderTypeForTable<Store>(
            nameof(list[0].ward),
            sorter,
          ),
          render(ward: Ward) {
            return ward?.name;
          },
        },
        {
          title: translate(generalLanguageKeys.actions.label),
          key: nameof(generalLanguageKeys.columns.actions),
          dataIndex: nameof(list[0].id),
          width: generalColumnWidths.actions,
          align: 'center',
          fixed: 'right',
          render(id: number, store: Store) {
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
                  onClick={handleDelete(store)}
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
      <Card title={translate('stores.master.title')}>
        <Card
          className="head-borderless mb-4"
          title={translate(generalLanguageKeys.actions.search)}
        >
          <Form {...formItemLayout}>
            <Row>
              <Col className="pl-1" span={12}>
                <FormItem
                  className="mb-0"
                  label={translate('stores.name')}
                >
                  <AdvancedStringFilter
                    filterType={nameof(filter.address1.startWith)}
                    filter={filter.name}
                    onChange={handleFilter(nameof(filter.name))}
                    className="w-100"
                  />
                </FormItem>
              </Col>
              <Col className="pl-1" span={12}>
                <FormItem
                  className="mb-0"
                  label={translate('stores.address1')}
                >
                  <AdvancedStringFilter
                    filterType={nameof(filter.address1.startWith)}
                    filter={filter.address1}
                    onChange={handleFilter(nameof(filter.address1))}
                    className="w-100"
                  />
                </FormItem>
              </Col>
              <Col className="pl-1" span={12}>
                <FormItem
                  className="mb-0"
                  label={translate('stores.district')}
                >
                  <AdvancedIdFilter filter={filter.districtId}
                                    filterType={nameof(filter.districtId.equal)}
                                    value={filter.districtId.equal}
                                    onChange={handleFilter(nameof(filter.districtId))}
                                    modelFilter={districtFilter}
                                    setModelFilter={setDistrictFilter}
                                    getList={storeRepository.singleListDistrict}
                  />
                </FormItem>
              </Col>
              <Col className="pl-1" span={12}>
                <FormItem
                  className="mb-0"
                  label={translate('stores.organization')}
                >
                  <AdvancedIdFilter filter={filter.organizationId}
                                    filterType={nameof(filter.organizationId.equal)}
                                    value={filter.organizationId.equal}
                                    onChange={handleFilter(nameof(filter.organizationId))}
                                    modelFilter={organizationFilter}
                                    setModelFilter={setOrganizationFilter}
                                    getList={storeRepository.singleListOrganization}
                  />
                </FormItem>
              </Col>
              <Col className="pl-1" span={12}>
                <FormItem
                  className="mb-0"
                  label={translate('stores.parentStore')}
                >
                  <AdvancedIdFilter filter={filter.parentStoreId}
                                    filterType={nameof(filter.parentStoreId.equal)}
                                    value={filter.parentStoreId.equal}
                                    onChange={handleFilter(nameof(filter.parentStoreId))}
                                    modelFilter={parentStoreFilter}
                                    setModelFilter={setParentStoreFilter}
                                    getList={storeRepository.singleListParentStore}
                  />
                </FormItem>
              </Col>
              <Col className="pl-1" span={12}>
                <FormItem
                  className="mb-0"
                  label={translate('stores.province')}
                >
                  <AdvancedIdFilter filter={filter.provinceId}
                                    filterType={nameof(filter.provinceId.equal)}
                                    value={filter.provinceId.equal}
                                    onChange={handleFilter(nameof(filter.provinceId))}
                                    modelFilter={provinceFilter}
                                    setModelFilter={setProvinceFilter}
                                    getList={storeRepository.singleListProvince}
                  />
                </FormItem>
              </Col>

              <Col className="pl-1" span={12}>
                <FormItem
                  className="mb-0"
                  label={translate('stores.status')}
                >
                  <AdvancedIdFilter filter={filter.statusId}
                                    filterType={nameof(filter.statusId.equal)}
                                    value={filter.statusId.equal}
                                    onChange={handleFilter(nameof(filter.statusId))}
                                    list={statusList}
                  />
                </FormItem>
              </Col>
              <Col className="pl-1" span={12}>
                <FormItem
                  className="mb-0"
                  label={translate('stores.ward')}
                >
                  <AdvancedIdFilter filter={filter.wardId}
                                    filterType={nameof(filter.wardId.equal)}
                                    value={filter.wardId.equal}
                                    onChange={handleFilter(nameof(filter.wardId))}
                                    modelFilter={wardFilter}
                                    setModelFilter={setWardFilter}
                                    getList={storeRepository.singleListWard}
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
          scroll={{x: 7050}}
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

              <Descriptions.Item label={translate('stores.id')}>
                {previewModel?.id}
              </Descriptions.Item>


              <Descriptions.Item label={translate('stores.code')}>
                {previewModel?.code}
              </Descriptions.Item>


              <Descriptions.Item label={translate('stores.name')}>
                {previewModel?.name}
              </Descriptions.Item>


              <Descriptions.Item label={translate('stores.telephone')}>
                {previewModel?.telephone}
              </Descriptions.Item>


              <Descriptions.Item label={translate('stores.address1')}>
                {previewModel?.address1}
              </Descriptions.Item>


              <Descriptions.Item label={translate('stores.address2')}>
                {previewModel?.address2}
              </Descriptions.Item>


              <Descriptions.Item label={translate('stores.latitude')}>
                {previewModel?.latitude}
              </Descriptions.Item>


              <Descriptions.Item label={translate('stores.longitude')}>
                {previewModel?.longitude}
              </Descriptions.Item>


              <Descriptions.Item label={translate('stores.ownerName')}>
                {previewModel?.ownerName}
              </Descriptions.Item>


              <Descriptions.Item label={translate('stores.ownerPhone')}>
                {previewModel?.ownerPhone}
              </Descriptions.Item>


              <Descriptions.Item label={translate('stores.ownerEmail')}>
                {previewModel?.ownerEmail}
              </Descriptions.Item>


              <Descriptions.Item
                label={translate('stores.status')}
              >
                {previewModel?.status?.name}
              </Descriptions.Item>


            </Descriptions>
          </Spin>
        </MasterPreview>
      </Card>
    </div>
  );
}

export default StoreMaster;
