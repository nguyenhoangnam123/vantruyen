import {AxiosResponse} from 'axios';
import nameof from 'ts-nameof.macro';
import {url} from 'core/helpers/string';
import {Repository} from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_PAGE_ROUTE} from 'config/api-consts';
import {Page} from 'models/Page';
import {PageFilter} from 'models/PageFilter';
import {View} from 'models/View';
import {ViewFilter} from 'models/ViewFilter';
import {Permission} from 'models/Permission';
import {PermissionFilter} from 'models/PermissionFilter';

export class PageRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_PAGE_ROUTE));
  }

  public count = (pageFilter?: PageFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), pageFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public list = (pageFilter?: PageFilter): Promise<Page[]> => {
    return this.http.post<Page[]>(kebabCase(nameof(this.list)), pageFilter)
      .then((response: AxiosResponse<Page[]>) => {
        return response.data?.map((page: PureModelData<Page>) => Page.clone<Page>(page));
      });
  };

  public get = (id: number | string): Promise<Page> => {
    return this.http.post<Page>
    (kebabCase(nameof(this.get)), {id})
      .then((response: AxiosResponse<Page>) => Page.clone<Page>(response.data));
  };

  public create = (page: Page): Promise<Page> => {
    return this.http.post<Page>(kebabCase(nameof(this.create)), page)
      .then((response: AxiosResponse<PureModelData<Page>>) => Page.clone<Page>(response.data));
  };

  public update = (page: Page): Promise<Page> => {
    return this.http.post<Page>(kebabCase(nameof(this.update)), page)
      .then((response: AxiosResponse<Page>) => Page.clone<Page>(response.data));
  };

  public delete = (page: Page): Promise<Page> => {
    return this.http.post<Page>(kebabCase(nameof(this.delete)), page)
      .then((response: AxiosResponse<Page>) => Page.clone<Page>(response.data));
  };

  public save = (page: Page): Promise<Page> => {
    return page.id ? this.update(page) : this.create(page);
  };

  public singleListView = (viewFilter: ViewFilter): Promise<View[]> => {
    return this.http.post<View[]>(kebabCase(nameof(this.singleListView)), viewFilter)
      .then((response: AxiosResponse<View[]>) => {
        return response.data.map((view: PureModelData<View>) => View.clone<View>(view));
      });
  };

  public singleListPermission = (permissionFilter: PermissionFilter): Promise<Permission[]> => {
    return this.http.post<Permission[]>(kebabCase(nameof(this.singleListPermission)), permissionFilter)
      .then((response: AxiosResponse<Permission[]>) => {
        return response.data.map((permission: PureModelData<Permission>) => Permission.clone<Permission>(permission));
      });
  };

  public countPermission = (permissionFilter: PermissionFilter):
    Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.countPermission)), permissionFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public listPermission = (permissionFilter: PermissionFilter): Promise<Permission[]> => {
    return this.http.post<Permission[]>(kebabCase(nameof(this.listPermission)), permissionFilter)
      .then((response: AxiosResponse<Permission[]>) => {
        return response.data.map((permission: PureModelData<Permission>) => Permission.clone<Permission>(permission));
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

export const pageRepository: Page = new PageRepository();
