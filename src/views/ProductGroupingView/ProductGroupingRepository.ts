import { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import { url } from 'core/helpers/string';
import { Repository } from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_PRODUCT_GROUPING_ROUTE} from 'config/api-consts';
import { ProductGrouping } from 'models/ProductGrouping';
import { ProductGroupingFilter } from 'models/ProductGroupingFilter';
// import { Brand } from 'models/Brand';
// import { BrandFilter } from 'models/BrandFilter';
import { ProductType } from 'models/ProductType';
import { ProductTypeFilter } from 'models/ProductTypeFilter';
import { Supplier } from 'models/Supplier';
import { SupplierFilter } from 'models/SupplierFilter';
// import { TaxType } from 'models/TaxType';
// import { TaxTypeFilter } from 'models/TaxTypeFilter';
import { UnitOfMeasure } from 'models/UnitOfMeasure';
import { UnitOfMeasureFilter } from 'models/UnitOfMeasureFilter';

export class ProductGroupingRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_PRODUCT_GROUPING_ROUTE));
  }

  public count = (productGroupingFilter?: ProductGroupingFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), productGroupingFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public list = (productGroupingFilter?: ProductGroupingFilter): Promise<ProductGrouping[]> => {
    return this.http.post<ProductGrouping[]>(kebabCase(nameof(this.list)), productGroupingFilter)
      .then((response: AxiosResponse<ProductGrouping[]>) => {
        return response.data?.map((productGrouping: PureModelData<ProductGrouping>) =>  ProductGrouping.clone<ProductGrouping>(productGrouping));
    });
  };
  public get = (id: number | string): Promise<ProductGrouping> => {
    return this.http.post<ProductGrouping>
      (kebabCase(nameof(this.get)), { id })
        .then((response: AxiosResponse<ProductGrouping>) => ProductGrouping.clone<ProductGrouping>(response.data));
  };

  public create = (productGrouping: ProductGrouping): Promise<ProductGrouping> => {
    return this.http.post<ProductGrouping>(kebabCase(nameof(this.create)), productGrouping)
      .then((response: AxiosResponse<PureModelData<ProductGrouping>>) => ProductGrouping.clone<ProductGrouping>(response.data));
  };

  public update = (productGrouping: ProductGrouping): Promise<ProductGrouping> => {
    return this.http.post<ProductGrouping>(kebabCase(nameof(this.update)), productGrouping)
      .then((response: AxiosResponse<ProductGrouping>) => ProductGrouping.clone<ProductGrouping>(response.data));
  };

  public delete = (productGrouping: ProductGrouping): Promise<ProductGrouping> => {
      return this.http.post<ProductGrouping>(kebabCase(nameof(this.delete)), productGrouping)
        .then((response: AxiosResponse<ProductGrouping>) => ProductGrouping.clone<ProductGrouping>(response.data));
  };

  public save = (productGrouping: ProductGrouping): Promise<ProductGrouping> => {
      return productGrouping.id ? this.update(productGrouping) : this.create(productGrouping);
  };

  // public singleListBrand = (brandFilter: BrandFilter): Promise<Brand[]> => {
  //     return this.http.post<Brand[]>(kebabCase(nameof(this.singleListBrand)), brandFilter)
  //       .then((response: AxiosResponse<Brand[]>) => {
  //         return response.data.map((brand: PureModelData<Brand>) => Brand.clone<Brand>(brand));
  //       });
  // };
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
  export const productGroupingRepository: ProductGrouping = new ProductGroupingRepository();
