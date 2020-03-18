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
import './UnitOfMeasureGroupingDetail.scss';
import { unitOfMeasureGroupingRepository }  from 'views/UnitOfMeasureGroupingView/UnitOfMeasureGroupingRepository';
import { UnitOfMeasureGrouping } from 'models/UnitOfMeasureGrouping';












import { UnitOfMeasure } from 'models/UnitOfMeasure';
import { UnitOfMeasureFilter } from 'models/UnitOfMeasureFilter';





const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function UnitOfMeasureGroupingDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    unitOfMeasureGrouping,
    setUnitOfMeasureGrouping,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    UnitOfMeasureGrouping,
    unitOfMeasureGroupingRepository.get,
    unitOfMeasureGroupingRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<UnitOfMeasureGrouping>(unitOfMeasureGrouping, setUnitOfMeasureGrouping);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  const [unitOfMeasureFilter, setUnitOfMeasureFilter] = React.useState<UnitOfMeasureFilter>(new UnitOfMeasureFilter());

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  const defaultUnitOfMeasureList: UnitOfMeasure[] = crudService.useDefaultList<UnitOfMeasure>(unitOfMeasureGrouping.unitOfMeasure);

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('unitOfMeasureGroupings.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('unitOfMeasureGroupings.id')}
                      validateStatus={formService.getValidationStatus<UnitOfMeasureGrouping>(unitOfMeasureGrouping.errors, nameof(unitOfMeasureGrouping.id))}
                      help={ unitOfMeasureGrouping.errors?.id }
            >
              <InputNumber defaultValue={ unitOfMeasureGrouping.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(unitOfMeasureGrouping.id))}
              />
            </FormItem>




            <FormItem label={translate('unitOfMeasureGroupings.name')}
                      validateStatus={formService.getValidationStatus<UnitOfMeasureGrouping>(unitOfMeasureGrouping.errors, nameof(unitOfMeasureGrouping.name))}
                      help={ unitOfMeasureGrouping.errors?.name }
            >
              <input type="text"
                           defaultValue={ unitOfMeasureGrouping.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(unitOfMeasureGrouping.name))}
              />
            </FormItem>







            <FormItem label={translate('unitOfMeasureGroupings.createdAt')}
                      validateStatus={formService.getValidationStatus<UnitOfMeasureGrouping>(unitOfMeasureGrouping.errors, nameof(unitOfMeasureGrouping.createdAt))}
                      help={ unitOfMeasureGrouping.errors?.createdAt }
            >
              <DatePicker defaultValue={ unitOfMeasureGrouping.createdAt }
                          onChange={handleChangeDateField(nameof(unitOfMeasureGrouping.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('unitOfMeasureGroupings.updatedAt')}
                      validateStatus={formService.getValidationStatus<UnitOfMeasureGrouping>(unitOfMeasureGrouping.errors, nameof(unitOfMeasureGrouping.updatedAt))}
                      help={ unitOfMeasureGrouping.errors?.updatedAt }
            >
              <DatePicker defaultValue={ unitOfMeasureGrouping.updatedAt }
                          onChange={handleChangeDateField(nameof(unitOfMeasureGrouping.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('unitOfMeasureGroupings.deletedAt')}
                      validateStatus={formService.getValidationStatus<UnitOfMeasureGrouping>(unitOfMeasureGrouping.errors, nameof(unitOfMeasureGrouping.deletedAt))}
                      help={ unitOfMeasureGrouping.errors?.deletedAt }
            >
              <DatePicker defaultValue={ unitOfMeasureGrouping.deletedAt }
                          onChange={handleChangeDateField(nameof(unitOfMeasureGrouping.deletedAt))}
                          className="w-100"
              />
            </FormItem>





              <Select value={ unitOfMeasureGrouping.unitOfMeasure?.id }
                      onChange={handleChangeObjectField(nameof(unitOfMeasureGrouping.unitOfMeasure))}
                      getList={ unitOfMeasureGroupingRepository.singleListUnitOfMeasure }
                      list={ defaultUnitOfMeasureList }
                      modelFilter={ unitOfMeasureFilter }
                      setModelFilter={ setUnitOfMeasureFilter }
                      searchField={nameof(unitOfMeasureFilter.id)}
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

export default UnitOfMeasureGroupingDetail;