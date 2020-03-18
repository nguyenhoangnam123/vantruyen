import { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import { url } from 'core/helpers/string';
import { Repository } from 'core/repositories/Repository';
import kebabCase from 'lodash/kebabCase';
import {BatchId, PureModelData} from 'react3l';
import {httpConfig} from 'config/http';
import {API_BASE_URL} from 'core/config';

import {API_STORE_ROUTE} from 'config/api-consts';
import { Store } from 'models/Store';
import { StoreFilter } from 'models/StoreFilter';
import { District } from 'models/District';
import { DistrictFilter } from 'models/DistrictFilter';
import { Organization } from 'models/Organization';
import { OrganizationFilter } from 'models/OrganizationFilter';
import { Province } from 'models/Province';
import { ProvinceFilter } from 'models/ProvinceFilter';
import { StoreGrouping } from 'models/StoreGrouping';
import { StoreGroupingFilter } from 'models/StoreGroupingFilter';
import { StoreType } from 'models/StoreType';
import { StoreTypeFilter } from 'models/StoreTypeFilter';
import { Ward } from 'models/Ward';
import { WardFilter } from 'models/WardFilter';
import { Image } from 'models/Image';
import { ImageFilter } from 'models/ImageFilter';

export class StoreRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.setBaseURL(url(API_BASE_URL, API_STORE_ROUTE));
  }

  public count = (storeFilter?: StoreFilter): Promise<number> => {
    return this.http.post<number>(kebabCase(nameof(this.count)), storeFilter)
      .then((response: AxiosResponse<number>) => response.data);
  };

  public list = (storeFilter?: StoreFilter): Promise<Store[]> => {
    return this.http.post<Store[]>(kebabCase(nameof(this.list)), storeFilter)
      .then((response: AxiosResponse<Store[]>) => {
        return response.data?.map((store: PureModelData<Store>) =>  Store.clone<Store>(store));
    });
  };
  public get = (id: number | string): Promise<Store> => {
    return this.http.post<Store>
      (kebabCase(nameof(this.get)), { id })
        .then((response: AxiosResponse<Store>) => Store.clone<Store>(response.data));
  };

  public create = (store: Store): Promise<Store> => {
    return this.http.post<Store>(kebabCase(nameof(this.create)), store)
      .then((response: AxiosResponse<PureModelData<Store>>) => Store.clone<Store>(response.data));
  };

  public update = (store: Store): Promise<Store> => {
    return this.http.post<Store>(kebabCase(nameof(this.update)), store)
      .then((response: AxiosResponse<Store>) => Store.clone<Store>(response.data));
  };

  public delete = (store: Store): Promise<Store> => {
      return this.http.post<Store>(kebabCase(nameof(this.delete)), store)
        .then((response: AxiosResponse<Store>) => Store.clone<Store>(response.data));
  };

  public save = (store: Store): Promise<Store> => {
      return store.id ? this.update(store) : this.create(store);
  };

  public singleListDistrict = (districtFilter: DistrictFilter): Promise<District[]> => {
      return this.http.post<District[]>(kebabCase(nameof(this.singleListDistrict)), districtFilter)
        .then((response: AxiosResponse<District[]>) => {
          return response.data.map((district: PureModelData<District>) => District.clone<District>(district));
        });
  };
  public singleListOrganization = (organizationFilter: OrganizationFilter): Promise<Organization[]> => {
      return this.http.post<Organization[]>(kebabCase(nameof(this.singleListOrganization)), organizationFilter)
        .then((response: AxiosResponse<Organization[]>) => {
          return response.data.map((organization: PureModelData<Organization>) => Organization.clone<Organization>(organization));
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
  public singleListImage = (imageFilter: ImageFilter): Promise<Image[]> => {
      return this.http.post<Image[]>(kebabCase(nameof(this.singleListImage)), imageFilter)
        .then((response: AxiosResponse<Image[]>) => {
          return response.data.map((image: PureModelData<Image>) => Image.clone<Image>(image));
        });
  };

  public countImage = (imageFilter: ImageFilter):
      Promise<number> => {
        return this.http.post<number>(kebabCase(nameof(this.countImage)), imageFilter)
          .then((response: AxiosResponse<number>) =>  response.data);
    };

  public listImage = (imageFilter: ImageFilter): Promise<Image[]> => {
        return this.http.post<Image[]>(kebabCase(nameof(this.listImage)), imageFilter)
          .then((response: AxiosResponse<Image[]>) => {
            return response.data.map((image: PureModelData<Image>) => Image.clone<Image>(image));
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
  export const storeRepository: Store = new StoreRepository();