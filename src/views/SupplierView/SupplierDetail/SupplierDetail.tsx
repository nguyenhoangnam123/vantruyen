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
import './SupplierDetail.scss';
import { supplierRepository }  from 'views/SupplierView/SupplierRepository';
import { Supplier } from 'models/Supplier';

















const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function SupplierDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    supplier,
    setSupplier,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    Supplier,
    supplierRepository.get,
    supplierRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<Supplier>(supplier, setSupplier);

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
            {isDetail ? translate('suppliers.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('suppliers.id')}
                      validateStatus={formService.getValidationStatus<Supplier>(supplier.errors, nameof(supplier.id))}
                      help={ supplier.errors?.id }
            >
              <InputNumber defaultValue={ supplier.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(supplier.id))}
              />
            </FormItem>




            <FormItem label={translate('suppliers.code')}
                      validateStatus={formService.getValidationStatus<Supplier>(supplier.errors, nameof(supplier.code))}
                      help={ supplier.errors?.code }
            >
              <input type="text"
                           defaultValue={ supplier.code }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(supplier.code))}
              />
            </FormItem>




            <FormItem label={translate('suppliers.name')}
                      validateStatus={formService.getValidationStatus<Supplier>(supplier.errors, nameof(supplier.name))}
                      help={ supplier.errors?.name }
            >
              <input type="text"
                           defaultValue={ supplier.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(supplier.name))}
              />
            </FormItem>




            <FormItem label={translate('suppliers.taxCode')}
                      validateStatus={formService.getValidationStatus<Supplier>(supplier.errors, nameof(supplier.taxCode))}
                      help={ supplier.errors?.taxCode }
            >
              <input type="text"
                           defaultValue={ supplier.taxCode }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(supplier.taxCode))}
              />
            </FormItem>




            <FormItem label={translate('suppliers.createdAt')}
                      validateStatus={formService.getValidationStatus<Supplier>(supplier.errors, nameof(supplier.createdAt))}
                      help={ supplier.errors?.createdAt }
            >
              <DatePicker defaultValue={ supplier.createdAt }
                          onChange={handleChangeDateField(nameof(supplier.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('suppliers.updatedAt')}
                      validateStatus={formService.getValidationStatus<Supplier>(supplier.errors, nameof(supplier.updatedAt))}
                      help={ supplier.errors?.updatedAt }
            >
              <DatePicker defaultValue={ supplier.updatedAt }
                          onChange={handleChangeDateField(nameof(supplier.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('suppliers.deletedAt')}
                      validateStatus={formService.getValidationStatus<Supplier>(supplier.errors, nameof(supplier.deletedAt))}
                      help={ supplier.errors?.deletedAt }
            >
              <DatePicker defaultValue={ supplier.deletedAt }
                          onChange={handleChangeDateField(nameof(supplier.deletedAt))}
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

export default SupplierDetail;