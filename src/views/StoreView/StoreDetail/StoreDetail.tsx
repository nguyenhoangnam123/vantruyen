import React from 'react';
import {crudService, routerService} from 'core/services';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Form, {FormProps} from 'antd/lib/form';
import {useTranslation} from 'react-i18next';
import {generalLanguageKeys} from 'config/consts';
import Select from 'components/Select/Select';
import nameof from 'ts-nameof.macro';
import {formService} from 'core/services/FormService';
import './StoreDetail.scss';
import {storeRepository} from 'views/StoreView/StoreRepository';
import {Store} from 'models/Store';

import {District} from 'models/District';
import {DistrictFilter} from 'models/DistrictFilter';
import GoogleMapReact from 'google-map-react';
import {Organization} from 'models/Organization';
import {OrganizationFilter} from 'models/OrganizationFilter';

import {StoreFilter} from 'models/StoreFilter';

import {Province} from 'models/Province';
import {ProvinceFilter} from 'models/ProvinceFilter';

import {Status} from 'models/Status';

import {StoreGrouping} from 'models/StoreGrouping';
import {StoreGroupingFilter} from 'models/StoreGroupingFilter';

import {StoreType} from 'models/StoreType';
import {StoreTypeFilter} from 'models/StoreTypeFilter';

import {Ward} from 'models/Ward';
import {WardFilter} from 'models/WardFilter';
import Row from 'antd/lib/grid/row';
import Col from 'antd/lib/grid/col';
import {Switch} from 'antd';

const {Item: FormItem} = Form;

