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
import './VariationDetail.scss';
import { variationRepository }  from 'views/VariationView/VariationRepository';
import { Variation } from 'models/Variation';








import { VariationGrouping } from 'models/VariationGrouping';
import { VariationGroupingFilter } from 'models/VariationGroupingFilter';



const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function VariationDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    variation,
    setVariation,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    Variation,
    variationRepository.get,
    variationRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<Variation>(variation, setVariation);

  // Enums  -----------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Reference  -------------------------------------------------------------------------------------------------------------------------------------

  const [variationGroupingFilter, setVariationGroupingFilter] = React.useState<VariationGroupingFilter>(new VariationGroupingFilter());

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  // Default List -----------------------------------------------------------------------------------------------------------------------------------

  const defaultVariationGroupingList: VariationGrouping[] = crudService.useDefaultList<VariationGrouping>(variation.variationGrouping);

  // -------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="page detail-page">
      <Spin spinning={loading}>
        <Card title={(
          <>
            <button className="btn btn-link mr-2" onClick={handleGoBack}>
              <i className="fa fa-arrow-left"/>
            </button>
            {isDetail ? translate('variations.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('variations.id')}
                      validateStatus={formService.getValidationStatus<Variation>(variation.errors, nameof(variation.id))}
                      help={ variation.errors?.id }
            >
              <InputNumber defaultValue={ variation.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(variation.id))}
              />
            </FormItem>




            <FormItem label={translate('variations.code')}
                      validateStatus={formService.getValidationStatus<Variation>(variation.errors, nameof(variation.code))}
                      help={ variation.errors?.code }
            >
              <input type="text"
                           defaultValue={ variation.code }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(variation.code))}
              />
            </FormItem>




            <FormItem label={translate('variations.name')}
                      validateStatus={formService.getValidationStatus<Variation>(variation.errors, nameof(variation.name))}
                      help={ variation.errors?.name }
            >
              <input type="text"
                           defaultValue={ variation.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(variation.name))}
              />
            </FormItem>









              <Select value={ variation.variationGrouping?.id }
                      onChange={handleChangeObjectField(nameof(variation.variationGrouping))}
                      getList={ variationRepository.singleListVariationGrouping }
                      list={ defaultVariationGroupingList }
                      modelFilter={ variationGroupingFilter }
                      setModelFilter={ setVariationGroupingFilter }
                      searchField={nameof(variationGroupingFilter.id)}
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

export default VariationDetail;