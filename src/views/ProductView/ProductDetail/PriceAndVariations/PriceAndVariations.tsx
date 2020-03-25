import React, {Dispatch, SetStateAction} from 'react';
import './PriceAndVariations.scss';
import {defaultDetailFormLayout} from 'config/ant-design/form';
import Form from 'antd/lib/form';
import {useTranslation} from 'react-i18next';
import {productService} from 'views/ProductView/ProductDetail/ProductService';
import InputNumber from 'components/InputNumber/InputNumber';
import {Col, Row} from 'antd/lib/grid';
import Table, {ColumnProps} from 'antd/lib/table';
import {Product} from 'models/Product';
import {VariationGrouping} from 'models/VariationGrouping';
import Input from 'components/Input/Input';
import InputTag from 'views/ProductView/ProductDetail/PriceAndVariations/InputTag';
import {Item} from 'models/Item';
import nameof from 'ts-nameof.macro';
import {Image} from 'models/Image';
import Modal from 'antd/lib/modal';

const {Item: FormItem} = Form;

export interface PriceAndVariations {
  product: Product;

  setProduct: Dispatch<SetStateAction<Product>>;
}

function PriceAndVariations(props: PriceAndVariations) {
  const [translate] = useTranslation();
  const [
    retailPrice,
    setRetailPrice,
    price,
    setPrice,
    handleAddVariation,
    addable,
    handleChangeVariationGroupingName,
    handleRemoveVariation,
  ] = productService.usePrice(
    props.product,
    props.setProduct,
  );

  const [
    visible,
    currentVariation,
    currentVariationGrouping,
    handleOpenModal,
    handleCloseModal,
    handleUpdateVariationGrouping,
    handleChangeCurrentVariation,
    getDisplayValue,
    handleCombine,
  ] = productService.useVariationGrouping(props.product, props.setProduct, price, retailPrice);

  const columns: ColumnProps<Item>[] = React.useMemo(
    () => {
      return [
        {
          title: translate('items.name'),
          key: nameof(props.product.items[0].name),
          dataIndex: nameof(props.product.items[0].name),
        },
        {
          title: translate('items.code'),
          key: nameof(props.product.items[0].code),
          dataIndex: nameof(props.product.items[0].code),
        },
        {
          title: translate('items.scanCode'),
          key: nameof(props.product.items[0].scanCode),
          dataIndex: nameof(props.product.items[0].scanCode),
        },
        {
          title: translate('items.price'),
          key: nameof(props.product.items[0].price),
          dataIndex: nameof(props.product.items[0].price),
        },
        {
          title: translate('items.retailPrice'),
          key: nameof(props.product.items[0].retailPrice),
          dataIndex: nameof(props.product.items[0].retailPrice),
        },
      ];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [translate],
  );

  const imageTableColumns: ColumnProps<any>[] = React.useMemo(
    () => {
      return [
        {
          title: translate('items.name'),
          key: nameof(props.product.items[0].name),
          dataIndex: nameof(props.product.items[0].name),
        },
        {
          title: translate('items.images'),
          key: nameof(props.product.items[0].images),
          dataIndex: nameof(props.product.items[0].images),
          render(images: Image[]) {
            return (
              JSON.stringify(images)
            );
          },
        },
      ];
    },
    [props.product.items, translate],
  );

  return (
    <div className="price-and-variations">
      <Modal visible={visible}
             destroyOnClose={true}
             onOk={handleUpdateVariationGrouping}
             onCancel={handleCloseModal}>
        <Form {...defaultDetailFormLayout}>
          <FormItem label={translate('variationGroupings.code')}>
            <Input value={currentVariation?.code}
                   onChange={handleChangeCurrentVariation(nameof(currentVariationGrouping.code))}/>
          </FormItem>
          <FormItem label={translate('variationGroupings.name')}>
            <Input value={currentVariation?.name}
                   onChange={handleChangeCurrentVariation(nameof(currentVariationGrouping.name))}/>
          </FormItem>
        </Form>
      </Modal>
      <Row>
        <Col xs={24} md={8}>
          <Form {...defaultDetailFormLayout}>
            <FormItem label={translate('products.retailPrice')}>
              <InputNumber defaultValue={price} onChange={setPrice}/>
            </FormItem>
            <FormItem label={translate('products.price')}>
              <InputNumber defaultValue={retailPrice} onChange={setRetailPrice}/>
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
                    <InputTag max={4}
                              value={getDisplayValue(index)}
                              onClick={handleOpenModal(index)}
                              onRemoveVariation={handleRemoveVariation(index)}/>
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
            <button className="btn btn-sm btn-primary" onClick={handleCombine}>
              <img className="btn-icon mr-2" src="/assets/icons/baseline-history-24px.svg" alt=""/>
              {translate('products.createVariations')}
            </button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="mt-4">
          <Table tableLayout="fixed"
                 bordered={true}
                 columns={columns}
                 dataSource={props.product.items}
                 pagination={false}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Table tableLayout="fixed"
                 bordered={true}
                 columns={imageTableColumns}
                 dataSource={props.product.items}
                 pagination={false}
          />
        </Col>
      </Row>
    </div>
  );
}

export default PriceAndVariations;
