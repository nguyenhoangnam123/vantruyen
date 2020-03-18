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
import './TaxTypeDetail.scss';
import { taxTypeRepository }  from 'views/TaxTypeView/TaxTypeRepository';
import { TaxType } from 'models/TaxType';



















const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function TaxTypeDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    taxType,
    setTaxType,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    TaxType,
    taxTypeRepository.get,
    taxTypeRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<TaxType>(taxType, setTaxType);

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
            {isDetail ? translate('taxTypes.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('taxTypes.id')}
                      validateStatus={formService.getValidationStatus<TaxType>(taxType.errors, nameof(taxType.id))}
                      help={ taxType.errors?.id }
            >
              <InputNumber defaultValue={ taxType.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(taxType.id))}
              />
            </FormItem>




            <FormItem label={translate('taxTypes.code')}
                      validateStatus={formService.getValidationStatus<TaxType>(taxType.errors, nameof(taxType.code))}
                      help={ taxType.errors?.code }
            >
              <input type="text"
                           defaultValue={ taxType.code }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(taxType.code))}
              />
            </FormItem>




            <FormItem label={translate('taxTypes.name')}
                      validateStatus={formService.getValidationStatus<TaxType>(taxType.errors, nameof(taxType.name))}
                      help={ taxType.errors?.name }
            >
              <input type="text"
                           defaultValue={ taxType.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(taxType.name))}
              />
            </FormItem>




            <FormItem label={translate('taxTypes.percentage')}
                      validateStatus={formService.getValidationStatus<TaxType>(taxType.errors, nameof(taxType.percentage))}
                      help={ taxType.errors?.percentage }
            >
            </FormItem>




            <FormItem label={translate('taxTypes.isActive')}
                      validateStatus={formService.getValidationStatus<TaxType>(taxType.errors, nameof(taxType.isActive))}
                      help={ taxType.errors?.isActive }
            >
            </FormItem>




            <FormItem label={translate('taxTypes.createdAt')}
                      validateStatus={formService.getValidationStatus<TaxType>(taxType.errors, nameof(taxType.createdAt))}
                      help={ taxType.errors?.createdAt }
            >
              <DatePicker defaultValue={ taxType.createdAt }
                          onChange={handleChangeDateField(nameof(taxType.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('taxTypes.updatedAt')}
                      validateStatus={formService.getValidationStatus<TaxType>(taxType.errors, nameof(taxType.updatedAt))}
                      help={ taxType.errors?.updatedAt }
            >
              <DatePicker defaultValue={ taxType.updatedAt }
                          onChange={handleChangeDateField(nameof(taxType.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('taxTypes.deletedAt')}
                      validateStatus={formService.getValidationStatus<TaxType>(taxType.errors, nameof(taxType.deletedAt))}
                      help={ taxType.errors?.deletedAt }
            >
              <DatePicker defaultValue={ taxType.deletedAt }
                          onChange={handleChangeDateField(nameof(taxType.deletedAt))}
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

export default TaxTypeDetail;