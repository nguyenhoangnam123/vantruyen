import React, {Dispatch, SetStateAction} from 'react';
import {ColumnProps} from 'antd/lib/table';
import { ApplicationUser } from 'models/ApplicationUser';
import {useTranslation} from 'react-i18next';
import { ApplicationUserFilter } from 'models/ApplicationUserFilter';
import nameof from 'ts-nameof.macro';
import {crudService} from 'core/services';
import ContentModal, {ContentModalProps} from 'components/ContentModal/ContentModal';
import {tableService} from 'services';
import Form from 'antd/lib/form';
import {formItemLayout} from 'config/ant-design/form';
import {Col, Row} from 'antd/lib/grid';
import AdvancedStringFilter from 'components/AdvancedStringFilter/AdvancedStringFilter';

const {Item: FormItem} = Form;

export interface RoleApplicationUserMappingModalProps extends ContentModalProps<ApplicationUser> {
  title: string;

  selectedList: ApplicationUser[];

  setSelectedList: Dispatch<SetStateAction<ApplicationUser[]>>;

  list: ApplicationUser[];

  loading: boolean;

  filter: ApplicationUserFilter;

  setFilter: Dispatch<SetStateAction<ApplicationUserFilter>>;

  total: number;
}

function RoleApplicationUserMappingModal(props: RoleApplicationUserMappingModalProps) {
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

  const columns: ColumnProps<ApplicationUser>[] = React.useMemo(
    () => {
      return [
        {
          title: translate('applicationUsers.id'),
          key: nameof(list[0].id),
          dataIndex: nameof(list[0].id),
        },
        {
          title: translate('applicationUsers.name'),
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
  ] = crudService.useChangeHandlers<ApplicationUserFilter>(filter, setFilter);

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
            <FormItem label={translate('applicationUsers.id')}>
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

export default RoleApplicationUserMappingModal;
