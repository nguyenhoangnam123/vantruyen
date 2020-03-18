import React from 'react';
import DatePicker from 'antd/lib/date-picker';
import Switch from 'antd/lib/switch';
import {crudService, routerService} from 'core/services';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Tabs from 'antd/lib/tabs';
import {useTranslation} from 'react-i18next';
import {generalLanguageKeys} from 'config/consts';
import Select from 'components/Select/Select';
import nameof from 'ts-nameof.macro';
import {defaultDetailFormLayout} from 'config/ant-design/form';
import InputNumber from 'components/InputNumber/InputNumber';
import {formService} from 'core/services/FormService';
import './PermissionDetail.scss';
import { permissionRepository }  from 'views/PermissionView/PermissionRepository';
import { Permission } from 'models/Permission';








// import { Menu } from 'models/Menu'
// import { MenuFilter } from 'models/MenuFilter'


import { Role } from 'models/Role';
import { RoleFilter } from 'models/RoleFilter';




import PermissionFieldMappingTable from 'views/PermissionView/PermissionDetail/PermissionFieldMappingTable/PermissionFieldMappingTable';



import PermissionPageMappingTable from 'views/PermissionView/PermissionDetail/PermissionPageMappingTable/PermissionPageMappingTable';


const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function PermissionDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    permission,
    setPermission,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    Permission,
    permissionRepository.get,
    permissionRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<Permission>(permission, setPermission);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  // const [menuFilter, setMenuFilter] = React.useState<MenuFilter>(new MenuFilter());

  const [roleFilter, setRoleFilter] = React.useState<RoleFilter>(new RoleFilter());

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  // const defaultMenuList: Menu[] = crudService.useDefaultList<Menu>(permission.menu);

  const defaultRoleList: Role[] = crudService.useDefaultList<Role>(permission.role);

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('permissions.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('permissions.id')}
                      validateStatus={formService.getValidationStatus<Permission>(permission.errors, nameof(permission.id))}
                      help={ permission.errors?.id }
            >
              <InputNumber defaultValue={ permission.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(permission.id))}
              />
            </FormItem>




            <FormItem label={translate('permissions.name')}
                      validateStatus={formService.getValidationStatus<Permission>(permission.errors, nameof(permission.name))}
                      help={ permission.errors?.name }
            >
              <input type="text"
                           defaultValue={ permission.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(permission.name))}
              />
            </FormItem>












              {/* <Select value={ permission.menu?.id }
                      onChange={handleChangeObjectField(nameof(permission.menu))}
                      getList={ permissionRepository.singleListMenu }
                      list={ defaultMenuList }
                      modelFilter={ menuFilter }
                      setModelFilter={ setMenuFilter }
                      searchField={nameof(menuFilter.id)}
              /> */}




              <Select value={ permission.role?.id }
                      onChange={handleChangeObjectField(nameof(permission.role))}
                      getList={ permissionRepository.singleListRole }
                      list={ defaultRoleList }
                      modelFilter={ roleFilter }
                      setModelFilter={ setRoleFilter }
                      searchField={nameof(roleFilter.id)}
              />







          </Form>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
        </Card>
        <Card className="mt-2">
          <Tabs defaultActiveKey="1">

            <TabPane key="1" tab={translate('permission.tabs.roles.title')}>
              <PermissionFieldMappingTable model={ permission }
                                setModel={ setPermission }
                                field={(nameof(permission.permissionFieldMappings))}
                                onChange={handleChangeSimpleField(nameof(permission.permissionFieldMappings))}
              />
            </TabPane>

            <TabPane key="1" tab={translate('permission.tabs.roles.title')}>
              <PermissionPageMappingTable model={ permission }
                                setModel={ setPermission }
                                field={(nameof(permission.permissionPageMappings))}
                                onChange={handleChangeSimpleField(nameof(permission.permissionPageMappings))}
              />
            </TabPane>

          </Tabs>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
        </Card>
      </Spin>
    </div>
  );
}

export default PermissionDetail;
