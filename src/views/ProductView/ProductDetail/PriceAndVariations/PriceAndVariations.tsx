import React, {Dispatch, SetStateAction} from 'react';
import './PriceAndVariations.scss';
import {defaultDetailFormLayout} from 'config/ant-design/form';
import Form from 'antd/lib/form';
import {useTranslation} from 'react-i18next';
import {productService} from 'views/ProductView/ProductDetail/ProductService';
import InputNumber from 'components/InputNumber/InputNumber';
import {Col, Row} from 'antd/lib/grid';
import Table from 'antd/lib/table';
import {Product} from 'models/Product';
import {VariationGrouping} from 'models/VariationGrouping';
import Input from 'components/Input/Input';
import InputTag from 'components/InputTag/InputTag';
import Dropdown from 'antd/lib/dropdown';

const {Item: FormItem} = Form;

export interface PriceAndVariations {
  product: Product;

  setProduct: Dispatch<SetStateAction<Product>>;
}

function PriceAndVariations(props: PriceAndVariations) {
  const [translate] = useTranslation();
  const [retailPrice, , price, , handleAddVariation, addable, handleChangeVariationGroupingName] = productService.usePrice(props.product, props.setProduct);

  return (
    <div className="price-and-variations">
      <Row>
        <Col xs={24} md={8}>
          <Form {...defaultDetailFormLayout}>
            <FormItem label={translate('products.retailPrice')}>
              <InputNumber defaultValue={retailPrice}/>
            </FormItem>
            <FormItem label={translate('products.price')}>
              <InputNumber defaultValue={price}/>
            </FormItem>
          </Form>
        </Col>
        <Col xs={24} md={16}>
          <ul className="variations">
            {props.product?.variationGroupings?.map((variationGrouping: VariationGrouping, index: number) => {
              return (
                <li className="ant-row ant-form-item variation" key={index}>
                  <div className="name">
                    <span className="label">{translate('products.variationName')}</span>
                    <Input className="flex-grow-1"
                           value={variationGrouping.name}
                           onChange={handleChangeVariationGroupingName(index)}
                    />
                  </div>
                  <div className="value">
                    <span className="label">{translate('products.variationValue')}</span>
                    <Dropdown overlay={(
                      <div>

                      </div>
                    )}>
                      <InputTag max={4}/>
                    </Dropdown>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-2">
            {addable && (
              <button className="btn btn-sm btn-primary" onClick={handleAddVariation}>
                <img className="btn-icon mr-2" src="/assets/icons/baseline-add-24px.svg" alt=""/>
                {translate('products.addVariation')}
              </button>
            )}
          </div>
          <div className="mt-2">
            <button className="btn btn-sm btn-primary">
              <img className="btn-icon mr-2" src="/assets/icons/baseline-history-24px.svg" alt=""/>
              {translate('products.createVariations')}
            </button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="mt-4">
          <Table tableLayout="fixed"
                 bordered={true}/>
        </Col>
      </Row>
    </div>
  );
}

export default PriceAndVariations;
