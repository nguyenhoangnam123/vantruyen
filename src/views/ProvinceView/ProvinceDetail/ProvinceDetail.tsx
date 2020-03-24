import React from 'react';
import { crudService, routerService } from 'core/services';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import { useTranslation } from 'react-i18next';
import { generalLanguageKeys } from 'config/consts';
import nameof from 'ts-nameof.macro';
import { defaultDetailFormLayout } from 'config/ant-design/form';
import { formService } from 'core/services/FormService';
import './ProvinceDetail.scss';
import { provinceRepository } from 'views/ProvinceView/ProvinceRepository';
import { Province } from 'models/Province';


const { Item: FormItem } = Form;

function ProvinceDetail() {
  const [translate] = useTranslation();

  // Service goback
  const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
  const [
    province,
    setProvince,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    Province,
    provinceRepository.get,
    provinceRepository.save,
  );

  const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<Province>(province, setProvince);

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left" />
            </button>
            {isDetail ? translate('provinces.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary mr-2" onClick={handleSave}>
              <i className="fa mr-2 fa-save" />
              {translate(generalLanguageKeys.actions.save)}
            </button>
            <button className="btn btn-sm btn-outline-primary mr-2" onClick={handleGoBack}>
              <i className="fa mr-2 fa-times-circle" />
              {translate(generalLanguageKeys.actions.cancel)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>
            <FormItem label={translate('provinces.name')}
              validateStatus={formService.getValidationStatus<Province>(province.errors, nameof(province.name))}
              help={province.errors?.name}
            >
              <input type="text"
                defaultValue={province.name}
                className="form-control form-control-sm"
                onChange={handleChangeSimpleField(nameof(province.name))}
              />
            </FormItem>
            <FormItem label={translate('provinces.priority')}
              validateStatus={formService.getValidationStatus<Province>(province.errors, nameof(province.priority))}
              help={province.errors?.priority}
            >
              <input type="number"
                defaultValue={province.priority}
                className="form-control form-control-sm"
                onChange={handleChangeSimpleField(nameof(province.priority))}
              />
            </FormItem>
          </Form>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-sm btn-primary mr-2" onClick={handleSave}>
              <i className="fa mr-2 fa-save" />
              {translate(generalLanguageKeys.actions.save)}
            </button>
            <button className="btn btn-sm btn-outline-primary mr-2" onClick={handleGoBack}>
              <i className="fa mr-2 fa-times-circle" />
              {translate(generalLanguageKeys.actions.cancel)}
            </button>
          </div>
        </Card>
      </Spin>
    </div>
  );
}

export default ProvinceDetail;
