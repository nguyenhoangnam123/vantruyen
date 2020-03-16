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
import './PageDetail.scss';
import { pageRepository }  from 'views/PageView/PageRepository';
import { Page } from 'models/Page'; 










import { View } from 'models/View'
import { ViewFilter } from 'models/ViewFilter'




import PermissionPageMappingTable from 'views/PageView/PageDetail/PermissionPageMappingTable/PermissionPageMappingTable';


const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function PageDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    page,
    setPage,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    Page,
    pageRepository.get,
    pageRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<Page>(page, setPage);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------
  
  //-------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------
  
  const [viewFilter, setViewFilter] = React.useState<ViewFilter>(new ViewFilter());
  
  //-------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------
  
  const defaultViewList: View[] = crudService.useDefaultList<View>(page.view);
  
  //-------------------------------------------------------------------------------------------------------------------------------------------------  

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('pages.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>
            
            <FormItem label={translate('pages.id')}
                      validateStatus={formService.getValidationStatus<Page>(page.errors, nameof(page.id))}
                      help={ page.errors?.id }
            >
              <InputNumber defaultValue={ page.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(page.id))}
              />
            </FormItem>
            
            
            

            <FormItem label={translate('pages.name')}
                      validateStatus={formService.getValidationStatus<Page>(page.errors, nameof(page.name))}
                      help={ page.errors?.name }
            >
              <input type="text"
                           defaultValue={ page.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(page.name))}
              />
            </FormItem>
            
            
            

            <FormItem label={translate('pages.path')}
                      validateStatus={formService.getValidationStatus<Page>(page.errors, nameof(page.path))}
                      help={ page.errors?.path }
            >
              <input type="text"
                           defaultValue={ page.path }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(page.path))}
              />
            </FormItem>
            
            
            

            
            

            <FormItem label={translate('pages.isDeleted')}
                      validateStatus={formService.getValidationStatus<Page>(page.errors, nameof(page.isDeleted))}
                      help={ page.errors?.isDeleted }
            >
            </FormItem>
            
            
            

            
            
              <Select value={ page.view?.id }
                      onChange={handleChangeObjectField(nameof(page.view))}
                      getList={ pageRepository.singleListView }
                      list={ defaultViewList }
                      modelFilter={ viewFilter }
                      setModelFilter={ setViewFilter }
                      searchField={nameof(viewFilter.id)}
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
            
            <TabPane key="1" tab={translate('page.tabs.roles.title')}>
              <PermissionPageMappingTable model={ page }
                                setModel={ setPage }
                                field={(nameof(page.permissionPageMappings))}
                                onChange={handleChangeSimpleField(nameof(page.permissionPageMappings))}
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

export default PageDetail;