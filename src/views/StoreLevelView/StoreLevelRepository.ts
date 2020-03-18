import { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import { url } from 'core/helpers/string';
import { Repository } from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_STORE_LEVEL_ROUTE} from 'config/api-consts';
import { StoreLevel } from 'models/StoreLevel';
import { StoreLevelFilter } from 'models/StoreLevelFilter';

export class StoreLevelRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_STORE_LEVEL_ROUTE));
  }

  public count = (storeLevelFilter?: StoreLevelFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), storeLevelFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public list = (storeLevelFilter?: StoreLevelFilter): Promise<StoreLevel[]> => {
    return this.http.post<StoreLevel[]>(kebabCase(nameof(this.list)), storeLevelFilter)
      .then((response: AxiosResponse<StoreLevel[]>) => {
        return response.data?.map((storeLevel: PureModelData<StoreLevel>) =>  StoreLevel.clone<StoreLevel>(storeLevel));
    });
  };
  public get = (id: number | string): Promise<StoreLevel> => {
    return this.http.post<StoreLevel>
      (kebabCase(nameof(this.get)), { id })
        .then((response: AxiosResponse<StoreLevel>) => StoreLevel.clone<StoreLevel>(response.data));
  };

  public create = (storeLevel: StoreLevel): Promise<StoreLevel> => {
    return this.http.post<StoreLevel>(kebabCase(nameof(this.create)), storeLevel)
      .then((response: AxiosResponse<PureModelData<StoreLevel>>) => StoreLevel.clone<StoreLevel>(response.data));
  };

  public update = (storeLevel: StoreLevel): Promise<StoreLevel> => {
    return this.http.post<StoreLevel>(kebabCase(nameof(this.update)), storeLevel)
      .then((response: AxiosResponse<StoreLevel>) => StoreLevel.clone<StoreLevel>(response.data));
  };

  public delete = (storeLevel: StoreLevel): Promise<StoreLevel> => {
      return this.http.post<StoreLevel>(kebabCase(nameof(this.delete)), storeLevel)
        .then((response: AxiosResponse<StoreLevel>) => StoreLevel.clone<StoreLevel>(response.data));
  };

  public save = (storeLevel: StoreLevel): Promise<StoreLevel> => {
      return storeLevel.id ? this.update(storeLevel) : this.create(storeLevel);
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
  export const storeLevelRepository: StoreLevel = new StoreLevelRepository();