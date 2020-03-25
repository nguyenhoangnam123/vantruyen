import React, {Dispatch, SetStateAction} from 'react';
import {Product} from 'models/Product';
import {VariationGrouping} from 'models/VariationGrouping';
import {Variation} from 'models/Variation';
import {Item} from 'models/Item';

export const productService = {
  permutations(choices, callback, prefix = []) {
    if (!choices.length) {
      return callback(prefix);
    }
    // tslint:disable-next-line:prefer-for-of
    for (let c = 0; c < choices[0].variations.length; c++) {
      this.permutations(choices.slice(1), callback, prefix.concat(choices[0].variations[c]));
    }
  },

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
    (index: number) => () => void,
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

    const handleRemoveVariation = React.useCallback(
      (index: number) => {
        return () => {
          product.variationGroupings?.splice(index, 1);
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
      handleRemoveVariation,
    ];
  },

  useVariationGrouping(
    product: Product,
    setProduct: Dispatch<SetStateAction<Product>>,
  ): [
    boolean,
    Variation,
    VariationGrouping,
    (index: number) => () => void,
    () => void,
    () => void,
    (field: string) => (value?: string) => void,
    (index: number) => string[],
    () => void,
  ] {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [currentVariationGrouping, setCurrentVariationGrouping] = React.useState<VariationGrouping>(null);
    const [currentVariation, setCurrentVariation] = React.useState<Variation>(null);
    const [currentIndex, setCurrentIndex] = React.useState<number>(-1);
    const handleOpenModal = React.useCallback(
      (index: number) => {
        return () => {
          setCurrentIndex(index);
          const currentVariation: Variation = new Variation();
          setCurrentVariation(currentVariation);
          setCurrentVariationGrouping(product.variationGroupings[index]);
          setVisible(true);
        };
      },
      [product.variationGroupings],
    );
    const handleChangeCurrentVariation = React.useCallback(
      (field: string) => {
        return (value?: string) => {
          setCurrentVariation({
            ...currentVariation,
            [field]: value,
          });
        };
      },
      [currentVariation],
    );
    const handleUpdateVariationGrouping = React.useCallback(
      () => {
        const {variations = []} = currentVariationGrouping;
        product.variationGroupings[currentIndex].variations = [...variations, currentVariation];
        setProduct(Product.clone<Product>({
          ...product,
          variationGroupings: [
            ...product.variationGroupings,
          ],
        }));
        setVisible(false);
      },
      [currentIndex, currentVariation, currentVariationGrouping, product, setProduct],
    );
    const handleCloseModal = React.useCallback(
      () => {
        setCurrentVariationGrouping(null);
        setVisible(false);
      },
      [],
    );
    const getDisplayValue: (index: number) => string[] = React.useCallback(
      (index) => {
        return product.variationGroupings[index].variations
          ?.filter((v: Variation) => {
            return typeof v.name === 'string' && v.name !== '';
          })
          .map((v: Variation) => v.name);
      },
      [product.variationGroupings],
    );

    const handleCombineVariations = React.useCallback(
      () => {
        const {variationGroupings} = product;
        const result: { [key: string]: Item } = {};
        const currentItems: Item[] = product.items;
        const currentItemKeys: { [key: number]: Item } = {};
        currentItems.forEach((item: Item) => {
          currentItemKeys[item.id] = item;
        });
        this.permutations(variationGroupings, (prefix) => {
          const key: string = prefix.map((v: Variation) => v.code).join('-');
          const newItem: Item = Item.clone<Item>({
            key,
            productId: product.id,
            product,
            name: `${product.name} - ${prefix.map((v: Variation) => v.name).join(' - ')}`,
            code: `${product.code}-${prefix.map((v: Variation) => v.code).join('-')}`,
            scanCode: product.scanCode,
            price: product.price,
            retailPrice: product.retailPrice,
            images: [],
          });
          result[key] = newItem;
          return newItem;
        });
        setProduct(Product.clone<Product>({
          ...product,
          items: Object.values(result),
        }));
        return result;
      },
      [product, setProduct],
    );

    return [
      visible,
      currentVariation,
      currentVariationGrouping,
      handleOpenModal,
      handleCloseModal,
      handleUpdateVariationGrouping,
      handleChangeCurrentVariation,
      getDisplayValue,
      handleCombineVariations,
    ];
  },
};
