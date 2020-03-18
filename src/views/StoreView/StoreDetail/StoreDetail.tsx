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
import './StoreDetail.scss';
import { storeRepository }  from 'views/StoreView/StoreRepository';
import { Store } from 'models/Store';












































import { District } from 'models/District';
import { DistrictFilter } from 'models/DistrictFilter';


import { Organization } from 'models/Organization';
import { OrganizationFilter } from 'models/OrganizationFilter';


import { Province } from 'models/Province';
import { ProvinceFilter } from 'models/ProvinceFilter';


import { StoreGrouping } from 'models/StoreGrouping';
import { StoreGroupingFilter } from 'models/StoreGroupingFilter';


import { StoreType } from 'models/StoreType';
import { StoreTypeFilter } from 'models/StoreTypeFilter';


import { Ward } from 'models/Ward';
import { WardFilter } from 'models/WardFilter';




import StoreImageMappingTable from 'views/StoreView/StoreDetail/StoreImageMappingTable/StoreImageMappingTable';


const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function StoreDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    store,
    setStore,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    Store,
    storeRepository.get,
    storeRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<Store>(store, setStore);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  const [districtFilter, setDistrictFilter] = React.useState<DistrictFilter>(new DistrictFilter());

  const [organizationFilter, setOrganizationFilter] = React.useState<OrganizationFilter>(new OrganizationFilter());

  const [provinceFilter, setProvinceFilter] = React.useState<ProvinceFilter>(new ProvinceFilter());

  const [storeGroupingFilter, setStoreGroupingFilter] = React.useState<StoreGroupingFilter>(new StoreGroupingFilter());

  const [storeTypeFilter, setStoreTypeFilter] = React.useState<StoreTypeFilter>(new StoreTypeFilter());

  const [wardFilter, setWardFilter] = React.useState<WardFilter>(new WardFilter());

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  const defaultDistrictList: District[] = crudService.useDefaultList<District>(store.district);

  const defaultOrganizationList: Organization[] = crudService.useDefaultList<Organization>(store.organization);

  const defaultProvinceList: Province[] = crudService.useDefaultList<Province>(store.province);

  const defaultStoreGroupingList: StoreGrouping[] = crudService.useDefaultList<StoreGrouping>(store.storeGrouping);

  const defaultStoreTypeList: StoreType[] = crudService.useDefaultList<StoreType>(store.storeType);

  const defaultWardList: Ward[] = crudService.useDefaultList<Ward>(store.ward);

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('stores.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('stores.id')}
                      validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.id))}
                      help={ store.errors?.id }
            >
              <InputNumber defaultValue={ store.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(store.id))}
              />
            </FormItem>




            <FormItem label={translate('stores.code')}
                      validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.code))}
                      help={ store.errors?.code }
            >
              <input type="text"
                           defaultValue={ store.code }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(store.code))}
              />
            </FormItem>




            <FormItem label={translate('stores.name')}
                      validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.name))}
                      help={ store.errors?.name }
            >
              <input type="text"
                           defaultValue={ store.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(store.name))}
              />
            </FormItem>
















            <FormItem label={translate('stores.telephone')}
                      validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.telephone))}
                      help={ store.errors?.telephone }
            >
              <input type="text"
                           defaultValue={ store.telephone }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(store.telephone))}
              />
            </FormItem>













            <FormItem label={translate('stores.address1')}
                      validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.address1))}
                      help={ store.errors?.address1 }
            >
              <input type="text"
                           defaultValue={ store.address1 }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(store.address1))}
              />
            </FormItem>




            <FormItem label={translate('stores.address2')}
                      validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.address2))}
                      help={ store.errors?.address2 }
            >
              <input type="text"
                           defaultValue={ store.address2 }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(store.address2))}
              />
            </FormItem>




            <FormItem label={translate('stores.latitude')}
                      validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.latitude))}
                      help={ store.errors?.latitude }
            >
            </FormItem>




            <FormItem label={translate('stores.longitude')}
                      validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.longitude))}
                      help={ store.errors?.longitude }
            >
            </FormItem>




            <FormItem label={translate('stores.ownerName')}
                      validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.ownerName))}
                      help={ store.errors?.ownerName }
            >
              <input type="text"
                           defaultValue={ store.ownerName }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(store.ownerName))}
              />
            </FormItem>




            <FormItem label={translate('stores.ownerPhone')}
                      validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.ownerPhone))}
                      help={ store.errors?.ownerPhone }
            >
              <input type="text"
                           defaultValue={ store.ownerPhone }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(store.ownerPhone))}
              />
            </FormItem>




            <FormItem label={translate('stores.ownerEmail')}
                      validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.ownerEmail))}
                      help={ store.errors?.ownerEmail }
            >
              <input type="text"
                           defaultValue={ store.ownerEmail }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(store.ownerEmail))}
              />
            </FormItem>




            <FormItem label={translate('stores.isActive')}
                      validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.isActive))}
                      help={ store.errors?.isActive }
            >
            </FormItem>




            <FormItem label={translate('stores.createdAt')}
                      validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.createdAt))}
                      help={ store.errors?.createdAt }
            >
              <DatePicker defaultValue={ store.createdAt }
                          onChange={handleChangeDateField(nameof(store.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('stores.updatedAt')}
                      validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.updatedAt))}
                      help={ store.errors?.updatedAt }
            >
              <DatePicker defaultValue={ store.updatedAt }
                          onChange={handleChangeDateField(nameof(store.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('stores.deletedAt')}
                      validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.deletedAt))}
                      help={ store.errors?.deletedAt }
            >
              <DatePicker defaultValue={ store.deletedAt }
                          onChange={handleChangeDateField(nameof(store.deletedAt))}
                          className="w-100"
              />
            </FormItem>





              <Select value={ store.district?.id }
                      onChange={handleChangeObjectField(nameof(store.district))}
                      getList={ storeRepository.singleListDistrict }
                      list={ defaultDistrictList }
                      modelFilter={ districtFilter }
                      setModelFilter={ setDistrictFilter }
                      searchField={nameof(districtFilter.id)}
              />




              <Select value={ store.organization?.id }
                      onChange={handleChangeObjectField(nameof(store.organization))}
                      getList={ storeRepository.singleListOrganization }
                      list={ defaultOrganizationList }
                      modelFilter={ organizationFilter }
                      setModelFilter={ setOrganizationFilter }
                      searchField={nameof(organizationFilter.id)}
              />




              <Select value={ store.province?.id }
                      onChange={handleChangeObjectField(nameof(store.province))}
                      getList={ storeRepository.singleListProvince }
                      list={ defaultProvinceList }
                      modelFilter={ provinceFilter }
                      setModelFilter={ setProvinceFilter }
                      searchField={nameof(provinceFilter.id)}
              />




              <Select value={ store.storeGrouping?.id }
                      onChange={handleChangeObjectField(nameof(store.storeGrouping))}
                      getList={ storeRepository.singleListStoreGrouping }
                      list={ defaultStoreGroupingList }
                      modelFilter={ storeGroupingFilter }
                      setModelFilter={ setStoreGroupingFilter }
                      searchField={nameof(storeGroupingFilter.id)}
              />




              <Select value={ store.storeType?.id }
                      onChange={handleChangeObjectField(nameof(store.storeType))}
                      getList={ storeRepository.singleListStoreType }
                      list={ defaultStoreTypeList }
                      modelFilter={ storeTypeFilter }
                      setModelFilter={ setStoreTypeFilter }
                      searchField={nameof(storeTypeFilter.id)}
              />




              <Select value={ store.ward?.id }
                      onChange={handleChangeObjectField(nameof(store.ward))}
                      getList={ storeRepository.singleListWard }
                      list={ defaultWardList }
                      modelFilter={ wardFilter }
                      setModelFilter={ setWardFilter }
                      searchField={nameof(wardFilter.id)}
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

            <TabPane key="1" tab={translate('store.tabs.roles.title')}>
              <StoreImageMappingTable model={ store }
                                setModel={ setStore }
                                field={(nameof(store.storeImageMappings))}
                                onChange={handleChangeSimpleField(nameof(store.storeImageMappings))}
              />
            </TabPane>

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

export default StoreDetail;