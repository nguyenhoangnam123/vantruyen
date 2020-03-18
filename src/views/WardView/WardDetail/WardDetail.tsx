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
import './WardDetail.scss';
import { wardRepository }  from 'views/WardView/WardRepository';
import { Ward } from 'models/Ward';














import { District } from 'models/District';
import { DistrictFilter } from 'models/DistrictFilter';





const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function WardDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    ward,
    setWard,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    Ward,
    wardRepository.get,
    wardRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<Ward>(ward, setWard);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  const [districtFilter, setDistrictFilter] = React.useState<DistrictFilter>(new DistrictFilter());

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  const defaultDistrictList: District[] = crudService.useDefaultList<District>(ward.district);

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('wards.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('wards.id')}
                      validateStatus={formService.getValidationStatus<Ward>(ward.errors, nameof(ward.id))}
                      help={ ward.errors?.id }
            >
              <InputNumber defaultValue={ ward.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(ward.id))}
              />
            </FormItem>




            <FormItem label={translate('wards.name')}
                      validateStatus={formService.getValidationStatus<Ward>(ward.errors, nameof(ward.name))}
                      help={ ward.errors?.name }
            >
              <input type="text"
                           defaultValue={ ward.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(ward.name))}
              />
            </FormItem>




            <FormItem label={translate('wards.priority')}
                      validateStatus={formService.getValidationStatus<Ward>(ward.errors, nameof(ward.priority))}
                      help={ ward.errors?.priority }
            >
            </FormItem>







            <FormItem label={translate('wards.createdAt')}
                      validateStatus={formService.getValidationStatus<Ward>(ward.errors, nameof(ward.createdAt))}
                      help={ ward.errors?.createdAt }
            >
              <DatePicker defaultValue={ ward.createdAt }
                          onChange={handleChangeDateField(nameof(ward.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('wards.updatedAt')}
                      validateStatus={formService.getValidationStatus<Ward>(ward.errors, nameof(ward.updatedAt))}
                      help={ ward.errors?.updatedAt }
            >
              <DatePicker defaultValue={ ward.updatedAt }
                          onChange={handleChangeDateField(nameof(ward.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('wards.deletedAt')}
                      validateStatus={formService.getValidationStatus<Ward>(ward.errors, nameof(ward.deletedAt))}
                      help={ ward.errors?.deletedAt }
            >
              <DatePicker defaultValue={ ward.deletedAt }
                          onChange={handleChangeDateField(nameof(ward.deletedAt))}
                          className="w-100"
              />
            </FormItem>





              <Select value={ ward.district?.id }
                      onChange={handleChangeObjectField(nameof(ward.district))}
                      getList={ wardRepository.singleListDistrict }
                      list={ defaultDistrictList }
                      modelFilter={ districtFilter }
                      setModelFilter={ setDistrictFilter }
                      searchField={nameof(districtFilter.id)}
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

export default WardDetail;