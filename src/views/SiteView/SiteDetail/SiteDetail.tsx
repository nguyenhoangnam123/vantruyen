import React from 'react';
import DatePicker from 'antd/lib/date-picker';
import {crudService, routerService} from 'core/services';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Tabs from 'antd/lib/tabs';
import {useTranslation} from 'react-i18next';
import {generalLanguageKeys} from 'config/consts';
import nameof from 'ts-nameof.macro';
import {defaultDetailFormLayout} from 'config/ant-design/form';
import InputNumber from 'components/InputNumber/InputNumber';
import {formService} from 'core/services/FormService';
import './SiteDetail.scss';
import {siteRepository} from 'views/SiteView/SiteRepository';
import {Site} from 'models/Site';

const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function SiteDetail() {
  const [translate] = useTranslation();

  // Service goback
  const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
  const [
    site,
    setSite,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    Site,
    siteRepository.get,
    siteRepository.save,
  );

  const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<Site>(site, setSite);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

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
            {isDetail ? translate('sites.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('sites.id')}
                      validateStatus={formService.getValidationStatus<Site>(site.errors, nameof(site.id))}
                      help={site.errors?.id}
            >
              <InputNumber defaultValue={site.id}
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(site.id))}
              />
            </FormItem>


            <FormItem label={translate('sites.name')}
                      validateStatus={formService.getValidationStatus<Site>(site.errors, nameof(site.name))}
                      help={site.errors?.name}
            >
              <input type="text"
                     defaultValue={site.name}
                     className="form-control form-control-sm"
                     onChange={handleChangeSimpleField(nameof(site.name))}
              />
            </FormItem>


            <FormItem label={translate('sites.uRL')}
                      validateStatus={formService.getValidationStatus<Site>(site.errors, nameof(site.uRL))}
                      help={site.errors?.uRL}
            >
              <input type="text"
                     defaultValue={site.uRL}
                     className="form-control form-control-sm"
                     onChange={handleChangeSimpleField(nameof(site.uRL))}
              />
            </FormItem>


            <FormItem label={translate('sites.status')}
                      validateStatus={formService.getValidationStatus<Site>(site.errors, nameof(site.status))}
                      help={site.errors?.status}
            >
            </FormItem>


            <FormItem label={translate('sites.createdAt')}
                      validateStatus={formService.getValidationStatus<Site>(site.errors, nameof(site.createdAt))}
                      help={site.errors?.createdAt}
            >
              <DatePicker defaultValue={site.createdAt}
                          onChange={handleChangeDateField(nameof(site.createdAt))}
                          className="w-100"
              />
            </FormItem>


            <FormItem label={translate('sites.updatedAt')}
                      validateStatus={formService.getValidationStatus<Site>(site.errors, nameof(site.updatedAt))}
                      help={site.errors?.updatedAt}
            >
              <DatePicker defaultValue={site.updatedAt}
                          onChange={handleChangeDateField(nameof(site.updatedAt))}
                          className="w-100"
              />
            </FormItem>


            <FormItem label={translate('sites.deletedAt')}
                      validateStatus={formService.getValidationStatus<Site>(site.errors, nameof(site.deletedAt))}
                      help={site.errors?.deletedAt}
            >
              <DatePicker defaultValue={site.deletedAt}
                          onChange={handleChangeDateField(nameof(site.deletedAt))}
                          className="w-100"
              />
            </FormItem>


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

export default SiteDetail;
