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
import './ProvinceDetail.scss';
import { provinceRepository }  from 'views/ProvinceView/ProvinceRepository';
import { Province } from 'models/Province';

















const {TabPane} = Tabs;

const {Item: FormItem} = Form;

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
            {isDetail ? translate('provinces.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('provinces.id')}
                      validateStatus={formService.getValidationStatus<Province>(province.errors, nameof(province.id))}
                      help={ province.errors?.id }
            >
              <InputNumber defaultValue={ province.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(province.id))}
              />
            </FormItem>




            <FormItem label={translate('provinces.name')}
                      validateStatus={formService.getValidationStatus<Province>(province.errors, nameof(province.name))}
                      help={ province.errors?.name }
            >
              <input type="text"
                           defaultValue={ province.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(province.name))}
              />
            </FormItem>




            <FormItem label={translate('provinces.priority')}
                      validateStatus={formService.getValidationStatus<Province>(province.errors, nameof(province.priority))}
                      help={ province.errors?.priority }
            >
            </FormItem>




            <FormItem label={translate('provinces.createdAt')}
                      validateStatus={formService.getValidationStatus<Province>(province.errors, nameof(province.createdAt))}
                      help={ province.errors?.createdAt }
            >
              <DatePicker defaultValue={ province.createdAt }
                          onChange={handleChangeDateField(nameof(province.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('provinces.updatedAt')}
                      validateStatus={formService.getValidationStatus<Province>(province.errors, nameof(province.updatedAt))}
                      help={ province.errors?.updatedAt }
            >
              <DatePicker defaultValue={ province.updatedAt }
                          onChange={handleChangeDateField(nameof(province.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('provinces.deletedAt')}
                      validateStatus={formService.getValidationStatus<Province>(province.errors, nameof(province.deletedAt))}
                      help={ province.errors?.deletedAt }
            >
              <DatePicker defaultValue={ province.deletedAt }
                          onChange={handleChangeDateField(nameof(province.deletedAt))}
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

export default ProvinceDetail;