import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Table, {ColumnProps} from 'antd/lib/table';
import AdvancedFilter from 'components/AdvancedFilter/AdvancedFilter';
import DropdownFilter from 'components/DropdownFilter/DropdownFilter';
import {COLUMN_WIDTH, MASTER_KEYS} from 'config/consts';
import {PROVINCE_ROUTE} from 'config/route-consts';
import {withTableFilterSuffix} from 'core/helpers/string';
import {renderMasterIndex} from 'core/helpers/view';
import {useDeleteHandler, useEnumList, useMaster} from 'core/hooks';
import {useMasterTable} from 'core/hooks/useMasterTable';
import {Merchant} from 'models/Merchant';
import {MerchantSearch} from 'models/MerchantSearch';
import {Product} from 'models/Product';
import {ProductSearch} from 'models/ProductSearch';
import {ProductType} from 'models/ProductType';
import React from 'react';
import {useTranslation} from 'react-i18next';
import nameof from 'ts-nameof.macro';
import repository from 'views/ProductView/ProductMaster/ProductMasterRepository';
import './ProductMaster.scss';

const columnWidth = {
  index: COLUMN_WIDTH.index,
  id: undefined,
  name: undefined,
  type: undefined,
  merchant: undefined,
  actions: COLUMN_WIDTH.actions,
};

