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
import './OrganizationDetail.scss';
import { organizationRepository }  from 'views/OrganizationView/OrganizationRepository';
import { Organization } from 'models/Organization';
// import { Organization } from 'models/Organization'
import { OrganizationFilter } from 'models/OrganizationFilter';
const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function OrganizationDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    organization,
    setOrganization,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    Organization,
    organizationRepository.get,
    organizationRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<Organization>(organization, setOrganization);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  const [organizationFilter, setOrganizationFilter] = React.useState<OrganizationFilter>(new OrganizationFilter());

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  const defaultOrganizationList: Organization[] = crudService.useDefaultList<Organization>(organization.organization);

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('organizations.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('organizations.id')}
                      validateStatus={formService.getValidationStatus<Organization>(organization.errors, nameof(organization.id))}
                      help={ organization.errors?.id }
            >
              <InputNumber defaultValue={ organization.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(organization.id))}
              />
            </FormItem>




            <FormItem label={translate('organizations.code')}
                      validateStatus={formService.getValidationStatus<Organization>(organization.errors, nameof(organization.code))}
                      help={ organization.errors?.code }
            >
              <input type="text"
                           defaultValue={ organization.code }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(organization.code))}
              />
            </FormItem>




            <FormItem label={translate('organizations.name')}
                      validateStatus={formService.getValidationStatus<Organization>(organization.errors, nameof(organization.name))}
                      help={ organization.errors?.name }
            >
              <input type="text"
                           defaultValue={ organization.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(organization.name))}
              />
            </FormItem>







            <FormItem label={translate('organizations.path')}
                      validateStatus={formService.getValidationStatus<Organization>(organization.errors, nameof(organization.path))}
                      help={ organization.errors?.path }
            >
              <input type="text"
                           defaultValue={ organization.path }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(organization.path))}
              />
            </FormItem>




            <FormItem label={translate('organizations.level')}
                      validateStatus={formService.getValidationStatus<Organization>(organization.errors, nameof(organization.level))}
                      help={ organization.errors?.level }
            >
            </FormItem>




            <FormItem label={translate('organizations.createdAt')}
                      validateStatus={formService.getValidationStatus<Organization>(organization.errors, nameof(organization.createdAt))}
                      help={ organization.errors?.createdAt }
            >
              <DatePicker defaultValue={ organization.createdAt }
                          onChange={handleChangeDateField(nameof(organization.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('organizations.updatedAt')}
                      validateStatus={formService.getValidationStatus<Organization>(organization.errors, nameof(organization.updatedAt))}
                      help={ organization.errors?.updatedAt }
            >
              <DatePicker defaultValue={ organization.updatedAt }
                          onChange={handleChangeDateField(nameof(organization.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('organizations.deletedAt')}
                      validateStatus={formService.getValidationStatus<Organization>(organization.errors, nameof(organization.deletedAt))}
                      help={ organization.errors?.deletedAt }
            >
              <DatePicker defaultValue={ organization.deletedAt }
                          onChange={handleChangeDateField(nameof(organization.deletedAt))}
                          className="w-100"
              />
            </FormItem>





              <Select value={ organization.parent?.id }
                      onChange={handleChangeObjectField(nameof(organization.parent))}
                      getList={ organizationRepository.singleListOrganization }
                      list={ defaultOrganizationList }
                      modelFilter={ organizationFilter }
                      setModelFilter={ setOrganizationFilter }
                      searchField={nameof(organizationFilter.id)}
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

export default OrganizationDetail;
