import React from 'react';
import { crudService, routerService } from 'core/services';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Tabs from 'antd/lib/tabs';
import { useTranslation } from 'react-i18next';
import { generalLanguageKeys } from 'config/consts';
import nameof from 'ts-nameof.macro';
import { defaultDetailFormLayout } from 'config/ant-design/form';
import InputNumber from 'components/InputNumber/InputNumber';
import { formService } from 'core/services/FormService';
import './RoleDetail.scss';
import { roleRepository } from 'views/RoleView/RoleRepository';
import { Role } from 'models/Role';






import ApplicationUserRoleMappingTable from 'views/RoleView/RoleDetail/ApplicationUserRoleMappingTable/ApplicationUserRoleMappingTable';




const { TabPane } = Tabs;

const { Item: FormItem } = Form;

function RoleDetail() {
  const [translate] = useTranslation();

  // Service goback
  const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
  const [
    role,
    setRole,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    Role,
    roleRepository.get,
    roleRepository.save,
  );

  const [
    handleChangeSimpleField,
  ] = crudService.useChangeHandlers<Role>(role, setRole);

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left" />
            </button>
            {isDetail ? translate('roles.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save" />
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>
            <FormItem label={translate('roles.id')}
              validateStatus={formService.getValidationStatus<Role>(role.errors, nameof(role.id))}
              help={role.errors?.id}
            >
              <InputNumber defaultValue={role.id}
                className="w-100"
                onChange={handleChangeSimpleField(nameof(role.id))}
              />
            </FormItem>

            <FormItem label={translate('roles.name')}
              validateStatus={formService.getValidationStatus<Role>(role.errors, nameof(role.name))}
              help={role.errors?.name}
            >
              <input type="text"
                defaultValue={role.name}
                className="form-control form-control-sm"
                onChange={handleChangeSimpleField(nameof(role.name))}
              />
            </FormItem>

          </Form>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save" />
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
        </Card>
        <Card className="mt-2">
          <Tabs defaultActiveKey="1">
            <TabPane key="1" tab={translate('role.tabs.roles.title')}>
              <ApplicationUserRoleMappingTable model={role}
                setModel={setRole}
                field={(nameof(role.applicationUserRoleMappings))}
                onChange={handleChangeSimpleField(nameof(role.applicationUserRoleMappings))}
              />
            </TabPane>
          </Tabs>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save" />
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
        </Card>
      </Spin>
    </div>
  );
}

export default RoleDetail;
