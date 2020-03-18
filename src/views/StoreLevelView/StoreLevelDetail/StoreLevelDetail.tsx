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
import './StoreLevelDetail.scss';
import { storeLevelRepository }  from 'views/StoreLevelView/StoreLevelRepository';
import { StoreLevel } from 'models/StoreLevel';











const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function StoreLevelDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    storeLevel,
    setStoreLevel,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    StoreLevel,
    storeLevelRepository.get,
    storeLevelRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<StoreLevel>(storeLevel, setStoreLevel);

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
            {isDetail ? translate('storeLevels.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('storeLevels.id')}
                      validateStatus={formService.getValidationStatus<StoreLevel>(storeLevel.errors, nameof(storeLevel.id))}
                      help={ storeLevel.errors?.id }
            >
              <InputNumber defaultValue={ storeLevel.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(storeLevel.id))}
              />
            </FormItem>




            <FormItem label={translate('storeLevels.name')}
                      validateStatus={formService.getValidationStatus<StoreLevel>(storeLevel.errors, nameof(storeLevel.name))}
                      help={ storeLevel.errors?.name }
            >
              <input type="text"
                           defaultValue={ storeLevel.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(storeLevel.name))}
              />
            </FormItem>




            <FormItem label={translate('storeLevels.createdAt')}
                      validateStatus={formService.getValidationStatus<StoreLevel>(storeLevel.errors, nameof(storeLevel.createdAt))}
                      help={ storeLevel.errors?.createdAt }
            >
              <DatePicker defaultValue={ storeLevel.createdAt }
                          onChange={handleChangeDateField(nameof(storeLevel.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('storeLevels.updatedAt')}
                      validateStatus={formService.getValidationStatus<StoreLevel>(storeLevel.errors, nameof(storeLevel.updatedAt))}
                      help={ storeLevel.errors?.updatedAt }
            >
              <DatePicker defaultValue={ storeLevel.updatedAt }
                          onChange={handleChangeDateField(nameof(storeLevel.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('storeLevels.deletedAt')}
                      validateStatus={formService.getValidationStatus<StoreLevel>(storeLevel.errors, nameof(storeLevel.deletedAt))}
                      help={ storeLevel.errors?.deletedAt }
            >
              <DatePicker defaultValue={ storeLevel.deletedAt }
                          onChange={handleChangeDateField(nameof(storeLevel.deletedAt))}
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

export default StoreLevelDetail;