import {translate} from 'core/helpers/internationalization';
import {RouteConfig} from 'react-router-config';

import { APPLICATION_USER_ROUTE } from 'config/route-consts';



import { FIELD_ROUTE } from 'config/route-consts';


import { PAGE_ROUTE } from 'config/route-consts';


import { PERMISSION_ROUTE } from 'config/route-consts';




import { PROVIDER_ROUTE } from 'config/route-consts';


import { ROLE_ROUTE } from 'config/route-consts';


import { SITE_ROUTE } from 'config/route-consts';



import { VIEW_ROUTE } from 'config/route-consts';


export const menu: RouteConfig[] = 
[
    
        {
            name: translate('menu.applicationUsers'),
            url: APPLICATION_USER_ROUTE,
            icon: 'fa fa-building',
        },
    
    
    
        {
            name: translate('menu.fields'),
            url: FIELD_ROUTE,
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
            name: translate('menu.providers'),
            url: PROVIDER_ROUTE,
            icon: 'fa fa-building',
        },
    
    
        {
            name: translate('menu.roles'),
            url: ROLE_ROUTE,
            icon: 'fa fa-building',
        },
    
    
        {
            name: translate('menu.sites'),
            url: SITE_ROUTE,
            icon: 'fa fa-building',
        },
    
    
    
        {
            name: translate('menu.views'),
            url: VIEW_ROUTE,
            icon: 'fa fa-building',
        },
    
];