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
import './DistrictDetail.scss';
import { districtRepository }  from 'views/DistrictView/DistrictRepository';
import { District } from 'models/District';














import { Province } from 'models/Province';
import { ProvinceFilter } from 'models/ProvinceFilter';







const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function DistrictDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    district,
    setDistrict,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    District,
    districtRepository.get,
    districtRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<District>(district, setDistrict);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  const [provinceFilter, setProvinceFilter] = React.useState<ProvinceFilter>(new ProvinceFilter());

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  const defaultProvinceList: Province[] = crudService.useDefaultList<Province>(district.province);

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('districts.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('districts.id')}
                      validateStatus={formService.getValidationStatus<District>(district.errors, nameof(district.id))}
                      help={ district.errors?.id }
            >
              <InputNumber defaultValue={ district.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(district.id))}
              />
            </FormItem>




            <FormItem label={translate('districts.name')}
                      validateStatus={formService.getValidationStatus<District>(district.errors, nameof(district.name))}
                      help={ district.errors?.name }
            >
              <input type="text"
                           defaultValue={ district.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(district.name))}
              />
            </FormItem>




            <FormItem label={translate('districts.priority')}
                      validateStatus={formService.getValidationStatus<District>(district.errors, nameof(district.priority))}
                      help={ district.errors?.priority }
            >
            </FormItem>







            <FormItem label={translate('districts.createdAt')}
                      validateStatus={formService.getValidationStatus<District>(district.errors, nameof(district.createdAt))}
                      help={ district.errors?.createdAt }
            >
              <DatePicker defaultValue={ district.createdAt }
                          onChange={handleChangeDateField(nameof(district.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('districts.updatedAt')}
                      validateStatus={formService.getValidationStatus<District>(district.errors, nameof(district.updatedAt))}
                      help={ district.errors?.updatedAt }
            >
              <DatePicker defaultValue={ district.updatedAt }
                          onChange={handleChangeDateField(nameof(district.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('districts.deletedAt')}
                      validateStatus={formService.getValidationStatus<District>(district.errors, nameof(district.deletedAt))}
                      help={ district.errors?.deletedAt }
            >
              <DatePicker defaultValue={ district.deletedAt }
                          onChange={handleChangeDateField(nameof(district.deletedAt))}
                          className="w-100"
              />
            </FormItem>





              <Select value={ district.province?.id }
                      onChange={handleChangeObjectField(nameof(district.province))}
                      getList={ districtRepository.singleListProvince }
                      list={ defaultProvinceList }
                      modelFilter={ provinceFilter }
                      setModelFilter={ setProvinceFilter }
                      searchField={nameof(provinceFilter.id)}
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

export default DistrictDetail;