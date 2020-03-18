import { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import { url } from 'core/helpers/string';
import { Repository } from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_ROLE_ROUTE} from 'config/api-consts';
import { Role } from 'models/Role';
import { RoleFilter } from 'models/RoleFilter';
import { AppUser } from 'models/AppUser';
import { AppUserFilter } from 'models/AppUserFilter';
// import { Menu } from 'models/Menu';
// import { MenuFilter } from 'models/MenuFilter';

export class RoleRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_ROLE_ROUTE));
  }

  public count = (roleFilter?: RoleFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), roleFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public list = (roleFilter?: RoleFilter): Promise<Role[]> => {
    return this.http.post<Role[]>(kebabCase(nameof(this.list)), roleFilter)
      .then((response: AxiosResponse<Role[]>) => {
        return response.data?.map((role: PureModelData<Role>) =>  Role.clone<Role>(role));
    });
  };
  public get = (id: number | string): Promise<Role> => {
    return this.http.post<Role>
      (kebabCase(nameof(this.get)), { id })
        .then((response: AxiosResponse<Role>) => Role.clone<Role>(response.data));
  };

  public create = (role: Role): Promise<Role> => {
    return this.http.post<Role>(kebabCase(nameof(this.create)), role)
      .then((response: AxiosResponse<PureModelData<Role>>) => Role.clone<Role>(response.data));
  };

  public update = (role: Role): Promise<Role> => {
    return this.http.post<Role>(kebabCase(nameof(this.update)), role)
      .then((response: AxiosResponse<Role>) => Role.clone<Role>(response.data));
  };

  public delete = (role: Role): Promise<Role> => {
      return this.http.post<Role>(kebabCase(nameof(this.delete)), role)
        .then((response: AxiosResponse<Role>) => Role.clone<Role>(response.data));
  };

  public save = (role: Role): Promise<Role> => {
      return role.id ? this.update(role) : this.create(role);
  };

  public singleListAppUser = (appUserFilter: AppUserFilter): Promise<AppUser[]> => {
      return this.http.post<AppUser[]>(kebabCase(nameof(this.singleListAppUser)), appUserFilter)
        .then((response: AxiosResponse<AppUser[]>) => {
          return response.data.map((appUser: PureModelData<AppUser>) => AppUser.clone<AppUser>(appUser));
        });
  };
  // public singleListMenu = (menuFilter: MenuFilter): Promise<Menu[]> => {
  //     return this.http.post<Menu[]>(kebabCase(nameof(this.singleListMenu)), menuFilter)
  //       .then((response: AxiosResponse<Menu[]>) => {
  //         return response.data.map((menu: PureModelData<Menu>) => Menu.clone<Menu>(menu));
  //       });
  // };

  public countAppUser = (appUserFilter: AppUserFilter):
      Promise<number> => {
        return this.http.post<number>(kebabCase(nameof(this.countAppUser)), appUserFilter)
          .then((response: AxiosResponse<number>) =>  response.data);
    };

  public listAppUser = (appUserFilter: AppUserFilter): Promise<AppUser[]> => {
        return this.http.post<AppUser[]>(kebabCase(nameof(this.listAppUser)), appUserFilter)
          .then((response: AxiosResponse<AppUser[]>) => {
            return response.data.map((appUser: PureModelData<AppUser>) => AppUser.clone<AppUser>(appUser));
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
  export const roleRepository: Role = new RoleRepository();
