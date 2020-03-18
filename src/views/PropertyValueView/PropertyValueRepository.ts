import { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import { url } from 'core/helpers/string';
import { Repository } from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_PROPERTY_VALUE_ROUTE} from 'config/api-consts';
import { PropertyValue } from 'models/PropertyValue';
import { PropertyValueFilter } from 'models/PropertyValueFilter';
import { Property } from 'models/Property';
import { PropertyFilter } from 'models/PropertyFilter';

export class PropertyValueRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_PROPERTY_VALUE_ROUTE));
  }

  public count = (propertyValueFilter?: PropertyValueFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), propertyValueFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public list = (propertyValueFilter?: PropertyValueFilter): Promise<PropertyValue[]> => {
    return this.http.post<PropertyValue[]>(kebabCase(nameof(this.list)), propertyValueFilter)
      .then((response: AxiosResponse<PropertyValue[]>) => {
        return response.data?.map((propertyValue: PureModelData<PropertyValue>) =>  PropertyValue.clone<PropertyValue>(propertyValue));
    });
  };
  public get = (id: number | string): Promise<PropertyValue> => {
    return this.http.post<PropertyValue>
      (kebabCase(nameof(this.get)), { id })
        .then((response: AxiosResponse<PropertyValue>) => PropertyValue.clone<PropertyValue>(response.data));
  };

  public create = (propertyValue: PropertyValue): Promise<PropertyValue> => {
    return this.http.post<PropertyValue>(kebabCase(nameof(this.create)), propertyValue)
      .then((response: AxiosResponse<PureModelData<PropertyValue>>) => PropertyValue.clone<PropertyValue>(response.data));
  };

  public update = (propertyValue: PropertyValue): Promise<PropertyValue> => {
    return this.http.post<PropertyValue>(kebabCase(nameof(this.update)), propertyValue)
      .then((response: AxiosResponse<PropertyValue>) => PropertyValue.clone<PropertyValue>(response.data));
  };

  public delete = (propertyValue: PropertyValue): Promise<PropertyValue> => {
      return this.http.post<PropertyValue>(kebabCase(nameof(this.delete)), propertyValue)
        .then((response: AxiosResponse<PropertyValue>) => PropertyValue.clone<PropertyValue>(response.data));
  };

  public save = (propertyValue: PropertyValue): Promise<PropertyValue> => {
      return propertyValue.id ? this.update(propertyValue) : this.create(propertyValue);
  };

  public singleListProperty = (propertyFilter: PropertyFilter): Promise<Property[]> => {
      return this.http.post<Property[]>(kebabCase(nameof(this.singleListProperty)), propertyFilter)
        .then((response: AxiosResponse<Property[]>) => {
          return response.data.map((property: PureModelData<Property>) => Property.clone<Property>(property));
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
  export const propertyValueRepository: PropertyValue = new PropertyValueRepository();