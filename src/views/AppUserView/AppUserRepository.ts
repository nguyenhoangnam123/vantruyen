import { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import { url } from 'core/helpers/string';
import { Repository } from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_APP_USER_ROUTE} from 'config/api-consts';
import { AppUser } from 'models/AppUser';
import { AppUserFilter } from 'models/AppUserFilter';
import { UserStatus } from 'models/UserStatus';
import { UserStatusFilter } from 'models/UserStatusFilter';
import { Role } from 'models/Role';
import { RoleFilter } from 'models/RoleFilter';

export class AppUserRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_APP_USER_ROUTE));
  }

  public count = (appUserFilter?: AppUserFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), appUserFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public list = (appUserFilter?: AppUserFilter): Promise<AppUser[]> => {
    return this.http.post<AppUser[]>(kebabCase(nameof(this.list)), appUserFilter)
      .then((response: AxiosResponse<AppUser[]>) => {
        return response.data?.map((appUser: PureModelData<AppUser>) =>  AppUser.clone<AppUser>(appUser));
    });
  };
  public get = (id: number | string): Promise<AppUser> => {
    return this.http.post<AppUser>
      (kebabCase(nameof(this.get)), { id })
        .then((response: AxiosResponse<AppUser>) => AppUser.clone<AppUser>(response.data));
  };

  public create = (appUser: AppUser): Promise<AppUser> => {
    return this.http.post<AppUser>(kebabCase(nameof(this.create)), appUser)
      .then((response: AxiosResponse<PureModelData<AppUser>>) => AppUser.clone<AppUser>(response.data));
  };

  public update = (appUser: AppUser): Promise<AppUser> => {
    return this.http.post<AppUser>(kebabCase(nameof(this.update)), appUser)
      .then((response: AxiosResponse<AppUser>) => AppUser.clone<AppUser>(response.data));
  };

  public delete = (appUser: AppUser): Promise<AppUser> => {
      return this.http.post<AppUser>(kebabCase(nameof(this.delete)), appUser)
        .then((response: AxiosResponse<AppUser>) => AppUser.clone<AppUser>(response.data));
  };

  public save = (appUser: AppUser): Promise<AppUser> => {
      return appUser.id ? this.update(appUser) : this.create(appUser);
  };

  public singleListUserStatus = (): Promise<UserStatus[]> =>
  {
      return this.http.post<UserStatus[]>(kebabCase(nameof(this.singleListUserStatus)), new UserStatusFilter())
        .then((response: AxiosResponse<UserStatus[]>) => {
          return response.data.map((userStatus: PureModelData<UserStatus>) => UserStatus.clone<UserStatus>(userStatus));
      });
  };
  public singleListRole = (roleFilter: RoleFilter): Promise<Role[]> => {
      return this.http.post<Role[]>(kebabCase(nameof(this.singleListRole)), roleFilter)
        .then((response: AxiosResponse<Role[]>) => {
          return response.data.map((role: PureModelData<Role>) => Role.clone<Role>(role));
        });
  };

  public countRole = (roleFilter: RoleFilter):
      Promise<number> => {
        return this.http.post<number>(kebabCase(nameof(this.countRole)), roleFilter)
          .then((response: AxiosResponse<number>) =>  response.data);
    };

  public listRole = (roleFilter: RoleFilter): Promise<Role[]> => {
        return this.http.post<Role[]>(kebabCase(nameof(this.listRole)), roleFilter)
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
  export const appUserRepository: AppUser = new AppUserRepository();