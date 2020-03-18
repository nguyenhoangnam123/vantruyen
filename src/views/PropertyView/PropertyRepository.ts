import { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import { url } from 'core/helpers/string';
import { Repository } from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_PROPERTY_ROUTE} from 'config/api-consts';
import { Property } from 'models/Property';
import { PropertyFilter } from 'models/PropertyFilter';

export class PropertyRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_PROPERTY_ROUTE));
  }

  public count = (propertyFilter?: PropertyFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), propertyFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public list = (propertyFilter?: PropertyFilter): Promise<Property[]> => {
    return this.http.post<Property[]>(kebabCase(nameof(this.list)), propertyFilter)
      .then((response: AxiosResponse<Property[]>) => {
        return response.data?.map((property: PureModelData<Property>) =>  Property.clone<Property>(property));
    });
  };
  public get = (id: number | string): Promise<Property> => {
    return this.http.post<Property>
      (kebabCase(nameof(this.get)), { id })
        .then((response: AxiosResponse<Property>) => Property.clone<Property>(response.data));
  };

  public create = (property: Property): Promise<Property> => {
    return this.http.post<Property>(kebabCase(nameof(this.create)), property)
      .then((response: AxiosResponse<PureModelData<Property>>) => Property.clone<Property>(response.data));
  };

  public update = (property: Property): Promise<Property> => {
    return this.http.post<Property>(kebabCase(nameof(this.update)), property)
      .then((response: AxiosResponse<Property>) => Property.clone<Property>(response.data));
  };

  public delete = (property: Property): Promise<Property> => {
      return this.http.post<Property>(kebabCase(nameof(this.delete)), property)
        .then((response: AxiosResponse<Property>) => Property.clone<Property>(response.data));
  };

  public save = (property: Property): Promise<Property> => {
      return property.id ? this.update(property) : this.create(property);
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
  export const propertyRepository: Property = new PropertyRepository();