export const defaultDetailFormLayout: FormProps = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 24},
    md: {span: 12},
    lg: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 24},
    md: {span: 12},
    lg: {span: 8},
  },
};

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
    ,
  ] = crudService.useChangeHandlers<Store>(store, setStore);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  const [statusList] = crudService.useEnumList<Status>(storeRepository.singleListStatus);

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  const [districtFilter, setDistrictFilter] = React.useState<DistrictFilter>(new DistrictFilter());

  const [organizationFilter, setOrganizationFilter] = React.useState<OrganizationFilter>(new OrganizationFilter());

  const [storeFilter, setStoreFilter] = React.useState<StoreFilter>(new StoreFilter());

  const [provinceFilter, setProvinceFilter] = React.useState<ProvinceFilter>(new ProvinceFilter());

  const [storeGroupingFilter, setStoreGroupingFilter] = React.useState<StoreGroupingFilter>(new StoreGroupingFilter());

  const [storeTypeFilter, setStoreTypeFilter] = React.useState<StoreTypeFilter>(new StoreTypeFilter());

  const [wardFilter, setWardFilter] = React.useState<WardFilter>(new WardFilter());

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  const defaultDistrictList: District[] = crudService.useDefaultList<District>(store.district);

  const defaultOrganizationList: Organization[] = crudService.useDefaultList<Organization>(store.organization);

  const defaultStoreList: Store[] = crudService.useDefaultList<Store>(store.store);

  const defaultProvinceList: Province[] = crudService.useDefaultList<Province>(store.province);

  const defaultStoreGroupingList: StoreGrouping[] = crudService.useDefaultList<StoreGrouping>(store.storeGrouping);

  const defaultStoreTypeList: StoreType[] = crudService.useDefaultList<StoreType>(store.storeType);

  const defaultWardList: Ward[] = crudService.useDefaultList<Ward>(store.ward);

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
          <Form>
            <Card bordered={false} title={translate('stores.general.info')}>
              <Row>
                <Col lg={12}>
                  <FormItem label={translate('stores.code')}
                            validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.code))}
                            help={store.errors?.code}
                  >
                    <input type="text"
                           defaultValue={store.code}
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(store.code))}
                    />
                  </FormItem>
                </Col>
                <Col lg={12}>
                  <FormItem label={translate('stores.name')}
                            validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.name))}
                            help={store.errors?.name}
                  >
                    <input type="text"
                           defaultValue={store.name}
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(store.name))}
                    />
                  </FormItem>
                </Col>
                <Col lg={12}>
                  <FormItem label={translate('stores.organization')}
                            validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.organization))}
                            help={store.errors?.organization}
                  >
                    <Select value={store.organization?.id}
                            onChange={handleChangeObjectField(nameof(store.organization))}
                            getList={storeRepository.singleListOrganization}
                            list={defaultOrganizationList}
                            modelFilter={organizationFilter}
                            setModelFilter={setOrganizationFilter}
                            searchField={nameof(organizationFilter.id)}
                    />
                  </FormItem>
                </Col>
                <Col lg={12}>
                  <FormItem label={translate('stores.parentStore')}
                            validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.parentStore))}
                            help={store.errors?.parentStore}
                  >
                    <Select value={store.parentStore?.id}
                            onChange={handleChangeObjectField(nameof(store.parentStore))}
                            getList={storeRepository.singleListStore}
                            list={defaultStoreList}
                            modelFilter={storeFilter}
                            setModelFilter={setStoreFilter}
                            searchField={nameof(storeFilter.id)}
                    />
                  </FormItem>
                </Col>
                <Col lg={12}>
                  <FormItem label={translate('stores.storeType')}
                            validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.storeType))}
                            help={store.errors?.storeType}
                  >
                    <Select value={store.storeType?.id}
                            onChange={handleChangeObjectField(nameof(store.storeType))}
                            getList={storeRepository.singleListStoreType}
                            list={defaultStoreTypeList}
                            modelFilter={storeTypeFilter}
                            setModelFilter={setStoreTypeFilter}
                            searchField={nameof(storeTypeFilter.id)}
                    />
                  </FormItem>
                </Col>
                <Col lg={12}>
                  <FormItem label={translate('stores.storeGrouping')}
                            validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.storeGrouping))}
                            help={store.errors?.storeGrouping}
                  >
                    <Select value={store.storeGrouping?.id}
                            onChange={handleChangeObjectField(nameof(store.storeGrouping))}
                            getList={storeRepository.singleListStoreGrouping}
                            list={defaultStoreGroupingList}
                            modelFilter={storeGroupingFilter}
                            setModelFilter={setStoreGroupingFilter}
                            searchField={nameof(storeGroupingFilter.id)}
                    />
                  </FormItem>
                </Col>
                <Col lg={12}>
                  <FormItem label={translate('stores.province')}
                            validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.province))}
                            help={store.errors?.province}
                  >
                    <Select value={store.province?.id}
                            onChange={handleChangeObjectField(nameof(store.province))}
                            getList={storeRepository.singleListProvince}
                            list={defaultProvinceList}
                            modelFilter={provinceFilter}
                            setModelFilter={setProvinceFilter}
                            searchField={nameof(provinceFilter.id)}
                    />
                  </FormItem>
                </Col>
                <Col lg={12}>
                  <FormItem label={translate('stores.district')}
                            validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.district))}
                            help={store.errors?.district}
                  >
                    <Select value={store.district?.id}
                            onChange={handleChangeObjectField(nameof(store.district))}
                            getList={storeRepository.singleListDistrict}
                            list={defaultDistrictList}
                            modelFilter={districtFilter}
                            setModelFilter={setDistrictFilter}
                            searchField={nameof(districtFilter.id)}
                    />
                  </FormItem>
                </Col>
                <Col lg={12}>
                  <FormItem label={translate('stores.ward')}
                            validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.ward))}
                            help={store.errors?.ward}
                  >
                    <Select value={store.ward?.id}
                            onChange={handleChangeObjectField(nameof(store.ward))}
                            getList={storeRepository.singleListWard}
                            list={defaultWardList}
                            modelFilter={wardFilter}
                            setModelFilter={setWardFilter}
                            searchField={nameof(wardFilter.id)}
                    />
                  </FormItem>
                </Col>
                <Col lg={12}>
                </Col>
                <Col lg={12}>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <FormItem label={translate('stores.address1')}
                            validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.address1))}
                            help={store.errors?.address1}
                  >
                    <input type="text"
                           defaultValue={store.address1}
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(store.address1))}
                    />
                    <div style={{height: 300}} className="mt-4">
                      <GoogleMapReact
                        bootstrapURLKeys={{key: 'AIzaSyBO59KB85b4gH6F5Yy2KyhWwfOnOUUqLsY'}}
                        defaultCenter={{
                          lat: 59.95,
                          lng: 30.33,
                        }}
                        defaultZoom={11}
                        yesIWantToUseGoogleMapApiInternals
                      />
                    </div>
                  </FormItem>
                  <FormItem label={translate('stores.location')}>
                    <Row>
                      <Col span={12} className="pr-2">
                        <input type="text"
                               className="form-control form-control-sm"
                               placeholder={translate('stores.latitude')}
                               defaultValue={nameof(store.latitude)}/>
                      </Col>
                      <Col span={12} className="pl-2">
                        <input type="text"
                               className="form-control form-control-sm"
                               placeholder={translate('stores.longitude')}
                               defaultValue={nameof(store.longitude)}/>
                      </Col>
                    </Row>
                  </FormItem>
                  <FormItem label={translate('stores.telephone')}
                            validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.telephone))}
                            help={store.errors?.telephone}
                  >
                    <input type="text"
                           defaultValue={store.telephone}
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(store.telephone))}
                    />
                  </FormItem>
                </Col>
                <Col lg={12}>
                  <FormItem label={translate('stores.address2')}
                            validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.address2))}
                            help={store.errors?.address2}
                  >
                    <input type="text"
                           defaultValue={store.address2}
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(store.address2))}
                    />
                  </FormItem>
                </Col>
              </Row>
            </Card>
            <Card bordered={false} title={translate('stores.owner.info')}>
              <Row>
                <Col lg={12}>
                  <FormItem label={translate('stores.ownerName')}
                            validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.ownerName))}
                            help={store.errors?.ownerName}
                  >
                    <input type="text"
                           defaultValue={store.ownerName}
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(store.ownerName))}
                    />
                  </FormItem>
                </Col>
                <Col lg={12}>
                  <FormItem label={translate('stores.ownerPhone')}
                            validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.ownerPhone))}
                            help={store.errors?.ownerPhone}
                  >
                    <input type="text"
                           defaultValue={store.ownerPhone}
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(store.ownerPhone))}
                    />
                  </FormItem>
                </Col>
                <Col lg={12}>
                  <FormItem label={translate('stores.ownerEmail')}
                            validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.ownerEmail))}
                            help={store.errors?.ownerEmail}
                  >
                    <input type="text"
                           defaultValue={store.ownerEmail}
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(store.ownerEmail))}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <FormItem label={translate('stores.status')}
                            validateStatus={formService.getValidationStatus<Store>(store.errors, nameof(store.status))}
                            help={store.errors?.status}
                  >
                    <Switch checked={typeof store.status?.id === 'number' && store.status?.id === statusList[1]?.id}
                            onChange={handleChangeSimpleField(nameof(store.status))}/>
                  </FormItem>
                </Col>
              </Row>
            </Card>
          </Form>
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
