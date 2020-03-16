import React from 'react';
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
import './ProviderDetail.scss';
import { providerRepository }  from 'views/ProviderView/ProviderRepository';
import { Provider } from 'models/Provider';
























const {Item: FormItem} = Form;

function ProviderDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    provider,
    setProvider,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    Provider,
    providerRepository.get,
    providerRepository.save,
  );

    const [
    handleChangeSimpleField,
  ] = crudService.useChangeHandlers<Provider>(provider, setProvider);

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('providers.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>
            <FormItem label={translate('providers.id')}
                      validateStatus={formService.getValidationStatus<Provider>(provider.errors, nameof(provider.id))}
                      help={ provider.errors?.id }
            >
              <InputNumber defaultValue={ provider.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(provider.id))}
              />
            </FormItem>

            <FormItem label={translate('providers.name')}
                      validateStatus={formService.getValidationStatus<Provider>(provider.errors, nameof(provider.name))}
                      help={ provider.errors?.name }
            >
              <input type="text"
                           defaultValue={ provider.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(provider.name))}
              />
            </FormItem>
            <FormItem label={translate('providers.googleRedirectUri')}
                      validateStatus={formService.getValidationStatus<Provider>(provider.errors, nameof(provider.googleRedirectUri))}
                      help={ provider.errors?.googleRedirectUri }
            >
              <input type="text"
                           defaultValue={ provider.googleRedirectUri }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(provider.googleRedirectUri))}
              />
            </FormItem>

            <FormItem label={translate('providers.aDIP')}
                      validateStatus={formService.getValidationStatus<Provider>(provider.errors, nameof(provider.aDIP))}
                      help={ provider.errors?.aDIP }
            >
              <input type="text"
                           defaultValue={ provider.aDIP }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(provider.aDIP))}
              />
            </FormItem>
            <FormItem label={translate('providers.aDUsername')}
                      validateStatus={formService.getValidationStatus<Provider>(provider.errors, nameof(provider.aDUsername))}
                      help={ provider.errors?.aDUsername }
            >
              <input type="text"
                           defaultValue={ provider.aDUsername }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(provider.aDUsername))}
              />
            </FormItem>

            <FormItem label={translate('providers.aDPassword')}
                      validateStatus={formService.getValidationStatus<Provider>(provider.errors, nameof(provider.aDPassword))}
                      help={ provider.errors?.aDPassword }
            >
              <input type="text"
                           defaultValue={ provider.aDPassword }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(provider.aDPassword))}
              />
            </FormItem>

            <FormItem label={translate('providers.googleClient')}
                      validateStatus={formService.getValidationStatus<Provider>(provider.errors, nameof(provider.googleClient))}
                      help={ provider.errors?.googleClient }
            >
              <input type="text"
                           defaultValue={ provider.googleClient }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(provider.googleClient))}
              />
            </FormItem>

            <FormItem label={translate('providers.googleClientSecret')}
                      validateStatus={formService.getValidationStatus<Provider>(provider.errors, nameof(provider.googleClientSecret))}
                      help={ provider.errors?.googleClientSecret }
            >
              <input type="text"
                           defaultValue={ provider.googleClientSecret }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(provider.googleClientSecret))}
              />
            </FormItem>

            <FormItem label={translate('providers.microsoftClient')}
                      validateStatus={formService.getValidationStatus<Provider>(provider.errors, nameof(provider.microsoftClient))}
                      help={ provider.errors?.microsoftClient }
            >
              <input type="text"
                           defaultValue={ provider.microsoftClient }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(provider.microsoftClient))}
              />
            </FormItem>
            <FormItem label={translate('providers.microsoftClientSecret')}
                      validateStatus={formService.getValidationStatus<Provider>(provider.errors, nameof(provider.microsoftClientSecret))}
                      help={ provider.errors?.microsoftClientSecret }
            >
              <input type="text"
                           defaultValue={ provider.microsoftClientSecret }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(provider.microsoftClientSecret))}
              />
            </FormItem>

            <FormItem label={translate('providers.microsoftRedirectUri')}
                      validateStatus={formService.getValidationStatus<Provider>(provider.errors, nameof(provider.microsoftRedirectUri))}
                      help={ provider.errors?.microsoftRedirectUri }
            >
              <input type="text"
                           defaultValue={ provider.microsoftRedirectUri }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(provider.microsoftRedirectUri))}
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

export default ProviderDetail;
