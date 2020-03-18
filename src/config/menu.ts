import { translate } from 'core/helpers/internationalization';
import { RouteConfig } from 'react-router-config';
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
export const menu: RouteConfig[] =
  [
    {
      name: translate('menu.appUsers'),
      url: APP_USER_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.districts'),
      url: DISTRICT_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.fields'),
      url: FIELD_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.images'),
      url: IMAGE_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.items'),
      url: ITEM_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.pages'),
      url: PAGE_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.permissions'),
      url: PERMISSION_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.products'),
      url: PRODUCT_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.productGroupings'),
      url: PRODUCT_GROUPING_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.productTypes'),
      url: PRODUCT_TYPE_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.properties'),
      url: PROPERTY_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.propertyTypes'),
      url: PROPERTY_TYPE_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.propertyValues'),
      url: PROPERTY_VALUE_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.provinces'),
      url: PROVINCE_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.roles'),
      url: ROLE_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.storeLevels'),
      url: STORE_LEVEL_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.suppliers'),
      url: SUPPLIER_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.unitOfMeasures'),
      url: UNIT_OF_MEASURE_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.unitOfMeasureGroupingContents'),
      url: UNIT_OF_MEASURE_GROUPING_CONTENT_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.unitOfMeasureGroupings'),
      url: UNIT_OF_MEASURE_GROUPING_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.variations'),
      url: VARIATION_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.variationGroupings'),
      url: VARIATION_GROUPING_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.views'),
      url: VIEW_ROUTE,
      icon: 'fa fa-building',
    },
    {
      name: translate('menu.wards'),
      url: WARD_ROUTE,
      icon: 'fa fa-building',
    },
  ];
