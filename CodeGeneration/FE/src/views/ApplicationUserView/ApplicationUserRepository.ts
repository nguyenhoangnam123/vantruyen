import { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import { url } from 'core/helpers/string';
import { Repository } from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_APPLICATION_USER_ROUTE} from 'config/api-consts';
import { ApplicationUser } from 'models/ApplicationUser';
import { ApplicationUserFilter } from 'models/ApplicationUserFilter';
import { UserStatus } from 'models/UserStatus';
import { UserStatusFilter } from 'models/UserStatusFilter';
import { Role } from 'models/Role';
import { RoleFilter } from 'models/RoleFilter';

export class ApplicationUserRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_APPLICATION_USER_ROUTE));
  }

  public count = (applicationUserFilter: ApplicationUserFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), applicationUserFilter)
      .then((response: AxiosResponse<number>) => {
        return response.data;
      });
  };

  public list = (applicationUserFilter: ApplicationUserFilter): Promise<ApplicationUser[]> => {
    return this.http.post<ApplicationUser[]>(kebabCase(nameof(this.list)), applicationUserFilter)
      .then((response: AxiosResponse<Array<PureModelData<ApplicationUser>>>) => {
        return response.data.map((applicationUser: PureModelData<ApplicationUser>) => {
          return ApplicationUser.clone<ApplicationUser>(applicationUser);
        });
    });
  };
  public get = (applicationUser: ApplicationUser): Promise<ApplicationUser> => {
    return this.http.post<ApplicationUser>
      (kebabCase(nameof(this.get)), applicationUser)
        .then((response: AxiosResponse<PureModelData<ApplicationUser>>) => {
          return ApplicationUser.clone<ApplicationUser>(response.data);
        });
  };

  public create = (applicationUser: ApplicationUser): Promise<ApplicationUser> => {
    return this.http.post<ApplicationUser>(kebabCase(nameof(this.create)), applicationUser)
      .then((response: AxiosResponse<PureModelData<ApplicationUser>>) => {
        return ApplicationUser.clone<ApplicationUser>(response.data);
      });
  };

  public update = (applicationUser: ApplicationUser): Promise<ApplicationUser> => {
    return this.http.post<ApplicationUser>(kebabCase(nameof(this.update)), applicationUser)
      .then((response: AxiosResponse<PureModelData<ApplicationUser>>) => {
        return ApplicationUser.clone<ApplicationUser>(response.data);
      });
  };

  public delete = (applicationUser: ApplicationUser): Promise<ApplicationUser> => {
      return this.http.post<ApplicationUser>(kebabCase(nameof(this.delete)), applicationUser)
        .then((response: AxiosResponse<PureModelData<ApplicationUser>>) => {
          return ApplicationUser.clone<ApplicationUser>(response.data);
        });
  };

  public save = (applicationUser: ApplicationUser): Promise<ApplicationUser> => {
      if (applicationUser.id) {
        return this.update(applicationUser);
      }
      return this.create(applicationUser);
   };

  public singleListUserStatus = (): Promise<UserStatus[]> =>
  {
      return this.http.post<UserStatus[]>(kebabCase(nameof(this.singleListUserStatus)), new UserStatusFilter())
        .then((response: AxiosResponse<Array<PureModelData<UserStatus>>>) => {
          return response.data.map((userStatus: PureModelData<UserStatus>) => {
              return UserStatus.clone<UserStatus>
                (userStatus);
            });
      });
  };
  public singleListRole = (roleFilter: RoleFilter): Promise<Role[]> => {
      return this.http.post<Role[]>(kebabCase(nameof(this.singleListRole)), roleFilter)
        .then((response: AxiosResponse<Array<PureModelData<Role>>>) => {
          return response.data.map((role: PureModelData<Role>) => {
            return Role.clone<Role>(role);
          });
        });
      };
  
  public countRole = (roleFilter: RoleFilter):
      Promise<number> => {
        return this.http.post<number>(kebabCase(nameof(this.count) + nameof(Role)), roleFilter)
          .then((response: AxiosResponse<number>) => {
            return response.data;
        });
    };

  public listRole = (roleFilter: RoleFilter): Promise<Role[]> => {
        return this.http.post<Role[]>(kebabCase(nameof(this.list) + nameof(Role)), roleFilter)
          .then((response: AxiosResponse<Array<PureModelData<Role>>>) => {
            return response.data.map((role: PureModelData<Role>) => {
              return Role.clone
              <Role>(role);
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
  export const applicationUserRepository: ApplicationUser = new ApplicationUserRepository();