import { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import { url } from 'core/helpers/string';
import { Repository } from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_SITE_ROUTE} from 'config/api-consts';
import { Site } from 'models/Site';
import { SiteFilter } from 'models/SiteFilter';

export class SiteRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_SITE_ROUTE));
  }

  public count = (siteFilter: SiteFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), siteFilter)
      .then((response: AxiosResponse<number>) => {
        return response.data;
      });
  };

  public list = (siteFilter: SiteFilter): Promise<Site[]> => {
    return this.http.post<Site[]>(kebabCase(nameof(this.list)), siteFilter)
      .then((response: AxiosResponse<Array<PureModelData<Site>>>) => {
        return response.data.map((site: PureModelData<Site>) => {
          return Site.clone<Site>(site);
        });
    });
  };
  public get = (site: Site): Promise<Site> => {
    return this.http.post<Site>
      (kebabCase(nameof(this.get)), site)
        .then((response: AxiosResponse<PureModelData<Site>>) => {
          return Site.clone<Site>(response.data);
        });
  };

  public create = (site: Site): Promise<Site> => {
    return this.http.post<Site>(kebabCase(nameof(this.create)), site)
      .then((response: AxiosResponse<PureModelData<Site>>) => {
        return Site.clone<Site>(response.data);
      });
  };

  public update = (site: Site): Promise<Site> => {
    return this.http.post<Site>(kebabCase(nameof(this.update)), site)
      .then((response: AxiosResponse<PureModelData<Site>>) => {
        return Site.clone<Site>(response.data);
      });
  };

  public delete = (site: Site): Promise<Site> => {
      return this.http.post<Site>(kebabCase(nameof(this.delete)), site)
        .then((response: AxiosResponse<PureModelData<Site>>) => {
          return Site.clone<Site>(response.data);
        });
  };

  public save = (site: Site): Promise<Site> => {
      if (site.id) {
        return this.update(site);
      }
      return this.create(site);
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
  export const siteRepository: Site = new SiteRepository();