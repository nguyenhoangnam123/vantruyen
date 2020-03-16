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

  public count = (viewFilter: ViewFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), viewFilter)
      .then((response: AxiosResponse<number>) => {
        return response.data;
      });
  };

  public list = (viewFilter: ViewFilter): Promise<View[]> => {
    return this.http.post<View[]>(kebabCase(nameof(this.list)), viewFilter)
      .then((response: AxiosResponse<Array<PureModelData<View>>>) => {
        return response.data.map((view: PureModelData<View>) => {
          return View.clone<View>(view);
        });
    });
  };
  public get = (view: View): Promise<View> => {
    return this.http.post<View>
      (kebabCase(nameof(this.get)), view)
        .then((response: AxiosResponse<PureModelData<View>>) => {
          return View.clone<View>(response.data);
        });
  };

  public create = (view: View): Promise<View> => {
    return this.http.post<View>(kebabCase(nameof(this.create)), view)
      .then((response: AxiosResponse<PureModelData<View>>) => {
        return View.clone<View>(response.data);
      });
  };

  public update = (view: View): Promise<View> => {
    return this.http.post<View>(kebabCase(nameof(this.update)), view)
      .then((response: AxiosResponse<PureModelData<View>>) => {
        return View.clone<View>(response.data);
      });
  };

  public delete = (view: View): Promise<View> => {
      return this.http.post<View>(kebabCase(nameof(this.delete)), view)
        .then((response: AxiosResponse<PureModelData<View>>) => {
          return View.clone<View>(response.data);
        });
  };

  public save = (view: View): Promise<View> => {
      if (view.id) {
        return this.update(view);
      }
      return this.create(view);
   };

  public singleListRole = (roleFilter: RoleFilter): Promise<Role[]> => {
      return this.http.post<Role[]>(kebabCase(nameof(this.singleListRole)), roleFilter)
        .then((response: AxiosResponse<Array<PureModelData<Role>>>) => {
          return response.data.map((role: PureModelData<Role>) => {
            return Role.clone<Role>(role);
          });
        });
      };
  

  public bulkDelete = (idList: BatchId): Promise<void> => {
    return this.http.post(kebabCase(nameof(this.bulkDelete)), idList)
    .then((response: AxiosResponse<void>) => {
      return response.data;
    });
  };

  public import = (file: File, name: string = nameof(file)): Promise<void> => {
    const formData: FormData =
    new FormData();
    formData.append(name, file);
    return this.http.post<void>(kebabCase(nameof(this.import)), formData)
      .then((response: AxiosResponse<void>) => {
        return response.data;
      });
    };
  }
  export const viewRepository: View = new ViewRepository();