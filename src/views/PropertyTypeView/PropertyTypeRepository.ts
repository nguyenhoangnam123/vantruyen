import { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import { url } from 'core/helpers/string';
import { Repository } from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_PROPERTY_TYPE_ROUTE} from 'config/api-consts';
import { PropertyType } from 'models/PropertyType';
import { PropertyTypeFilter } from 'models/PropertyTypeFilter';

export class PropertyTypeRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_PROPERTY_TYPE_ROUTE));
  }

  public count = (propertyTypeFilter?: PropertyTypeFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), propertyTypeFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public list = (propertyTypeFilter?: PropertyTypeFilter): Promise<PropertyType[]> => {
    return this.http.post<PropertyType[]>(kebabCase(nameof(this.list)), propertyTypeFilter)
      .then((response: AxiosResponse<PropertyType[]>) => {
        return response.data?.map((propertyType: PureModelData<PropertyType>) =>  PropertyType.clone<PropertyType>(propertyType));
    });
  };
  public get = (id: number | string): Promise<PropertyType> => {
    return this.http.post<PropertyType>
      (kebabCase(nameof(this.get)), { id })
        .then((response: AxiosResponse<PropertyType>) => PropertyType.clone<PropertyType>(response.data));
  };

  public create = (propertyType: PropertyType): Promise<PropertyType> => {
    return this.http.post<PropertyType>(kebabCase(nameof(this.create)), propertyType)
      .then((response: AxiosResponse<PureModelData<PropertyType>>) => PropertyType.clone<PropertyType>(response.data));
  };

  public update = (propertyType: PropertyType): Promise<PropertyType> => {
    return this.http.post<PropertyType>(kebabCase(nameof(this.update)), propertyType)
      .then((response: AxiosResponse<PropertyType>) => PropertyType.clone<PropertyType>(response.data));
  };

  public delete = (propertyType: PropertyType): Promise<PropertyType> => {
      return this.http.post<PropertyType>(kebabCase(nameof(this.delete)), propertyType)
        .then((response: AxiosResponse<PropertyType>) => PropertyType.clone<PropertyType>(response.data));
  };

  public save = (propertyType: PropertyType): Promise<PropertyType> => {
      return propertyType.id ? this.update(propertyType) : this.create(propertyType);
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
  export const propertyTypeRepository: PropertyType = new PropertyTypeRepository();