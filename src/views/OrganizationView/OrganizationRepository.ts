import { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import { url } from 'core/helpers/string';
import { Repository } from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_ORGANIZATION_ROUTE} from 'config/api-consts';
import { Organization } from 'models/Organization';
import { OrganizationFilter } from 'models/OrganizationFilter';
import { District } from 'models/District';
import { DistrictFilter } from 'models/DistrictFilter';
import { Province } from 'models/Province';
import { ProvinceFilter } from 'models/ProvinceFilter';
import { StoreGrouping } from 'models/StoreGrouping';
import { StoreGroupingFilter } from 'models/StoreGroupingFilter';
import { StoreType } from 'models/StoreType';
import { StoreTypeFilter } from 'models/StoreTypeFilter';
import { Ward } from 'models/Ward';
import { WardFilter } from 'models/WardFilter';

export class OrganizationRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_ORGANIZATION_ROUTE));
  }

  public count = (organizationFilter?: OrganizationFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), organizationFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public list = (organizationFilter?: OrganizationFilter): Promise<Organization[]> => {
    return this.http.post<Organization[]>(kebabCase(nameof(this.list)), organizationFilter)
      .then((response: AxiosResponse<Organization[]>) => {
        return response.data?.map((organization: PureModelData<Organization>) =>  Organization.clone<Organization>(organization));
    });
  };
  public get = (id: number | string): Promise<Organization> => {
    return this.http.post<Organization>
      (kebabCase(nameof(this.get)), { id })
        .then((response: AxiosResponse<Organization>) => Organization.clone<Organization>(response.data));
  };

  public create = (organization: Organization): Promise<Organization> => {
    return this.http.post<Organization>(kebabCase(nameof(this.create)), organization)
      .then((response: AxiosResponse<PureModelData<Organization>>) => Organization.clone<Organization>(response.data));
  };

  public update = (organization: Organization): Promise<Organization> => {
    return this.http.post<Organization>(kebabCase(nameof(this.update)), organization)
      .then((response: AxiosResponse<Organization>) => Organization.clone<Organization>(response.data));
  };

  public delete = (organization: Organization): Promise<Organization> => {
      return this.http.post<Organization>(kebabCase(nameof(this.delete)), organization)
        .then((response: AxiosResponse<Organization>) => Organization.clone<Organization>(response.data));
  };

  public save = (organization: Organization): Promise<Organization> => {
      return organization.id ? this.update(organization) : this.create(organization);
  };

  public singleListDistrict = (districtFilter: DistrictFilter): Promise<District[]> => {
      return this.http.post<District[]>(kebabCase(nameof(this.singleListDistrict)), districtFilter)
        .then((response: AxiosResponse<District[]>) => {
          return response.data.map((district: PureModelData<District>) => District.clone<District>(district));
        });
  };
  public singleListProvince = (provinceFilter: ProvinceFilter): Promise<Province[]> => {
      return this.http.post<Province[]>(kebabCase(nameof(this.singleListProvince)), provinceFilter)
        .then((response: AxiosResponse<Province[]>) => {
          return response.data.map((province: PureModelData<Province>) => Province.clone<Province>(province));
        });
  };
  public singleListStoreGrouping = (storeGroupingFilter: StoreGroupingFilter): Promise<StoreGrouping[]> => {
      return this.http.post<StoreGrouping[]>(kebabCase(nameof(this.singleListStoreGrouping)), storeGroupingFilter)
        .then((response: AxiosResponse<StoreGrouping[]>) => {
          return response.data.map((storeGrouping: PureModelData<StoreGrouping>) => StoreGrouping.clone<StoreGrouping>(storeGrouping));
        });
  };
  public singleListStoreType = (storeTypeFilter: StoreTypeFilter): Promise<StoreType[]> => {
      return this.http.post<StoreType[]>(kebabCase(nameof(this.singleListStoreType)), storeTypeFilter)
        .then((response: AxiosResponse<StoreType[]>) => {
          return response.data.map((storeType: PureModelData<StoreType>) => StoreType.clone<StoreType>(storeType));
        });
  };
  public singleListWard = (wardFilter: WardFilter): Promise<Ward[]> => {
      return this.http.post<Ward[]>(kebabCase(nameof(this.singleListWard)), wardFilter)
        .then((response: AxiosResponse<Ward[]>) => {
          return response.data.map((ward: PureModelData<Ward>) => Ward.clone<Ward>(ward));
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
  export const organizationRepository: Organization = new OrganizationRepository();