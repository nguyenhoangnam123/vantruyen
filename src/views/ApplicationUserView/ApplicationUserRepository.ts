import {AxiosResponse} from 'axios';
import nameof from 'ts-nameof.macro';
import {url} from 'core/helpers/string';
import {Repository} from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_APPLICATION_USER_ROUTE} from 'config/api-consts';
import {ApplicationUser} from 'models/ApplicationUser';
import {ApplicationUserFilter} from 'models/ApplicationUserFilter';
import {UserStatus} from 'models/UserStatus';
import {UserStatusFilter} from 'models/UserStatusFilter';
import {Role} from 'models/Role';
import {RoleFilter} from 'models/RoleFilter';

export class ApplicationUserRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_APPLICATION_USER_ROUTE));
  }

  public count = (applicationUserFilter?: ApplicationUserFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), applicationUserFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public list = (applicationUserFilter?: ApplicationUserFilter): Promise<ApplicationUser[]> => {
    return this.http.post<ApplicationUser[]>(kebabCase(nameof(this.list)), applicationUserFilter)
      .then((response: AxiosResponse<ApplicationUser[]>) => {
        return response.data?.map((applicationUser: PureModelData<ApplicationUser>) => ApplicationUser.clone<ApplicationUser>(applicationUser));
      });
  };

  public get = (id: number | string): Promise<ApplicationUser> => {
    return this.http.post<ApplicationUser>
    (kebabCase(nameof(this.get)), {id})
      .then((response: AxiosResponse<ApplicationUser>) => ApplicationUser.clone<ApplicationUser>(response.data));
  };

  public create = (applicationUser: ApplicationUser): Promise<ApplicationUser> => {
    return this.http.post<ApplicationUser>(kebabCase(nameof(this.create)), applicationUser)
      .then((response: AxiosResponse<PureModelData<ApplicationUser>>) => ApplicationUser.clone<ApplicationUser>(response.data));
  };

  public update = (applicationUser: ApplicationUser): Promise<ApplicationUser> => {
    return this.http.post<ApplicationUser>(kebabCase(nameof(this.update)), applicationUser)
      .then((response: AxiosResponse<ApplicationUser>) => ApplicationUser.clone<ApplicationUser>(response.data));
  };

  public delete = (applicationUser: ApplicationUser): Promise<ApplicationUser> => {
    return this.http.post<ApplicationUser>(kebabCase(nameof(this.delete)), applicationUser)
      .then((response: AxiosResponse<ApplicationUser>) => ApplicationUser.clone<ApplicationUser>(response.data));
  };

  public save = (applicationUser: ApplicationUser): Promise<ApplicationUser> => {
    return applicationUser.id ? this.update(applicationUser) : this.create(applicationUser);
  };

  public singleListUserStatus = (): Promise<UserStatus[]> => {
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
      .then((response: AxiosResponse<number>) => response.data);
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

export const applicationUserRepository: ApplicationUser = new ApplicationUserRepository();
