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
import './ViewDetail.scss';
import { viewRepository }  from 'views/ViewView/ViewRepository';
import { View } from 'models/View'; 















const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function ViewDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    view,
    setView,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    View,
    viewRepository.get,
    viewRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<View>(view, setView);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------
  
  //-------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------
  
  //-------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------
  
  //-------------------------------------------------------------------------------------------------------------------------------------------------  

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('views.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>
            
            <FormItem label={translate('views.id')}
                      validateStatus={formService.getValidationStatus<View>(view.errors, nameof(view.id))}
                      help={ view.errors?.id }
            >
              <InputNumber defaultValue={ view.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(view.id))}
              />
            </FormItem>
            
            
            

            <FormItem label={translate('views.name')}
                      validateStatus={formService.getValidationStatus<View>(view.errors, nameof(view.name))}
                      help={ view.errors?.name }
            >
              <input type="text"
                           defaultValue={ view.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(view.name))}
              />
            </FormItem>
            
            
            

            <FormItem label={translate('views.path')}
                      validateStatus={formService.getValidationStatus<View>(view.errors, nameof(view.path))}
                      help={ view.errors?.path }
            >
              <input type="text"
                           defaultValue={ view.path }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(view.path))}
              />
            </FormItem>
            
            
            

            <FormItem label={translate('views.isDeleted')}
                      validateStatus={formService.getValidationStatus<View>(view.errors, nameof(view.isDeleted))}
                      help={ view.errors?.isDeleted }
            >
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

export default ViewDetail;