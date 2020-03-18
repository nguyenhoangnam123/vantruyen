import React from 'react';
import { ContentTableProps } from 'react3l';
import { crudService, formService } from 'core/services';
import Table, { ColumnProps } from 'antd/lib/table';
import { tableService } from 'services';
import { getOrderTypeForTable, renderMasterIndex } from 'helpers/ant-design/table';
import nameof from 'ts-nameof.macro';
import { useTranslation } from 'react-i18next';
import { generalColumnWidths, generalLanguageKeys } from 'config/consts';
import Form from 'antd/lib/form';
import { formItemLayout } from 'config/ant-design/form';
import { Col, Row } from 'antd/lib/grid';
import AdvancedIdFilter from 'components/AdvancedIdFilter/AdvancedIdFilter';
import CollapsibleCard from 'components/CollapsibleCard/CollapsibleCard';

import { viewRepository } from 'views/ViewView/ViewRepository';
import { View } from 'models/View';
import { Page } from 'models/Page';
import { PageFilter } from 'models/PageFilter';
const { Item: FormItem } = Form;

function PageTable(props: ContentTableProps<View, Page>) {
  const [translate] = useTranslation();

  const {
    model,
    setModel,
  } = props;

  const [
    pages,
    setPages,
    handleAdd,
    handleDelete,
  ] = crudService.useContentTable<View, Page>(
    model,
    setModel,
    nameof(model.pages),
  );

  const [
    pageFilter,
    setPageFilter,
  ] = React.useState<PageFilter>(
    new PageFilter(),
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
    pages,
    pageFilter,
    setPageFilter,
  );

  const columns: ColumnProps<Page>[] = React.useMemo(
    () => [
      {
        title: translate(generalLanguageKeys.columns.index),
        key: nameof(generalLanguageKeys.columns.index),
        width: generalColumnWidths.index,
        render: renderMasterIndex<Page>(pagination),
      },
      {
        title: translate('pages.id'),
        key: nameof(dataSource[0].id),
        dataIndex: nameof(dataSource[0].id),
        render: renderMasterIndex<Page>(pagination),
      },
      {
        title: translate('pages.name'),
        key: nameof(dataSource[0].name),
        dataIndex: nameof(dataSource[0].name),
        sorter: true,
        sortOrder: getOrderTypeForTable<View>(nameof(dataSource[0].name), sorter),
        render(name: string, page: Page) {
          return (
            <FormItem validateStatus={formService.getValidationStatus<Page>(page.errors, nameof(page.name))}
              help={page.errors?.name}
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
        render(...params: [Page, Page, number]) {
          return (
            <>
              <button className="btn btn-link mr-2" onClick={handleDelete(params[2])}>
                <i className="fa fa-trash text-danger" />
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
          <i className="fa fa-plus mr-2" />
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
              <FormItem className="mb-0" label={translate('views.id')}>
                {/* <AdvancedIdFilter filterType={nameof(pageFilter.viewId.equal)}
                                      filter={ pageFilter.viewId }
                                      onChange={handleFilter(nameof(pageFilter.viewId))}
                                      className="w-100"/> */}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div className="d-flex justify-content-end mt-2">
          <button className="btn btn-sm btn-primary mr-2" onClick={handleSearch}>
            <i className="fa fa-search mr-2" />
            {translate(generalLanguageKeys.actions.filter)}
          </button>
          <button className="btn btn-sm btn-outline-secondary text-dark" onClick={handleReset}>
            <i className="fa mr-2 fa-times" />
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

export default PageTable;
