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
import './AppUserDetail.scss';
import { appUserRepository }  from 'views/AppUserView/AppUserRepository';
import { AppUser } from 'models/AppUser';




















import { UserStatus } from 'models/UserStatus';




import AppUserRoleMappingTable from 'views/AppUserView/AppUserDetail/AppUserRoleMappingTable/AppUserRoleMappingTable';


const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function AppUserDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    appUser,
    setAppUser,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    AppUser,
    appUserRepository.get,
    appUserRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<AppUser>(appUser, setAppUser);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  const [userStatusList] = crudService.useEnumList<UserStatus>(appUserRepository.singleListUserStatus);

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
            {isDetail ? translate('appUsers.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('appUsers.id')}
                      validateStatus={formService.getValidationStatus<AppUser>(appUser.errors, nameof(appUser.id))}
                      help={ appUser.errors?.id }
            >
              <InputNumber defaultValue={ appUser.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(appUser.id))}
              />
            </FormItem>




            <FormItem label={translate('appUsers.username')}
                      validateStatus={formService.getValidationStatus<AppUser>(appUser.errors, nameof(appUser.username))}
                      help={ appUser.errors?.username }
            >
              <input type="text"
                           defaultValue={ appUser.username }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(appUser.username))}
              />
            </FormItem>




            <FormItem label={translate('appUsers.password')}
                      validateStatus={formService.getValidationStatus<AppUser>(appUser.errors, nameof(appUser.password))}
                      help={ appUser.errors?.password }
            >
              <input type="text"
                           defaultValue={ appUser.password }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(appUser.password))}
              />
            </FormItem>




            <FormItem label={translate('appUsers.displayName')}
                      validateStatus={formService.getValidationStatus<AppUser>(appUser.errors, nameof(appUser.displayName))}
                      help={ appUser.errors?.displayName }
            >
              <input type="text"
                           defaultValue={ appUser.displayName }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(appUser.displayName))}
              />
            </FormItem>




            <FormItem label={translate('appUsers.email')}
                      validateStatus={formService.getValidationStatus<AppUser>(appUser.errors, nameof(appUser.email))}
                      help={ appUser.errors?.email }
            >
              <input type="text"
                           defaultValue={ appUser.email }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(appUser.email))}
              />
            </FormItem>




            <FormItem label={translate('appUsers.phone')}
                      validateStatus={formService.getValidationStatus<AppUser>(appUser.errors, nameof(appUser.phone))}
                      help={ appUser.errors?.phone }
            >
              <input type="text"
                           defaultValue={ appUser.phone }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(appUser.phone))}
              />
            </FormItem>







            <FormItem label={translate('appUsers.createdAt')}
                      validateStatus={formService.getValidationStatus<AppUser>(appUser.errors, nameof(appUser.createdAt))}
                      help={ appUser.errors?.createdAt }
            >
              <DatePicker defaultValue={ appUser.createdAt }
                          onChange={handleChangeDateField(nameof(appUser.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('appUsers.updatedAt')}
                      validateStatus={formService.getValidationStatus<AppUser>(appUser.errors, nameof(appUser.updatedAt))}
                      help={ appUser.errors?.updatedAt }
            >
              <DatePicker defaultValue={ appUser.updatedAt }
                          onChange={handleChangeDateField(nameof(appUser.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('appUsers.deletedAt')}
                      validateStatus={formService.getValidationStatus<AppUser>(appUser.errors, nameof(appUser.deletedAt))}
                      help={ appUser.errors?.deletedAt }
            >
              <DatePicker defaultValue={ appUser.deletedAt }
                          onChange={handleChangeDateField(nameof(appUser.deletedAt))}
                          className="w-100"
              />
            </FormItem>




              <Select value={ appUser.userStatus?.id }
                      onChange={handleChangeObjectField(nameof(appUser.userStatus))}
                      list={ userStatusList }
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

            <TabPane key="1" tab={translate('appUser.tabs.roles.title')}>
              <AppUserRoleMappingTable model={ appUser }
                                setModel={ setAppUser }
                                field={(nameof(appUser.appUserRoleMappings))}
                                onChange={handleChangeSimpleField(nameof(appUser.appUserRoleMappings))}
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

export default AppUserDetail;