function ProductMaster() {
  const [translate] = useTranslation();

  const [search, setSearch] = React.useState<ProductSearch>(new ProductSearch());

  // tslint:disable-next-line:max-line-length
  const [list, total, loading, setLoading, handleAdd, handleReset, handleEdit, handleFilter] = useMaster<Product, ProductSearch>(PROVINCE_ROUTE, repository.list, repository.count, search, setSearch);

  const [pagination, sorter, handleTableChange] = useMasterTable<Product, ProductSearch>(search, setSearch, total);

  const handleDelete = useDeleteHandler<Product, ProductSearch>(repository.delete, setLoading, search, setSearch);

  /**
   * -------------------------------------------------------------------------------------------------------------------
   * Enums
   */
  const [productTypes] = useEnumList<ProductType>(repository.singleListProductType);
  // const [productStatus] = useEnumList<ProductStatus>(repository.singleListProductStatus);
  /**
   * -------------------------------------------------------------------------------------------------------------------
   */

  /**
   * -------------------------------------------------------------------------------------------------------------------
   * Reference search
   */
  const [merchantSearch, setMerchantSearch] = React.useState<MerchantSearch>(new MerchantSearch());
  /**
   * End of reference search
   * -------------------------------------------------------------------------------------------------------------------
   */

  const columns: Array<ColumnProps<Product>> = React.useMemo(
    () => {
      return [
        {
          title: translate(MASTER_KEYS.index),
          key: nameof(MASTER_KEYS.index),
          width: columnWidth.index,
          className: 'center',
          dataIndex: nameof(list[0].id),
          children: [
            {
              key: withTableFilterSuffix(nameof(MASTER_KEYS.index)),
              width: columnWidth.index,
              className: 'center',
              dataIndex: nameof(list[0].id),
              render: renderMasterIndex<Product>(pagination),
            },
          ],
        },
        {
          title: translate('product.id'),
          key: nameof(list[0].id),
          width: columnWidth.id,
          dataIndex: nameof(list[0].id),
          sorter: true,
          sortOrder: ProductSearch.getOrderTypeForTable<Product>(nameof(list[0].id), sorter),
          children: [
            {
              title: (
                <AdvancedFilter
                  filter={search.id}
                  defaultType={nameof(search.id.equal)}
                  onChange={handleFilter(nameof(search.id))}
                />
              ),
              key: withTableFilterSuffix(nameof(list[0].id)),
              width: columnWidth.id,
              dataIndex: nameof(list[0].id),
            },
          ],
        },
        {
          title: translate('product.name'),
          key: nameof(list[0].name),
          width: columnWidth.name,
          dataIndex: nameof(list[0].name),
          sorter: true,
          sortOrder: ProductSearch.getOrderTypeForTable<Product>(nameof(list[0].name), sorter),
          children: [
            {
              title: (
                <AdvancedFilter
                  filter={search.name}
                  defaultType={nameof(search.name.startWith)}
                  onChange={handleFilter(nameof(search.name))}
                />
              ),
              key: withTableFilterSuffix(nameof(list[0].name)),
              width: columnWidth.name,
              dataIndex: nameof(list[0].name),
            },
          ],
        },
        {
          title: translate('product.type'),
          key: nameof(list[0].type),
          width: columnWidth.type,
          dataIndex: nameof(list[0].type),
          sorter: true,
          sortOrder: ProductSearch.getOrderTypeForTable<Product>(nameof(list[0].typeId), sorter),
          children: [
            {
              title: (
                <DropdownFilter
                  list={productTypes}
                  filter={search.typeId}
                  onChange={handleFilter(nameof(search.typeId))}
                />
              ),
              key: withTableFilterSuffix(nameof(list[0].type)),
              width: columnWidth.type,
              dataIndex: nameof(list[0].type),
              render(productType: ProductType) {
                return productType?.name;
              },
            },
          ],
        },
        {
          title: translate('product.merchant'),
          key: nameof(list[0].merchant),
          width: columnWidth.merchant,
          dataIndex: nameof(list[0].merchant),
          sorter: true,
          sortOrder: ProductSearch.getOrderTypeForTable<Product>(nameof(list[0].merchantId), sorter),
          children: [
            {
              title: (
                <DropdownFilter
                  filter={search.merchantId}
                  getList={repository.singleListMerchant}
                  search={merchantSearch}
                  setSearch={setMerchantSearch}
                  onChange={handleFilter(nameof(search.merchantId))}
                />
              ),
              key: withTableFilterSuffix(nameof(list[0].merchant)),
              width: columnWidth.merchant,
              dataIndex: nameof(list[0].merchant),
              render(merchant: Merchant) {
                return merchant?.name;
              },
            },
          ],
        },
        {
          title: translate(MASTER_KEYS.actions),
          key: nameof(MASTER_KEYS.actions),
          width: columnWidth.actions,
          className: 'center actions',
          children: [
            {
              key: withTableFilterSuffix(nameof(MASTER_KEYS.actions)),
              dataIndex: nameof(list[0].id),
              width: columnWidth.actions,
              className: 'center actions filter-placeholder',
              render: (id: number, product: Product) => {
                return (
                  <>
                    <Button htmlType="button" type="link" onClick={handleEdit(id)}>
                      {translate('general.actions.edit')}
                    </Button>
                    <Button htmlType="button" type="link" onClick={handleDelete(product)}>
                      {translate('general.actions.delete')}
                    </Button>
                  </>
                );
              },
            },
          ],
        },
      ];
    },
    // tslint:disable-next-line:max-line-length
    [handleDelete, handleEdit, handleFilter, list, merchantSearch, pagination, productTypes, search.id, search.merchantId, search.name, search.typeId, sorter, translate],
  );

  return (
    <Card title={translate('product.master.title')}>
      <Table
        tableLayout="fixed"
        className="master-table product-master-table"
        rowKey="id"
        size="small"
        bordered
        pagination={pagination}
        columns={columns}
        dataSource={list}
        loading={loading}
        onChange={handleTableChange}
        title={() => (
          <div className="table-actions">
            <Button htmlType="button" type="primary" icon="plus" onClick={handleAdd}>
              {translate('general.actions.add')}
            </Button>
            <Button htmlType="button" type="default" icon="filter" onClick={handleReset}>
              {translate('general.actions.reset')}
            </Button>
          </div>
        )}
      />
    </Card>
  );
}

export default ProductMaster;