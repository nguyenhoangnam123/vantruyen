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
import './UnitOfMeasureDetail.scss';
import { unitOfMeasureRepository }  from 'views/UnitOfMeasureView/UnitOfMeasureRepository';
import { UnitOfMeasure } from 'models/UnitOfMeasure';























const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function UnitOfMeasureDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    unitOfMeasure,
    setUnitOfMeasure,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    UnitOfMeasure,
    unitOfMeasureRepository.get,
    unitOfMeasureRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<UnitOfMeasure>(unitOfMeasure, setUnitOfMeasure);

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
            {isDetail ? translate('unitOfMeasures.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('unitOfMeasures.id')}
                      validateStatus={formService.getValidationStatus<UnitOfMeasure>(unitOfMeasure.errors, nameof(unitOfMeasure.id))}
                      help={ unitOfMeasure.errors?.id }
            >
              <InputNumber defaultValue={ unitOfMeasure.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(unitOfMeasure.id))}
              />
            </FormItem>




            <FormItem label={translate('unitOfMeasures.code')}
                      validateStatus={formService.getValidationStatus<UnitOfMeasure>(unitOfMeasure.errors, nameof(unitOfMeasure.code))}
                      help={ unitOfMeasure.errors?.code }
            >
              <input type="text"
                           defaultValue={ unitOfMeasure.code }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(unitOfMeasure.code))}
              />
            </FormItem>




            <FormItem label={translate('unitOfMeasures.name')}
                      validateStatus={formService.getValidationStatus<UnitOfMeasure>(unitOfMeasure.errors, nameof(unitOfMeasure.name))}
                      help={ unitOfMeasure.errors?.name }
            >
              <input type="text"
                           defaultValue={ unitOfMeasure.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(unitOfMeasure.name))}
              />
            </FormItem>




            <FormItem label={translate('unitOfMeasures.description')}
                      validateStatus={formService.getValidationStatus<UnitOfMeasure>(unitOfMeasure.errors, nameof(unitOfMeasure.description))}
                      help={ unitOfMeasure.errors?.description }
            >
              <input type="text"
                           defaultValue={ unitOfMeasure.description }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(unitOfMeasure.description))}
              />
            </FormItem>




            <FormItem label={translate('unitOfMeasures.isActive')}
                      validateStatus={formService.getValidationStatus<UnitOfMeasure>(unitOfMeasure.errors, nameof(unitOfMeasure.isActive))}
                      help={ unitOfMeasure.errors?.isActive }
            >
            </FormItem>




            <FormItem label={translate('unitOfMeasures.createdAt')}
                      validateStatus={formService.getValidationStatus<UnitOfMeasure>(unitOfMeasure.errors, nameof(unitOfMeasure.createdAt))}
                      help={ unitOfMeasure.errors?.createdAt }
            >
              <DatePicker defaultValue={ unitOfMeasure.createdAt }
                          onChange={handleChangeDateField(nameof(unitOfMeasure.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('unitOfMeasures.updatedAt')}
                      validateStatus={formService.getValidationStatus<UnitOfMeasure>(unitOfMeasure.errors, nameof(unitOfMeasure.updatedAt))}
                      help={ unitOfMeasure.errors?.updatedAt }
            >
              <DatePicker defaultValue={ unitOfMeasure.updatedAt }
                          onChange={handleChangeDateField(nameof(unitOfMeasure.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('unitOfMeasures.deletedAt')}
                      validateStatus={formService.getValidationStatus<UnitOfMeasure>(unitOfMeasure.errors, nameof(unitOfMeasure.deletedAt))}
                      help={ unitOfMeasure.errors?.deletedAt }
            >
              <DatePicker defaultValue={ unitOfMeasure.deletedAt }
                          onChange={handleChangeDateField(nameof(unitOfMeasure.deletedAt))}
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

export default UnitOfMeasureDetail;