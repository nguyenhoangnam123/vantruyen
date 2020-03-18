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
import './ImageDetail.scss';
import { imageRepository }  from 'views/ImageView/ImageRepository';
import { Image } from 'models/Image';














import ProductImageMappingTable from 'views/ImageView/ImageDetail/ProductImageMappingTable/ProductImageMappingTable';



import StoreImageMappingTable from 'views/ImageView/ImageDetail/StoreImageMappingTable/StoreImageMappingTable';


const {TabPane} = Tabs;

const {Item: FormItem} = Form;

function ImageDetail() {
  const [translate] = useTranslation();

  // Service goback
    const [handleGoBack] = routerService.useGoBack();

  // Hooks, useDetail, useChangeHandler
    const [
    image,
    setImage,
    loading,
    ,
    isDetail,
    handleSave,
  ] = crudService.useDetail(
    Image,
    imageRepository.get,
    imageRepository.save,
  );

    const [
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
  ] = crudService.useChangeHandlers<Image>(image, setImage);

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
            {isDetail ? translate('images.detail.title') : translate(generalLanguageKeys.actions.create)}
          </>
        )}>
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              <i className="fa mr-2 fa-save"/>
              {translate(generalLanguageKeys.actions.save)}
            </button>
          </div>
          <Form {...defaultDetailFormLayout}>

            <FormItem label={translate('images.id')}
                      validateStatus={formService.getValidationStatus<Image>(image.errors, nameof(image.id))}
                      help={ image.errors?.id }
            >
              <InputNumber defaultValue={ image.id }
                           className="w-100"
                           onChange={handleChangeSimpleField(nameof(image.id))}
              />
            </FormItem>




            <FormItem label={translate('images.name')}
                      validateStatus={formService.getValidationStatus<Image>(image.errors, nameof(image.name))}
                      help={ image.errors?.name }
            >
              <input type="text"
                           defaultValue={ image.name }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(image.name))}
              />
            </FormItem>




            <FormItem label={translate('images.url')}
                      validateStatus={formService.getValidationStatus<Image>(image.errors, nameof(image.url))}
                      help={ image.errors?.url }
            >
              <input type="text"
                           defaultValue={ image.url }
                           className="form-control form-control-sm"
                           onChange={handleChangeSimpleField(nameof(image.url))}
              />
            </FormItem>




            <FormItem label={translate('images.createdAt')}
                      validateStatus={formService.getValidationStatus<Image>(image.errors, nameof(image.createdAt))}
                      help={ image.errors?.createdAt }
            >
              <DatePicker defaultValue={ image.createdAt }
                          onChange={handleChangeDateField(nameof(image.createdAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('images.updatedAt')}
                      validateStatus={formService.getValidationStatus<Image>(image.errors, nameof(image.updatedAt))}
                      help={ image.errors?.updatedAt }
            >
              <DatePicker defaultValue={ image.updatedAt }
                          onChange={handleChangeDateField(nameof(image.updatedAt))}
                          className="w-100"
              />
            </FormItem>



            <FormItem label={translate('images.deletedAt')}
                      validateStatus={formService.getValidationStatus<Image>(image.errors, nameof(image.deletedAt))}
                      help={ image.errors?.deletedAt }
            >
              <DatePicker defaultValue={ image.deletedAt }
                          onChange={handleChangeDateField(nameof(image.deletedAt))}
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

            <TabPane key="1" tab={translate('image.tabs.roles.title')}>
              <ProductImageMappingTable model={ image }
                                setModel={ setImage }
                                field={(nameof(image.productImageMappings))}
                                onChange={handleChangeSimpleField(nameof(image.productImageMappings))}
              />
            </TabPane>

            <TabPane key="1" tab={translate('image.tabs.roles.title')}>
              <StoreImageMappingTable model={ image }
                                setModel={ setImage }
                                field={(nameof(image.storeImageMappings))}
                                onChange={handleChangeSimpleField(nameof(image.storeImageMappings))}
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

export default ImageDetail;