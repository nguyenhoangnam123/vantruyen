import React, {Dispatch, SetStateAction} from 'react';
import {Product} from 'models/Product';
import {VariationGrouping} from 'models/VariationGrouping';

export const productService = {
  usePrice(
    product: Product,
    setProduct: Dispatch<SetStateAction<Product>>,
  ): [
    number,
    Dispatch<SetStateAction<number>>,
    number,
    Dispatch<SetStateAction<number>>,
    () => void,
    boolean,
    (index: number) => (value?: string) => void,
  ] {
    const [retailPrice, setRetailPrice] = React.useState<number>(0);
    const [price, setPrice] = React.useState<number>(0);
    const addable: boolean = typeof product.variationGroupings === 'object' ? !(product.variationGroupings?.length >= 4) : true;

    const handleAddVariation = React.useCallback(
      () => {
        if (addable) {
          setProduct(Product.clone<Product>({
            ...product,
            variationGroupings: [
              ...(product.variationGroupings ?? []),
              new VariationGrouping(),
            ],
          }));
        }
      },
      [addable, product, setProduct],
    );

    const handleChangeVariationGroupingName = React.useCallback(
      (index: number) => {
        return (value?: string) => {
          product.variationGroupings[index].name = value;
          setProduct(Product.clone<Product>({
            ...product,
          }));
        };
      },
      [product, setProduct],
    );

    return [
      retailPrice,
      setRetailPrice,
      price,
      setPrice,
      handleAddVariation,
      addable,
      handleChangeVariationGroupingName,
    ];
  },
};
