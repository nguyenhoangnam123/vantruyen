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
import { ApplicationUser } from 'models/ApplicationUser';
import { ApplicationUserFilter } from 'models/ApplicationUserFilter';
import { View } from 'models/View';
import { ViewFilter } from 'models/ViewFilter';

export class RoleRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_ROLE_ROUTE));
  }

  public count = (roleFilter: RoleFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), roleFilter)
      .then((response: AxiosResponse<number>) => {
        return response.data;
      });
  };

  public list = (roleFilter: RoleFilter): Promise<Role[]> => {
    return this.http.post<Role[]>(kebabCase(nameof(this.list)), roleFilter)
      .then((response: AxiosResponse<Array<PureModelData<Role>>>) => {
        return response.data.map((role: PureModelData<Role>) => {
          return Role.clone<Role>(role);
        });
    });
  };
  public get = (role: Role): Promise<Role> => {
    return this.http.post<Role>
      (kebabCase(nameof(this.get)), role)
        .then((response: AxiosResponse<PureModelData<Role>>) => {
          return Role.clone<Role>(response.data);
        });
  };

  public create = (role: Role): Promise<Role> => {
    return this.http.post<Role>(kebabCase(nameof(this.create)), role)
      .then((response: AxiosResponse<PureModelData<Role>>) => {
        return Role.clone<Role>(response.data);
      });
  };

  public update = (role: Role): Promise<Role> => {
    return this.http.post<Role>(kebabCase(nameof(this.update)), role)
      .then((response: AxiosResponse<PureModelData<Role>>) => {
        return Role.clone<Role>(response.data);
      });
  };

  public delete = (role: Role): Promise<Role> => {
      return this.http.post<Role>(kebabCase(nameof(this.delete)), role)
        .then((response: AxiosResponse<PureModelData<Role>>) => {
          return Role.clone<Role>(response.data);
        });
  };

  public save = (role: Role): Promise<Role> => {
      if (role.id) {
        return this.update(role);
      }
      return this.create(role);
   };

  public singleListApplicationUser = (applicationUserFilter: ApplicationUserFilter): Promise<ApplicationUser[]> => {
      return this.http.post<ApplicationUser[]>(kebabCase(nameof(this.singleListApplicationUser)), applicationUserFilter)
        .then((response: AxiosResponse<Array<PureModelData<ApplicationUser>>>) => {
          return response.data.map((applicationUser: PureModelData<ApplicationUser>) => {
            return ApplicationUser.clone<ApplicationUser>(applicationUser);
          });
        });
      };
  public singleListView = (viewFilter: ViewFilter): Promise<View[]> => {
      return this.http.post<View[]>(kebabCase(nameof(this.singleListView)), viewFilter)
        .then((response: AxiosResponse<Array<PureModelData<View>>>) => {
          return response.data.map((view: PureModelData<View>) => {
            return View.clone<View>(view);
          });
        });
      };
  
  public countApplicationUser = (applicationUserFilter: ApplicationUserFilter):
      Promise<number> => {
        return this.http.post<number>(kebabCase(nameof(this.count) + nameof(ApplicationUser)), applicationUserFilter)
          .then((response: AxiosResponse<number>) => {
            return response.data;
        });
    };

  public listApplicationUser = (applicationUserFilter: ApplicationUserFilter): Promise<ApplicationUser[]> => {
        return this.http.post<ApplicationUser[]>(kebabCase(nameof(this.list) + nameof(ApplicationUser)), applicationUserFilter)
          .then((response: AxiosResponse<Array<PureModelData<ApplicationUser>>>) => {
            return response.data.map((applicationUser: PureModelData<ApplicationUser>) => {
              return ApplicationUser.clone
              <ApplicationUser>(applicationUser);
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
  export const roleRepository: Role = new RoleRepository();