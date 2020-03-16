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

import { roleRepository } from 'views/RoleView/RoleRepository';
import { Role } from 'models/Role';
import { Permission } from 'models/Permission';
import { PermissionFilter } from 'models/PermissionFilter';
const {Item: FormItem} = Form;

function PermissionTable(props: ContentTableProps<Role, Permission>) {
  const [translate] = useTranslation();

  const {
    model,
    setModel,
  } = props;

  const [
    permissions,
    setPermissions,
    handleAdd,
    handleDelete,
  ] = crudService.useContentTable<Role, Permission>(
    model,
    setModel,
    nameof(model.permissions),
  );

  const [
    permissionFilter,
    setPermissionFilter,
  ] = React.useState<PermissionFilter>(
    new PermissionFilter()
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
    permissions,
    permissionFilter,
    setPermissionFilter,
  );

  const columns: ColumnProps<Permission>[] = React.useMemo(
    () => [
      {
        title: translate(generalLanguageKeys.columns.index),
        key: nameof(generalLanguageKeys.columns.index),
        width: generalColumnWidths.index,
        render: renderMasterIndex<Permission>(pagination),
      },
      {
        title: translate('permissions.id'),
        key: nameof(dataSource[0].id),
        dataIndex: nameof(dataSource[0].id),
        render: renderMasterIndex<Permission>(pagination),
      },
      {
        title: translate('permissions.name'),
        key: nameof(dataSource[0].name),
        dataIndex: nameof(dataSource[0].name),
        sorter: true,
        sortOrder: getOrderTypeForTable<Role>(nameof(dataSource[0].name), sorter),
        render(name: string, permission: Permission) {
          return (
            <FormItem validateStatus={formService.getValidationStatus<Permission>(permission.errors, nameof(permission.name))}
                      help={ permission.errors?.name }
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
        render(...params: [Permission, Permission, number]) {
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
        <Form {...formItemLayout}>
          <Row>
            <Col className="pl-1" span={8}>
              <FormItem className="mb-0" label={translate('roles.id')}>
                <AdvancedIdFilter filterType={nameof(permissionFilter.roleId.equal)}
                                      filter={ permissionFilter.roleId }
                                      onChange={handleFilter(nameof(permissionFilter.roleId))}
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
             footer={tableFooter}
      />
    </>
  );
}

export default PermissionTable;