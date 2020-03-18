import { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import { url } from 'core/helpers/string';
import { Repository } from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_VIEW_ROUTE} from 'config/api-consts';
import { View } from 'models/View';
import { ViewFilter } from 'models/ViewFilter';
import { Role } from 'models/Role';
import { RoleFilter } from 'models/RoleFilter';

export class ViewRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_VIEW_ROUTE));
  }

  public count = (viewFilter?: ViewFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), viewFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public list = (viewFilter?: ViewFilter): Promise<View[]> => {
    return this.http.post<View[]>(kebabCase(nameof(this.list)), viewFilter)
      .then((response: AxiosResponse<View[]>) => {
        return response.data?.map((view: PureModelData<View>) =>  View.clone<View>(view));
    });
  };
  public get = (id: number | string): Promise<View> => {
    return this.http.post<View>
      (kebabCase(nameof(this.get)), { id })
        .then((response: AxiosResponse<View>) => View.clone<View>(response.data));
  };

  public create = (view: View): Promise<View> => {
    return this.http.post<View>(kebabCase(nameof(this.create)), view)
      .then((response: AxiosResponse<PureModelData<View>>) => View.clone<View>(response.data));
  };

  public update = (view: View): Promise<View> => {
    return this.http.post<View>(kebabCase(nameof(this.update)), view)
      .then((response: AxiosResponse<View>) => View.clone<View>(response.data));
  };

  public delete = (view: View): Promise<View> => {
      return this.http.post<View>(kebabCase(nameof(this.delete)), view)
        .then((response: AxiosResponse<View>) => View.clone<View>(response.data));
  };

  public save = (view: View): Promise<View> => {
      return view.id ? this.update(view) : this.create(view);
  };

  public singleListRole = (roleFilter: RoleFilter): Promise<Role[]> => {
      return this.http.post<Role[]>(kebabCase(nameof(this.singleListRole)), roleFilter)
        .then((response: AxiosResponse<Role[]>) => {
          return response.data.map((role: PureModelData<Role>) => Role.clone<Role>(role));
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
  export const viewRepository: View = new ViewRepository();