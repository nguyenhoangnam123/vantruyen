import { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import { url } from 'core/helpers/string';
import { Repository } from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_PRODUCT_ROUTE} from 'config/api-consts';
import { Product } from 'models/Product';
import { ProductFilter } from 'models/ProductFilter';
// import { Brand } from 'models/Brand';
// import { BrandFilter } from 'models/BrandFilter';
import { ProductGrouping } from 'models/ProductGrouping';
import { ProductGroupingFilter } from 'models/ProductGroupingFilter';
import { ProductType } from 'models/ProductType';
import { ProductTypeFilter } from 'models/ProductTypeFilter';
import { Supplier } from 'models/Supplier';
import { SupplierFilter } from 'models/SupplierFilter';
// import { TaxType } from 'models/TaxType';
// import { TaxTypeFilter } from 'models/TaxTypeFilter';
import { UnitOfMeasure } from 'models/UnitOfMeasure';
import { UnitOfMeasureFilter } from 'models/UnitOfMeasureFilter';
import { Image } from 'models/Image';
import { ImageFilter } from 'models/ImageFilter';

export class ProductRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_PRODUCT_ROUTE));
  }

  public count = (productFilter?: ProductFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), productFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public list = (productFilter?: ProductFilter): Promise<Product[]> => {
    return this.http.post<Product[]>(kebabCase(nameof(this.list)), productFilter)
      .then((response: AxiosResponse<Product[]>) => {
        return response.data?.map((product: PureModelData<Product>) =>  Product.clone<Product>(product));
    });
  };
  public get = (id: number | string): Promise<Product> => {
    return this.http.post<Product>
      (kebabCase(nameof(this.get)), { id })
        .then((response: AxiosResponse<Product>) => Product.clone<Product>(response.data));
  };

  public create = (product: Product): Promise<Product> => {
    return this.http.post<Product>(kebabCase(nameof(this.create)), product)
      .then((response: AxiosResponse<PureModelData<Product>>) => Product.clone<Product>(response.data));
  };

  public update = (product: Product): Promise<Product> => {
    return this.http.post<Product>(kebabCase(nameof(this.update)), product)
      .then((response: AxiosResponse<Product>) => Product.clone<Product>(response.data));
  };

  public delete = (product: Product): Promise<Product> => {
      return this.http.post<Product>(kebabCase(nameof(this.delete)), product)
        .then((response: AxiosResponse<Product>) => Product.clone<Product>(response.data));
  };

  public save = (product: Product): Promise<Product> => {
      return product.id ? this.update(product) : this.create(product);
  };

  // public singleListBrand = (brandFilter: BrandFilter): Promise<Brand[]> => {
  //     return this.http.post<Brand[]>(kebabCase(nameof(this.singleListBrand)), brandFilter)
  //       .then((response: AxiosResponse<Brand[]>) => {
  //         return response.data.map((brand: PureModelData<Brand>) => Brand.clone<Brand>(brand));
  //       });
  // };
  public singleListProductGrouping = (productGroupingFilter: ProductGroupingFilter): Promise<ProductGrouping[]> => {
      return this.http.post<ProductGrouping[]>(kebabCase(nameof(this.singleListProductGrouping)), productGroupingFilter)
        .then((response: AxiosResponse<ProductGrouping[]>) => {
          return response.data.map((productGrouping: PureModelData<ProductGrouping>) => ProductGrouping.clone<ProductGrouping>(productGrouping));
        });
  };
  public singleListProductType = (productTypeFilter: ProductTypeFilter): Promise<ProductType[]> => {
      return this.http.post<ProductType[]>(kebabCase(nameof(this.singleListProductType)), productTypeFilter)
        .then((response: AxiosResponse<ProductType[]>) => {
          return response.data.map((productType: PureModelData<ProductType>) => ProductType.clone<ProductType>(productType));
        });
  };
  public singleListSupplier = (supplierFilter: SupplierFilter): Promise<Supplier[]> => {
      return this.http.post<Supplier[]>(kebabCase(nameof(this.singleListSupplier)), supplierFilter)
        .then((response: AxiosResponse<Supplier[]>) => {
          return response.data.map((supplier: PureModelData<Supplier>) => Supplier.clone<Supplier>(supplier));
        });
  };
  // public singleListTaxType = (taxTypeFilter: TaxTypeFilter): Promise<TaxType[]> => {
  //     return this.http.post<TaxType[]>(kebabCase(nameof(this.singleListTaxType)), taxTypeFilter)
  //       .then((response: AxiosResponse<TaxType[]>) => {
  //         return response.data.map((taxType: PureModelData<TaxType>) => TaxType.clone<TaxType>(taxType));
  //       });
  // };
  public singleListUnitOfMeasure = (unitOfMeasureFilter: UnitOfMeasureFilter): Promise<UnitOfMeasure[]> => {
      return this.http.post<UnitOfMeasure[]>(kebabCase(nameof(this.singleListUnitOfMeasure)), unitOfMeasureFilter)
        .then((response: AxiosResponse<UnitOfMeasure[]>) => {
          return response.data.map((unitOfMeasure: PureModelData<UnitOfMeasure>) => UnitOfMeasure.clone<UnitOfMeasure>(unitOfMeasure));
        });
  };
  public singleListImage = (imageFilter: ImageFilter): Promise<Image[]> => {
      return this.http.post<Image[]>(kebabCase(nameof(this.singleListImage)), imageFilter)
        .then((response: AxiosResponse<Image[]>) => {
          return response.data.map((image: PureModelData<Image>) => Image.clone<Image>(image));
        });
  };

  public countImage = (imageFilter: ImageFilter):
      Promise<number> => {
        return this.http.post<number>(kebabCase(nameof(this.countImage)), imageFilter)
          .then((response: AxiosResponse<number>) =>  response.data);
    };

  public listImage = (imageFilter: ImageFilter): Promise<Image[]> => {
        return this.http.post<Image[]>(kebabCase(nameof(this.listImage)), imageFilter)
          .then((response: AxiosResponse<Image[]>) => {
            return response.data.map((image: PureModelData<Image>) => Image.clone<Image>(image));
          });
  };


  public bulkDelete = (idList: BatchId): Promise<void> => {
    return this.http.post(kebabCase(nameof(this.bulkDelete)), idList)
    .then((response: AxiosResponse<void>) => response.data);
  };

  public import = (file: File, name: string = nameof(file)): Promise<void> => {
    const formData: FormData = new FormData();
    formData.append(name, file);
    return this.http.post<void>(kebabCase(nameof(this.import)), formData)
      .then((response: AxiosResponse<void>) => response.data);
    };
  }
  export const productRepository: Product = new ProductRepository();
