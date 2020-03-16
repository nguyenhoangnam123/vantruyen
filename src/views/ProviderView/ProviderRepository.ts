import { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import { url } from 'core/helpers/string';
import { Repository } from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_PROVIDER_ROUTE} from 'config/api-consts';
import { Provider } from 'models/Provider';
import { ProviderFilter } from 'models/ProviderFilter';

export class ProviderRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_PROVIDER_ROUTE));
  }

  public count = (providerFilter?: ProviderFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), providerFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public list = (providerFilter?: ProviderFilter): Promise<Provider[]> => {
    return this.http.post<Provider[]>(kebabCase(nameof(this.list)), providerFilter)
      .then((response: AxiosResponse<Provider[]>) => {
        return response.data?.map((provider: PureModelData<Provider>) =>  Provider.clone<Provider>(provider));
    });
  };
  public get = (id: number | string): Promise<Provider> => {
    return this.http.post<Provider>
      (kebabCase(nameof(this.get)), { id })
        .then((response: AxiosResponse<Provider>) => Provider.clone<Provider>(response.data));
  };

  public create = (provider: Provider): Promise<Provider> => {
    return this.http.post<Provider>(kebabCase(nameof(this.create)), provider)
      .then((response: AxiosResponse<PureModelData<Provider>>) => Provider.clone<Provider>(response.data));
  };

  public update = (provider: Provider): Promise<Provider> => {
    return this.http.post<Provider>(kebabCase(nameof(this.update)), provider)
      .then((response: AxiosResponse<Provider>) => Provider.clone<Provider>(response.data));
  };

  public delete = (provider: Provider): Promise<Provider> => {
      return this.http.post<Provider>(kebabCase(nameof(this.delete)), provider)
        .then((response: AxiosResponse<Provider>) => Provider.clone<Provider>(response.data));
  };

  public save = (provider: Provider): Promise<Provider> => {
      return provider.id ? this.update(provider) : this.create(provider);
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
  export const providerRepository: Provider = new ProviderRepository();