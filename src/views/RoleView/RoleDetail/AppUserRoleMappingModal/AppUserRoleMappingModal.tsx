import React, {Dispatch, SetStateAction} from 'react';
import {ColumnProps} from 'antd/lib/table';
import { AppUser } from 'models/AppUser';
import {useTranslation} from 'react-i18next';
import { AppUserFilter } from 'models/AppUserFilter';
import nameof from 'ts-nameof.macro';
import {crudService} from 'core/services';
import ContentModal, {ContentModalProps} from 'components/ContentModal/ContentModal';
import {tableService} from 'services';
import Form from 'antd/lib/form';
import {formItemLayout} from 'config/ant-design/form';
import {Col, Row} from 'antd/lib/grid';
import AdvancedStringFilter from 'components/AdvancedStringFilter/AdvancedStringFilter';

const {Item: FormItem} = Form;

export interface RoleAppUserMappingModalProps extends ContentModalProps<AppUser> {
  title: string;

  selectedList: AppUser[];

  setSelectedList: Dispatch<SetStateAction<AppUser[]>>;

  list: AppUser[];

  loading: boolean;

  filter: AppUserFilter;

  setFilter: Dispatch<SetStateAction<AppUserFilter>>;

  total: number;
}

function RoleAppUserMappingModal(props: RoleAppUserMappingModalProps) {
  const [translate] = useTranslation();

  const {
    list,
    filter,
    setFilter,
    selectedList,
    setSelectedList,
    total,
    ...restProps
  } = props;

  const columns: ColumnProps<AppUser>[] = React.useMemo(
    () => {
      return [
        {
          title: translate('appUsers.id'),
          key: nameof(list[0].id),
          dataIndex: nameof(list[0].id),
        },
        {
          title: translate('appUsers.name'),
          key: nameof(list[0].name),
          dataIndex: nameof(list[0].name),
        },
      ];
    },
    [list, translate],
  );

  const [pagination] = tableService.useMasterTable(filter, setFilter, total);

  const [
    handleChangeFilterSimpleField,
  ] = crudService.useChangeHandlers<AppUserFilter>(filter, setFilter);

  return (
    <ContentModal  {...restProps}
                   pagination={pagination}
                   columns={columns}
                   selectedList={selectedList}
                   setSelectedList={setSelectedList}
                   list={list}
    >
      <Form {...formItemLayout}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
            <FormItem label={translate('appUsers.id')}>
              <AdvancedStringFilter filter={filter.id}
                                    filterType={nameof(filter.id)}
                                    onChange={handleChangeFilterSimpleField(nameof(filter.id))}/>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </ContentModal>
  );
}

export default RoleAppUserMappingModal;
