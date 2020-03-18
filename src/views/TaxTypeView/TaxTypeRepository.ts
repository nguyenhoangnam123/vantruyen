import { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import { url } from 'core/helpers/string';
import { Repository } from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_TAX_TYPE_ROUTE} from 'config/api-consts';
import { TaxType } from 'models/TaxType';
import { TaxTypeFilter } from 'models/TaxTypeFilter';
import { Brand } from 'models/Brand';
import { BrandFilter } from 'models/BrandFilter';
import { ProductGrouping } from 'models/ProductGrouping';
import { ProductGroupingFilter } from 'models/ProductGroupingFilter';
import { ProductType } from 'models/ProductType';
import { ProductTypeFilter } from 'models/ProductTypeFilter';
import { Supplier } from 'models/Supplier';
import { SupplierFilter } from 'models/SupplierFilter';
import { UnitOfMeasure } from 'models/UnitOfMeasure';
import { UnitOfMeasureFilter } from 'models/UnitOfMeasureFilter';

export class TaxTypeRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_TAX_TYPE_ROUTE));
  }

  public count = (taxTypeFilter?: TaxTypeFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), taxTypeFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public list = (taxTypeFilter?: TaxTypeFilter): Promise<TaxType[]> => {
    return this.http.post<TaxType[]>(kebabCase(nameof(this.list)), taxTypeFilter)
      .then((response: AxiosResponse<TaxType[]>) => {
        return response.data?.map((taxType: PureModelData<TaxType>) =>  TaxType.clone<TaxType>(taxType));
    });
  };
  public get = (id: number | string): Promise<TaxType> => {
    return this.http.post<TaxType>
      (kebabCase(nameof(this.get)), { id })
        .then((response: AxiosResponse<TaxType>) => TaxType.clone<TaxType>(response.data));
  };

  public create = (taxType: TaxType): Promise<TaxType> => {
    return this.http.post<TaxType>(kebabCase(nameof(this.create)), taxType)
      .then((response: AxiosResponse<PureModelData<TaxType>>) => TaxType.clone<TaxType>(response.data));
  };

  public update = (taxType: TaxType): Promise<TaxType> => {
    return this.http.post<TaxType>(kebabCase(nameof(this.update)), taxType)
      .then((response: AxiosResponse<TaxType>) => TaxType.clone<TaxType>(response.data));
  };

  public delete = (taxType: TaxType): Promise<TaxType> => {
      return this.http.post<TaxType>(kebabCase(nameof(this.delete)), taxType)
        .then((response: AxiosResponse<TaxType>) => TaxType.clone<TaxType>(response.data));
  };

  public save = (taxType: TaxType): Promise<TaxType> => {
      return taxType.id ? this.update(taxType) : this.create(taxType);
  };

  public singleListBrand = (brandFilter: BrandFilter): Promise<Brand[]> => {
      return this.http.post<Brand[]>(kebabCase(nameof(this.singleListBrand)), brandFilter)
        .then((response: AxiosResponse<Brand[]>) => {
          return response.data.map((brand: PureModelData<Brand>) => Brand.clone<Brand>(brand));
        });
  };
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
  export const taxTypeRepository: TaxType = new TaxTypeRepository();