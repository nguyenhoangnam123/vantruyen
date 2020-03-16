import React from 'react';
import DatePicker from 'antd/lib/date-picker';
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
import './ApplicationUserDetail.scss';
import {applicationUserRepository} from 'views/ApplicationUserView/ApplicationUserRepository';
import {ApplicationUser} from 'models/ApplicationUser';

import {UserStatus} from 'models/UserStatus';

import ApplicationUserRoleMappingTable
  from 'views/ApplicationUserView/ApplicationUserDetail/ApplicationUserRoleMappingTable/ApplicationUserRoleMappingTable';

const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function ApplicationUserDetail() {
  const [translate] = useTranslation();

  // Service goback
  const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
  const [
    applicationUser,
    setApplicationUser,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    ApplicationUser,
    applicationUserRepository.get,
    applicationUserRepository.save,
  );

  const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<ApplicationUser>(applicationUser, setApplicationUser);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  const [userStatusList] = crudService.useEnumList<UserStatus>(applicationUserRepository.singleListUserStatus);

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('applicationUsers.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('applicationUsers.id')}
                      validateStatus={formService.getValidationStatus<ApplicationUser>(applicationUser.errors, nameof(applicationUser.id))}
                      help={applicationUser.errors?.id}
            >
              <InputNumber defaultValue={applicationUser.id}
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(applicationUser.id))}
              />
            </FormItem>


            <FormItem label={translate('applicationUsers.username')}
                      validateStatus={formService.getValidationStatus<ApplicationUser>(applicationUser.errors, nameof(applicationUser.username))}
                      help={applicationUser.errors?.username}
            >
              <input type="text"
                     defaultValue={applicationUser.username}
                     className="form-control form-control-sm"
                     onChange={handleChangeSimpleField(nameof(applicationUser.username))}
              />
            </FormItem>


            <FormItem label={translate('applicationUsers.password')}
                      validateStatus={formService.getValidationStatus<ApplicationUser>(applicationUser.errors, nameof(applicationUser.password))}
                      help={applicationUser.errors?.password}
            >
              <input type="text"
                     defaultValue={applicationUser.password}
                     className="form-control form-control-sm"
                     onChange={handleChangeSimpleField(nameof(applicationUser.password))}
              />
            </FormItem>


            <FormItem label={translate('applicationUsers.displayName')}
                      validateStatus={formService.getValidationStatus<ApplicationUser>(applicationUser.errors, nameof(applicationUser.displayName))}
                      help={applicationUser.errors?.displayName}
            >
              <input type="text"
                     defaultValue={applicationUser.displayName}
                     className="form-control form-control-sm"
                     onChange={handleChangeSimpleField(nameof(applicationUser.displayName))}
              />
            </FormItem>


            <FormItem label={translate('applicationUsers.email')}
                      validateStatus={formService.getValidationStatus<ApplicationUser>(applicationUser.errors, nameof(applicationUser.email))}
                      help={applicationUser.errors?.email}
            >
              <input type="text"
                     defaultValue={applicationUser.email}
                     className="form-control form-control-sm"
                     onChange={handleChangeSimpleField(nameof(applicationUser.email))}
              />
            </FormItem>


            <FormItem label={translate('applicationUsers.phone')}
                      validateStatus={formService.getValidationStatus<ApplicationUser>(applicationUser.errors, nameof(applicationUser.phone))}
                      help={applicationUser.errors?.phone}
            >
              <input type="text"
                     defaultValue={applicationUser.phone}
                     className="form-control form-control-sm"
                     onChange={handleChangeSimpleField(nameof(applicationUser.phone))}
              />
            </FormItem>


            <FormItem label={translate('applicationUsers.createdAt')}
                      validateStatus={formService.getValidationStatus<ApplicationUser>(applicationUser.errors, nameof(applicationUser.createdAt))}
                      help={applicationUser.errors?.createdAt}
            >
              <DatePicker defaultValue={applicationUser.createdAt}
                          onChange={handleChangeDateField(nameof(applicationUser.createdAt))}
                          className="w-100"
              />
            </FormItem>


            <FormItem label={translate('applicationUsers.updatedAt')}
                      validateStatus={formService.getValidationStatus<ApplicationUser>(applicationUser.errors, nameof(applicationUser.updatedAt))}
                      help={applicationUser.errors?.updatedAt}
            >
              <DatePicker defaultValue={applicationUser.updatedAt}
                          onChange={handleChangeDateField(nameof(applicationUser.updatedAt))}
                          className="w-100"
              />
            </FormItem>


            <FormItem label={translate('applicationUsers.deletedAt')}
                      validateStatus={formService.getValidationStatus<ApplicationUser>(applicationUser.errors, nameof(applicationUser.deletedAt))}
                      help={applicationUser.errors?.deletedAt}
            >
              <DatePicker defaultValue={applicationUser.deletedAt}
                          onChange={handleChangeDateField(nameof(applicationUser.deletedAt))}
                          className="w-100"
              />
            </FormItem>


            <Select value={applicationUser.userStatus?.id}
                    onChange={handleChangeObjectField(nameof(applicationUser.userStatus))}
                    list={userStatusList}
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

            <TabPane key="1" tab={translate('applicationUser.tabs.roles.title')}>
              <ApplicationUserRoleMappingTable model={applicationUser}
                                               setModel={setApplicationUser}
                                               field={(nameof(applicationUser.applicationUserRoleMappings))}
                                               onChange={handleChangeSimpleField(nameof(applicationUser.applicationUserRoleMappings))}
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

export default ApplicationUserDetail;
