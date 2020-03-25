import DefaultLayout from 'layouts/DefaultLayout/DefaultLayout';
import { join } from 'path';
import { RouteConfig } from 'react-router-config';
import { ROOT_ROUTE } from 'config/route-consts';
import { APP_USER_ROUTE } from 'config/route-consts';
import { DISTRICT_ROUTE } from 'config/route-consts';
import { FIELD_ROUTE } from 'config/route-consts';
import { IMAGE_ROUTE } from 'config/route-consts';
import { ITEM_ROUTE } from 'config/route-consts';
import { PAGE_ROUTE } from 'config/route-consts';
import { PERMISSION_ROUTE } from 'config/route-consts';
import { PRODUCT_ROUTE } from 'config/route-consts';
import { PRODUCT_GROUPING_ROUTE } from 'config/route-consts';
import { PRODUCT_TYPE_ROUTE } from 'config/route-consts';
import { PROPERTY_ROUTE } from 'config/route-consts';
import { PROPERTY_TYPE_ROUTE } from 'config/route-consts';
import { PROPERTY_VALUE_ROUTE } from 'config/route-consts';
import { PROVINCE_ROUTE } from 'config/route-consts';
import { ROLE_ROUTE } from 'config/route-consts';
import { STORE_LEVEL_ROUTE } from 'config/route-consts';
import { SUPPLIER_ROUTE } from 'config/route-consts';
import { UNIT_OF_MEASURE_ROUTE } from 'config/route-consts';
import { UNIT_OF_MEASURE_GROUPING_CONTENT_ROUTE } from 'config/route-consts';
import { UNIT_OF_MEASURE_GROUPING_ROUTE } from 'config/route-consts';
import { VARIATION_ROUTE } from 'config/route-consts';
import { VARIATION_GROUPING_ROUTE } from 'config/route-consts';
import { VIEW_ROUTE } from 'config/route-consts';
import { WARD_ROUTE } from 'config/route-consts';
import AppUserView, {
  AppUserDetail,
  AppUserMaster,
} from 'views/AppUserView/AppUserView';
import DistrictView, {
  DistrictDetail,
  DistrictMaster,
} from 'views/DistrictView/DistrictView';
import FieldView, { FieldDetail, FieldMaster } from 'views/FieldView/FieldView';
import ImageView, { ImageDetail, ImageMaster } from 'views/ImageView/ImageView';
import ItemView, { ItemDetail, ItemMaster } from 'views/ItemView/ItemView';
import PageView, { PageDetail, PageMaster } from 'views/PageView/PageView';
import PermissionView, {
  PermissionDetail,
  PermissionMaster,
} from 'views/PermissionView/PermissionView';
import ProductView, {
  ProductDetail,
  ProductMaster,
} from 'views/ProductView/ProductView';
import ProductGroupingView, {
  ProductGroupingDetail,
  ProductGroupingMaster,
} from 'views/ProductGroupingView/ProductGroupingView';
import ProductTypeView, {
  ProductTypeDetail,
  ProductTypeMaster,
} from 'views/ProductTypeView/ProductTypeView';
import PropertyView, {
  PropertyDetail,
  PropertyMaster,
} from 'views/PropertyView/PropertyView';
import PropertyTypeView, {
  PropertyTypeDetail,
  PropertyTypeMaster,
} from 'views/PropertyTypeView/PropertyTypeView';
import PropertyValueView, {
  PropertyValueDetail,
  PropertyValueMaster,
} from 'views/PropertyValueView/PropertyValueView';
import ProvinceView, {
  ProvinceDetail,
  ProvinceMaster,
} from 'views/ProvinceView/ProvinceView';
import RoleView, { RoleDetail, RoleMaster } from 'views/RoleView/RoleView';
import StoreLevelView, {
  StoreLevelDetail,
  StoreLevelMaster,
} from 'views/StoreLevelView/StoreLevelView';
import SupplierView, {
  SupplierDetail,
  SupplierMaster,
} from 'views/SupplierView/SupplierView';
import UnitOfMeasureView, {
  UnitOfMeasureDetail,
  UnitOfMeasureMaster,
} from 'views/UnitOfMeasureView/UnitOfMeasureView';
import UnitOfMeasureGroupingContentView, {
  UnitOfMeasureGroupingContentDetail,
  UnitOfMeasureGroupingContentMaster,
} from 'views/UnitOfMeasureGroupingContentView/UnitOfMeasureGroupingContentView';
import UnitOfMeasureGroupingView, {
  UnitOfMeasureGroupingDetail,
  UnitOfMeasureGroupingMaster,
} from 'views/UnitOfMeasureGroupingView/UnitOfMeasureGroupingView';
import VariationView, {
  VariationDetail,
  VariationMaster,
} from 'views/VariationView/VariationView';
import VariationGroupingView, {
  VariationGroupingDetail,
  VariationGroupingMaster,
} from 'views/VariationGroupingView/VariationGroupingView';
import ViewView, { ViewDetail, ViewMaster } from 'views/ViewView/ViewView';
import WardView, { WardDetail, WardMaster } from 'views/WardView/WardView';
import ProductDetail1 from 'views/ProductView/ProductDetail1/ProductDetail1';
export const routes: RouteConfig[] = [
  {
    path: ROOT_ROUTE,
    component: DefaultLayout,
    routes: [
      {
        path: APP_USER_ROUTE,
        component: AppUserView,
        children: [
          {
            path: join(APP_USER_ROUTE, ':id'),
            component: AppUserDetail,
          },
          {
            path: join(APP_USER_ROUTE),
            component: AppUserMaster,
          },
        ],
      },
      {
        path: DISTRICT_ROUTE,
        component: DistrictView,
        children: [
          {
            path: join(DISTRICT_ROUTE, ':id'),
            component: DistrictDetail,
          },
          {
            path: join(DISTRICT_ROUTE),
            component: DistrictMaster,
          },
        ],
      },
      {
        path: FIELD_ROUTE,
        component: FieldView,
        children: [
          {
            path: join(FIELD_ROUTE, ':id'),
            component: FieldDetail,
          },
          {
            path: join(FIELD_ROUTE),
            component: FieldMaster,
          },
        ],
      },
      {
        path: IMAGE_ROUTE,
        component: ImageView,
        children: [
          {
            path: join(IMAGE_ROUTE, ':id'),
            component: ImageDetail,
          },
          {
            path: join(IMAGE_ROUTE),
            component: ImageMaster,
          },
        ],
      },
      {
        path: ITEM_ROUTE,
        component: ItemView,
        children: [
          {
            path: join(ITEM_ROUTE, ':id'),
            component: ItemDetail,
          },
          {
            path: join(ITEM_ROUTE),
            component: ItemMaster,
          },
        ],
      },
      {
        path: PAGE_ROUTE,
        component: PageView,
        children: [
          {
            path: join(PAGE_ROUTE, ':id'),
            component: PageDetail,
          },
          {
            path: join(PAGE_ROUTE),
            component: PageMaster,
          },
        ],
      },
      {
        path: PERMISSION_ROUTE,
        component: PermissionView,
        children: [
          {
            path: join(PERMISSION_ROUTE, ':id'),
            component: PermissionDetail,
          },
          {
            path: join(PERMISSION_ROUTE),
            component: PermissionMaster,
          },
        ],
      },
      {
        path: PRODUCT_ROUTE,
        component: ProductView,
        children: [
          {
            path: join(PRODUCT_ROUTE, ':id'),
            component: ProductDetail,
          },
          {
            path: join(PRODUCT_ROUTE),
            component: ProductMaster,
          },
        ],
      },
      {
        path: PRODUCT_GROUPING_ROUTE,
        component: ProductGroupingView,
        children: [
          {
            path: join(PRODUCT_GROUPING_ROUTE, ':id'),
            component: ProductGroupingDetail,
          },
          {
            path: join(PRODUCT_GROUPING_ROUTE),
            component: ProductGroupingMaster,
          },
        ],
      },
      {
        path: PRODUCT_TYPE_ROUTE,
        component: ProductTypeView,
        children: [
          {
            path: join(PRODUCT_TYPE_ROUTE, ':id'),
            component: ProductTypeDetail,
          },
          {
            path: join(PRODUCT_TYPE_ROUTE),
            component: ProductTypeMaster,
          },
        ],
      },
      {
        path: PROPERTY_ROUTE,
        component: PropertyView,
        children: [
          {
            path: join(PROPERTY_ROUTE, ':id'),
            component: PropertyDetail,
          },
          {
            path: join(PROPERTY_ROUTE),
            component: PropertyMaster,
          },
        ],
      },
      {
        path: PROPERTY_TYPE_ROUTE,
        component: PropertyTypeView,
        children: [
          {
            path: join(PROPERTY_TYPE_ROUTE, ':id'),
            component: PropertyTypeDetail,
          },
          {
            path: join(PROPERTY_TYPE_ROUTE),
            component: PropertyTypeMaster,
          },
        ],
      },
      {
        path: PROPERTY_VALUE_ROUTE,
        component: PropertyValueView,
        children: [
          {
            path: join(PROPERTY_VALUE_ROUTE, ':id'),
            component: PropertyValueDetail,
          },
          {
            path: join(PROPERTY_VALUE_ROUTE),
            component: PropertyValueMaster,
          },
        ],
      },
      {
        path: PROVINCE_ROUTE,
        component: ProvinceView,
        children: [
          {
            path: join(PROVINCE_ROUTE, ':id'),
            component: ProvinceDetail,
          },
          {
            path: join(PROVINCE_ROUTE),
            component: ProvinceMaster,
          },
        ],
      },
      {
        path: ROLE_ROUTE,
        component: RoleView,
        children: [
          {
            path: join(ROLE_ROUTE, ':id'),
            component: RoleDetail,
          },
          {
            path: join(ROLE_ROUTE),
            component: RoleMaster,
          },
        ],
      },
      {
        path: STORE_LEVEL_ROUTE,
        component: StoreLevelView,
        children: [
          {
            path: join(STORE_LEVEL_ROUTE, ':id'),
            component: StoreLevelDetail,
          },
          {
            path: join(STORE_LEVEL_ROUTE),
            component: StoreLevelMaster,
          },
        ],
      },
      {
        path: SUPPLIER_ROUTE,
        component: SupplierView,
        children: [
          {
            path: join(SUPPLIER_ROUTE, ':id'),
            component: SupplierDetail,
          },
          {
            path: join(SUPPLIER_ROUTE),
            component: SupplierMaster,
          },
        ],
      },
      {
        path: UNIT_OF_MEASURE_ROUTE,
        component: UnitOfMeasureView,
        children: [
          {
            path: join(UNIT_OF_MEASURE_ROUTE, ':id'),
            component: UnitOfMeasureDetail,
          },
          {
            path: join(UNIT_OF_MEASURE_ROUTE),
            component: UnitOfMeasureMaster,
          },
        ],
      },
      {
        path: UNIT_OF_MEASURE_GROUPING_CONTENT_ROUTE,
        component: UnitOfMeasureGroupingContentView,
        children: [
          {
            path: join(UNIT_OF_MEASURE_GROUPING_CONTENT_ROUTE, ':id'),
            component: UnitOfMeasureGroupingContentDetail,
          },
          {
            path: join(UNIT_OF_MEASURE_GROUPING_CONTENT_ROUTE),
            component: UnitOfMeasureGroupingContentMaster,
          },
        ],
      },
      {
        path: UNIT_OF_MEASURE_GROUPING_ROUTE,
        component: UnitOfMeasureGroupingView,
        children: [
          {
            path: join(UNIT_OF_MEASURE_GROUPING_ROUTE, ':id'),
            component: UnitOfMeasureGroupingDetail,
          },
          {
            path: join(UNIT_OF_MEASURE_GROUPING_ROUTE),
            component: UnitOfMeasureGroupingMaster,
          },
        ],
      },
      {
        path: VARIATION_ROUTE,
        component: VariationView,
        children: [
          {
            path: join(VARIATION_ROUTE, ':id'),
            component: VariationDetail,
          },
          {
            path: join(VARIATION_ROUTE),
            component: VariationMaster,
          },
        ],
      },
      {
        path: VARIATION_GROUPING_ROUTE,
        component: VariationGroupingView,
        children: [
          {
            path: join(VARIATION_GROUPING_ROUTE, ':id'),
            component: VariationGroupingDetail,
          },
          {
            path: join(VARIATION_GROUPING_ROUTE),
            component: VariationGroupingMaster,
          },
        ],
      },
      {
        path: VIEW_ROUTE,
        component: ViewView,
        children: [
          {
            path: join(VIEW_ROUTE, ':id'),
            component: ViewDetail,
          },
          {
            path: join(VIEW_ROUTE),
            component: ViewMaster,
          },
        ],
      },
      {
        path: WARD_ROUTE,
        component: WardView,
        children: [
          {
            path: join(WARD_ROUTE, ':id'),
            component: WardDetail,
          },
          {
            path: join(WARD_ROUTE),
            component: WardMaster,
          },
        ],
      },
    ],
  },
];
