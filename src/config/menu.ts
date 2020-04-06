import { translate } from 'core/helpers/internationalization';
import { RouteConfig } from 'react-router-config';

import { PROVINCE_ROUTE } from 'config/route-consts';
export const menu: RouteConfig[] = [
  {
    name: translate('menu.provinces'),
    url: PROVINCE_ROUTE,
    icon: 'fa fa-building',
  },
];
