import {AxiosResponse} from 'axios';
import nameof from 'ts-nameof.macro';
import {url} from 'core/helpers/string';
import {Repository} from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_ROLE_ROUTE} from 'config/api-consts';
import {Role} from 'models/Role';
import {RoleFilter} from 'models/RoleFilter';
import {ApplicationUser} from 'models/ApplicationUser';
import {ApplicationUserFilter} from 'models/ApplicationUserFilter';
import {View} from 'models/View';
import {ViewFilter} from 'models/ViewFilter';

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
        return response.data?.map((role: PureModelData<Role>) => Role.clone<Role>(role));
      });
  };

  public get = (id: number | string): Promise<Role> => {
    return this.http.post<Role>
    (kebabCase(nameof(this.get)), {id})
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

  public singleListApplicationUser = (applicationUserFilter: ApplicationUserFilter): Promise<ApplicationUser[]> => {
    return this.http.post<ApplicationUser[]>(kebabCase(nameof(this.singleListApplicationUser)), applicationUserFilter)
      .then((response: AxiosResponse<ApplicationUser[]>) => {
        return response.data.map((applicationUser: PureModelData<ApplicationUser>) => ApplicationUser.clone<ApplicationUser>(applicationUser));
      });
  };

  public singleListView = (viewFilter: ViewFilter): Promise<View[]> => {
    return this.http.post<View[]>(kebabCase(nameof(this.singleListView)), viewFilter)
      .then((response: AxiosResponse<View[]>) => {
        return response.data.map((view: PureModelData<View>) => View.clone<View>(view));
      });
  };

  public countApplicationUser = (applicationUserFilter: ApplicationUserFilter):
    Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.countApplicationUser)), applicationUserFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public listApplicationUser = (applicationUserFilter: ApplicationUserFilter): Promise<ApplicationUser[]> => {
    return this.http.post<ApplicationUser[]>(kebabCase(nameof(this.listApplicationUser)), applicationUserFilter)
      .then((response: AxiosResponse<ApplicationUser[]>) => {
        return response.data.map((applicationUser: PureModelData<ApplicationUser>) => ApplicationUser.clone<ApplicationUser>(applicationUser));
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
