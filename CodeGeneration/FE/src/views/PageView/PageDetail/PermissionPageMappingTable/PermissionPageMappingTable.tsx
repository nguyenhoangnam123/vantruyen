import React from 'react';
import {ContentTableProps} from 'react3l';
import {crudService, formService} from 'core/services';
import Table, {ColumnProps} from 'antd/lib/table';
import {tableService} from 'services';
import {getOrderTypeForTable, renderMasterIndex} from 'helpers/ant-design/table';
import nameof from 'ts-nameof.macro';
import {useTranslation} from 'react-i18next';
import {generalColumnWidths, generalLanguageKeys} from 'config/consts';
import Form from 'antd/lib/form';
import {formItemLayout} from 'config/ant-design/form';
import {Col, Row} from 'antd/lib/grid';
import AdvancedIdFilter from 'components/AdvancedIdFilter/AdvancedIdFilter';
import CollapsibleCard from 'components/CollapsibleCard/CollapsibleCard';

import { pageRepository } from 'views/PageView/PageRepository';
import { Page } from 'models/Page';
import { PermissionPageMapping } from 'models/PermissionPageMapping';
import { PermissionPageMappingFilter } from 'models/PermissionPageMappingFilter';
import PermissionPageMappingModal from 'views/PageView/PageDetail/PermissionPageMappingModal/PermissionPageMappingModal';
const {Item: FormItem} = Form;

function PermissionPageMappingTable(props: ContentTableProps<Page, PermissionPageMapping>) {
  const [translate] = useTranslation();

  const {
    model,
    setModel,
  } = props;

  const [
    permissionPageMappings,
    setPermissionPageMappings,
    handleAdd,
    handleDelete,
  ] = crudService.useContentTable<Page, PermissionPageMapping>(
    model,
    setModel,
    nameof(model.permissionPageMappings),
  );

    const [
    loading,
    visible,
    list,
    total,
    handleOpen,
    handleClose,
    permissionPageMappingFilter,
    setPermissionPageMappingFilter,
  ] = crudService.useContentModal(
    pageRepository.listPermissionPageMapping,
    pageRepository.countPermissionPageMapping,
    PermissionPageMappingFilter,
  );

  const [
    dataSource,
    pagination,
    sorter,
    handleTableChange,
    handleFilter,
    handleSearch,
    handleReset,
  ] = tableService.useLocalTable(
    permissionPageMappings,
    permissionPageMappingFilter,
    setPermissionPageMappingFilter,
  );

  const columns: ColumnProps<PermissionPageMapping>[] = React.useMemo(
    () => [
      {
        title: translate(generalLanguageKeys.columns.index),
        key: nameof(generalLanguageKeys.columns.index),
        width: generalColumnWidths.index,
        render: renderMasterIndex<PermissionPageMapping>(pagination),
      },
      {
        title: translate('permissionPageMappings.id'),
        key: nameof(dataSource[0].id),
        dataIndex: nameof(dataSource[0].id),
        render: renderMasterIndex<PermissionPageMapping>(pagination),
      },
      {
        title: translate('permissionPageMappings.name'),
        key: nameof(dataSource[0].name),
        dataIndex: nameof(dataSource[0].name),
        sorter: true,
        sortOrder: getOrderTypeForTable<Page>(nameof(dataSource[0].name), sorter),
        render(name: string, permissionPageMapping: PermissionPageMapping) {
          return (
            <FormItem validateStatus={formService.getValidationStatus<PermissionPageMapping>(permissionPageMapping.errors, nameof(permissionPageMapping.name))}
                      help={ permissionPageMapping.errors?.name }
            >
              <input type="text"
                     className="form-control form-control-sm"
                     name={nameof(name)}
                     defaultValue={name}
              />
            </FormItem>
          );
        },
      },
      {
        title: translate(generalLanguageKeys.actions.label),
        key: nameof(generalLanguageKeys.actions),
        width: generalColumnWidths.actions,
        align: 'center',
        render(...params: [PermissionPageMapping, PermissionPageMapping, number]) {
          return (
            <>
              <button className="btn btn-link mr-2" onClick={handleDelete(params[2])}>
                <i className="fa fa-trash text-danger"/>
              </button>
            </>
          );
        },
      },
    ],
    [dataSource, handleDelete, pagination, sorter, translate],
  );
  const tableTitle = React.useCallback(
    () => (
      <button className="btn btn-sm btn-primary" onClick={handleOpen}>
        <i className="fa fa-plus mr-2"/>
        {translate(generalLanguageKeys.actions.add)}
      </button>
    ),
    [handleOpen, translate],
  );
    const tableFooter = React.useCallback(
    () => (
      <>
        <button className="btn btn-link" onClick={handleAdd}>
          <i className="fa fa-plus mr-2"/>
          {translate(generalLanguageKeys.actions.create)}
        </button>
      </>
    ),
    [handleAdd, translate],
  );

    return (
    <>
    <CollapsibleCard title={translate(generalLanguageKeys.actions.search)} className="mb-4">
        <PermissionPageMappingModal title={translate('page.permissionPageMappingModal.title')}
                          selectedList={ permissionPageMappings }
                          setSelectedList={ setPermissionPageMappings }
                          list={list}
                          total={total}
                          isOpen={visible}
                          loading={loading}
                          toggle={handleClose}
                          onClose={handleClose}
                          filter={ permissionPageMappingFilter }
                          setFilter={setPermissionPageMappingFilter}
        />
        <Form {...formItemLayout}>
          <Row>
            <Col className="pl-1" span={8}>
              <FormItem className="mb-0" label={translate('pages.id')}>
                <AdvancedIdFilter filterType={nameof(permissionPageMappingFilter.pageId.equal)}
                                      filter={ permissionPageMappingFilter.pageId }
                                      onChange={handleFilter(nameof(permissionPageMappingFilter.pageId))}
                                      className="w-100"/>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div className="d-flex justify-content-end mt-2">
          <button className="btn btn-sm btn-primary mr-2" onClick={handleSearch}>
            <i className="fa fa-search mr-2"/>
            {translate(generalLanguageKeys.actions.filter)}
          </button>
          <button className="btn btn-sm btn-outline-secondary text-dark" onClick={handleReset}>
            <i className="fa mr-2 fa-times"/>
            {translate(generalLanguageKeys.actions.reset)}
          </button>
        </div>
      </CollapsibleCard>
      <Table pagination={pagination}
             dataSource={dataSource}
             columns={columns}
             onChange={handleTableChange}
             tableLayout="fixed"
             bordered={true}
             size="small"
             title={tableTitle}
             footer={tableFooter}
      />
    </>
  );
}

export default PermissionPageMappingTable;