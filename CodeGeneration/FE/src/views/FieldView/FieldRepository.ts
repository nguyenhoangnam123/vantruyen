import { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import { url } from 'core/helpers/string';
import { Repository } from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_FIELD_ROUTE} from 'config/api-consts';
import { Field } from 'models/Field';
import { FieldFilter } from 'models/FieldFilter';
import { View } from 'models/View';
import { ViewFilter } from 'models/ViewFilter';
import { Permission } from 'models/Permission';
import { PermissionFilter } from 'models/PermissionFilter';

export class FieldRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_FIELD_ROUTE));
  }

  public count = (fieldFilter: FieldFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), fieldFilter)
      .then((response: AxiosResponse<number>) => {
        return response.data;
      });
  };

  public list = (fieldFilter: FieldFilter): Promise<Field[]> => {
    return this.http.post<Field[]>(kebabCase(nameof(this.list)), fieldFilter)
      .then((response: AxiosResponse<Array<PureModelData<Field>>>) => {
        return response.data.map((field: PureModelData<Field>) => {
          return Field.clone<Field>(field);
        });
    });
  };
  public get = (field: Field): Promise<Field> => {
    return this.http.post<Field>
      (kebabCase(nameof(this.get)), field)
        .then((response: AxiosResponse<PureModelData<Field>>) => {
          return Field.clone<Field>(response.data);
        });
  };

  public create = (field: Field): Promise<Field> => {
    return this.http.post<Field>(kebabCase(nameof(this.create)), field)
      .then((response: AxiosResponse<PureModelData<Field>>) => {
        return Field.clone<Field>(response.data);
      });
  };

  public update = (field: Field): Promise<Field> => {
    return this.http.post<Field>(kebabCase(nameof(this.update)), field)
      .then((response: AxiosResponse<PureModelData<Field>>) => {
        return Field.clone<Field>(response.data);
      });
  };

  public delete = (field: Field): Promise<Field> => {
      return this.http.post<Field>(kebabCase(nameof(this.delete)), field)
        .then((response: AxiosResponse<PureModelData<Field>>) => {
          return Field.clone<Field>(response.data);
        });
  };

  public save = (field: Field): Promise<Field> => {
      if (field.id) {
        return this.update(field);
      }
      return this.create(field);
   };

  public singleListView = (viewFilter: ViewFilter): Promise<View[]> => {
      return this.http.post<View[]>(kebabCase(nameof(this.singleListView)), viewFilter)
        .then((response: AxiosResponse<Array<PureModelData<View>>>) => {
          return response.data.map((view: PureModelData<View>) => {
            return View.clone<View>(view);
          });
        });
      };
  public singleListPermission = (permissionFilter: PermissionFilter): Promise<Permission[]> => {
      return this.http.post<Permission[]>(kebabCase(nameof(this.singleListPermission)), permissionFilter)
        .then((response: AxiosResponse<Array<PureModelData<Permission>>>) => {
          return response.data.map((permission: PureModelData<Permission>) => {
            return Permission.clone<Permission>(permission);
          });
        });
      };
  
  public countPermission = (permissionFilter: PermissionFilter):
      Promise<number> => {
        return this.http.post<number>(kebabCase(nameof(this.count) + nameof(Permission)), permissionFilter)
          .then((response: AxiosResponse<number>) => {
            return response.data;
        });
    };

  public listPermission = (permissionFilter: PermissionFilter): Promise<Permission[]> => {
        return this.http.post<Permission[]>(kebabCase(nameof(this.list) + nameof(Permission)), permissionFilter)
          .then((response: AxiosResponse<Array<PureModelData<Permission>>>) => {
            return response.data.map((permission: PureModelData<Permission>) => {
              return Permission.clone
              <Permission>(permission);
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
  export const fieldRepository: Field = new FieldRepository();